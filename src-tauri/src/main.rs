// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use once_cell::sync::Lazy;
use rdev::{listen, EventType, Key};
use rodio::{source::Source, Decoder, OutputStream, Sink};
use serde_json;
use std::env;
use std::io::BufReader;
use std::path::Path;
use std::sync::{Arc, Mutex};
use std::time::Duration;
use std::{fs::File, thread};
use threadpool::ThreadPool;

pub mod events;
pub mod soundpacks;

use events::greet;
use specta::collect_types;
use tauri_specta::ts;

use crate::soundpacks::{key_code, ConfigStruct};

struct Soundpack {
    pub source: rodio::source::Buffered<Decoder<BufReader<File>>>,
    pub defines: std::collections::HashMap<i32, Option<(i32, i32)>>,
}

impl Soundpack {
    fn new(file_path: String) -> Self {
        let file = BufReader::new(File::open(Path::new(&file_path).join("sound.ogg")).unwrap());
        let buff: rodio::source::Buffered<Decoder<BufReader<File>>> =
            Decoder::new(file).unwrap().buffered();

        let json_file_content = std::fs::read_to_string(Path::new(&file_path).join("config.json"))
            .expect("Something went wrong reading the file");
        let json: ConfigStruct =
            serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
        println!("JSON: {:?}", json);

        Self {
            source: buff,
            defines: json.defines,
        }
    }

    fn set_new_soundpack(&mut self, file_path: String) {
        let file = BufReader::new(File::open(Path::new(&file_path).join("sound.ogg")).unwrap());
        let buff: rodio::source::Buffered<Decoder<BufReader<File>>> =
            Decoder::new(file).unwrap().buffered();

        let json_file_content = std::fs::read_to_string(Path::new(&file_path).join("config.json"))
            .expect("Something went wrong reading the file");
        let json: ConfigStruct =
            serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
        println!("JSON: {:?}", json);

        self.source = buff;
        self.defines = json.defines;
    }
}
static SOUNDPACK: Lazy<Arc<Mutex<Soundpack>>> = Lazy::new(|| {
    Arc::new(Mutex::new(Soundpack::new(
        env::home_dir().unwrap().join(".local/share/com.jkominovic.the-cheapest-mechanical-keyboard/soundpacks/cherrymx-black-abs").to_str().unwrap().to_string(),
    )))
});

#[tauri::command]
#[specta::specta] // <-- This bit here
fn choose_soundpack(folder_path: String) {
    let soundpack = Arc::clone(&SOUNDPACK);
    let mut soundpack = soundpack.lock().unwrap();
    soundpack.set_new_soundpack(folder_path);
}
fn main() {
    thread::spawn(|| {
        let n_workers = 4;
        let pool = ThreadPool::new(n_workers);
        // let (tx, rx) = channel();
        // Create a threadpool with 4 threads

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

                        let soundpack = SOUNDPACK.lock().unwrap();

                        let range = soundpack
                            .defines
                            .get(&key_code::code_from_key(key).unwrap_or(1));

                        if range.is_none() {
                            return;
                        }
                        let unwrapped_range = range.unwrap().unwrap();

                        let source = soundpack.source.clone();
                        let slice = source
                            .skip_duration(Duration::from_millis(unwrapped_range.0 as u64))
                            .take_duration(Duration::from_millis(unwrapped_range.1 as u64));

                        drop(soundpack);
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
    ts::export(
        collect_types![greet, choose_soundpack],
        "../src/bindings.ts",
    )
    .unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, choose_soundpack])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
