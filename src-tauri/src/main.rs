// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keypress::key_code::code_from_key;
use once_cell::sync::Lazy;
use plugins::mac_os::traffic_lights::setup_traffic_light_positioner;
use rdev::{listen, EventType, Key};
use tauri::Manager;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use std::env;
use std::sync::{Arc, Mutex};
use std::thread;

pub mod events;
pub mod keypress;
pub mod plugins;
pub mod soundpacks;
pub mod utils;

use soundpacks::Soundpack;
use specta::collect_types;
use tauri_specta::ts;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate cocoa;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

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
fn choose_soundpack(id: String) {
    SOUNDPACK.lock().unwrap().choose_soundpack(id);
}
fn main() {
    #[cfg(debug_assertions)]
    ts::export(collect_types![choose_soundpack], "../src/bindings.ts").unwrap();

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
        .setup(move |app| {
            let window = app.get_window("main").unwrap();
            let window_clone = window.clone();
            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&window, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            #[cfg(target_os = "macos")]
            window.on_window_event(move |event| {
                if let tauri::WindowEvent::ThemeChanged(_theme) = event {
                    setup_traffic_light_positioner(window_clone.clone())
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![choose_soundpack])
        .plugin(plugins::mac_os::traffic_lights::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
