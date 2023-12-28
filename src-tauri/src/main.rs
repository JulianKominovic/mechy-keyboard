// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use once_cell::sync::Lazy;
use rdev::{listen, EventType};
use rodio::{source::Source, Decoder, OutputStream, Sink};
use serde_json;
use std::io::BufReader;
use std::time::Duration;
use std::{fs::File, thread};
use threadpool::ThreadPool;

pub mod events;
pub mod soundpacks;

use events::greet;
use specta::collect_types;
use tauri_specta::ts;

use crate::soundpacks::{key_code, ConfigStruct};

static SOURCE: Lazy<rodio::source::Buffered<Decoder<BufReader<File>>>> = Lazy::new(|| {
    let file = BufReader::new(File::open("../manual/sound.ogg").unwrap());
    let buff: rodio::source::Buffered<Decoder<BufReader<File>>> =
        Decoder::new(file).unwrap().buffered();
    buff
});

static JSON: Lazy<ConfigStruct> = Lazy::new(|| {
    let json_file_content = std::fs::read_to_string("../manual/config.json")
        .expect("Something went wrong reading the file");
    let json: ConfigStruct =
        serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
    println!("JSON: {:?}", json);
    json
});

fn main() {
    thread::spawn(|| {
        let n_workers = 4;
        let pool = ThreadPool::new(n_workers);
        // let (tx, rx) = channel();
        // Create a threadpool with 4 threads

        println!("Json ready {:?}", JSON.defines);

        if let Err(error) = listen(move |event| {
            match event.event_type {
                EventType::KeyPress(key) => {
                    println!("Key press {:?}", key);
                    // So inefficient, but it works
                    if pool.active_count() >= n_workers {
                        println!("Pool is busy");
                        return;
                    }
                    pool.execute(move || {
                        let (_stream, stream_handle) = OutputStream::try_default().unwrap();
                        let sink: Sink = Sink::try_new(&stream_handle).unwrap();

                        let range = JSON
                            .defines
                            .get(&key_code::code_from_key(key).unwrap_or(1))
                            .unwrap();

                        let source = SOURCE.clone();
                        let slice = source
                            .skip_duration(Duration::from_millis(range.0 as u64))
                            .take_duration(Duration::from_millis(range.1 as u64));

                        sink.append(slice);
                        sink.sleep_until_end();
                    });
                }
                _ => {}
            }
        }) {
            println!("Error: {:?}", error)
        }
    });

    #[cfg(debug_assertions)]
    ts::export(collect_types![greet], "../src/bindings.ts").unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
