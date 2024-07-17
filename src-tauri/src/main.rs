// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keypress::key_code::code_from_key;
use once_cell::sync::Lazy;
use rdev::{listen, EventType, Key};

use std::env;
use std::sync::{Arc, Mutex};
use std::thread;

pub mod events;
pub mod keypress;
pub mod soundpacks;
pub mod utils;

use events::greet;
use soundpacks::Soundpack;
use specta::collect_types;
use tauri_specta::ts;

static SOUNDPACK: Lazy<Arc<Mutex<Soundpack>>> = Lazy::new(|| {
    Arc::new(Mutex::new(Soundpack::new(
        env::home_dir()
            .unwrap()
            .join("dev/the-cheapest-mechanical-keyboard/soundpacks/cherrymx-black-abs")
            .to_str()
            .unwrap()
            .to_string(),
    )))
});

static KEYS_PRESSED: Lazy<Mutex<Vec<Key>>> = Lazy::new(|| Mutex::new(Vec::new()));

#[tauri::command]
#[specta::specta] // <-- This bit here
fn choose_soundpack(folder_path: String) {
    let soundpack = Arc::clone(&SOUNDPACK);
    let mut soundpack = soundpack.lock().unwrap();
    soundpack.set_new_soundpack(folder_path);
}
fn main() {
    #[cfg(debug_assertions)]
    ts::export(
        collect_types![greet, choose_soundpack],
        "../src/bindings.ts",
    )
    .unwrap();

    thread::spawn(|| {
        if let Err(error) = listen(move |event| match event.event_type {
            EventType::KeyRelease(key) => {
                println!("Key release {:?}", key);
                let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                keys_pressed_lock.retain(|&x| x != key);
            }
            EventType::KeyPress(key) => {
                println!("Keys pressed: {:?}", key);
                let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                if keys_pressed_lock.contains(&key) {
                    drop(keys_pressed_lock);
                    return;
                } else {
                    keys_pressed_lock.push(key);
                    drop(keys_pressed_lock);
                }
                println!("Key press {:?}", key);

                SOUNDPACK.lock().unwrap().play_sound(code_from_key(key));
            }
            _ => {}
        }) {
            println!("Error: {:?}", error)
        }
    });
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, choose_soundpack])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
