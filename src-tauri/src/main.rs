// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use keypress::key_code::code_from_key;
use once_cell::sync::Lazy;
use plugins::mac_os::traffic_lights::setup_traffic_light_positioner;
use rdev::{listen, EventType, Key};
use tauri::async_runtime::Mutex;
use tauri::Manager;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use std::sync::Arc;
use std::thread;
use std::{env, path::PathBuf};

pub mod constants;
pub mod events;
pub mod keypress;
pub mod plugins;
pub mod soundpacks;
pub mod utils;

use soundpacks::{download_soundpack_if_necessary, Soundpack};
use specta::collect_types;
use tauri_specta::ts;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate cocoa;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

static SOUNDPACK: Lazy<Arc<Mutex<Soundpack>>> =
    Lazy::new(|| Arc::new(Mutex::new(Soundpack::new())));

static KEYS_PRESSED: Lazy<std::sync::Mutex<Vec<Key>>> =
    Lazy::new(|| std::sync::Mutex::new(Vec::new()));

#[specta::specta]
#[tauri::command]
async fn choose_soundpack(soundpack_id: String, soundpack_folder: String) -> Result<(), ()> {
    let new_soundpack_folder = PathBuf::from(soundpack_folder).join(&soundpack_id);
    println!("New soundpack folder: {:?}", new_soundpack_folder);
    download_soundpack_if_necessary(soundpack_id, &new_soundpack_folder).await;
    let new_soundpack_sound_data = soundpacks::prepare_sound_data(&new_soundpack_folder);
    let new_soundpack_slices = soundpacks::prepare_sound_slices(&new_soundpack_folder);
    println!("New soundpack slices: {:?}", new_soundpack_slices);
    println!("New soundpack sound data: {:?}", new_soundpack_sound_data);
    let mut soundpack_lock = SOUNDPACK.lock().await;

    soundpack_lock.set_sound_data(new_soundpack_sound_data);
    soundpack_lock.set_sound_slices(new_soundpack_slices);

    Ok(())
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
                tauri::async_runtime::block_on(async {
                    SOUNDPACK.lock().await.play_sound(code_from_key(key), true);
                });
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

                tauri::async_runtime::block_on(async {
                    SOUNDPACK.lock().await.play_sound(code_from_key(key), false);
                });
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
