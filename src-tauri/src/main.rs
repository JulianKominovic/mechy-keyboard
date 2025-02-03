// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use keyboard_listener::KeyEvent;
use log::error;
use once_cell::sync::Lazy;
#[cfg(target_os = "macos")]
use plugins::mac_os::traffic_lights::setup_traffic_light_positioner;
use soundpacks::Soundpack;
use std::sync::Arc;
use std::thread;
use system_tray::{build_system_tray, build_system_tray_events};
use tauri::async_runtime::Mutex;
use tauri::Manager;
use tauri_plugin_log::LogTarget;
use window_vibrancy::apply_vibrancy;
use window_vibrancy::NSVisualEffectMaterial;

pub mod constants;
pub mod events;
pub mod keyboard_listener;
pub mod keypress;
pub mod plugins;
pub mod soundpacks;
pub mod system_tray;
pub mod utils;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate cocoa;

#[cfg(target_os = "macos")]
#[macro_use]
extern crate objc;

pub static SOUNDPACK: Lazy<Arc<Mutex<Soundpack>>> =
    Lazy::new(|| Arc::new(Mutex::new(Soundpack::new())));

pub static KEYS_PRESSED: Lazy<std::sync::Mutex<Vec<keyboard_listener::Key>>> =
    Lazy::new(|| std::sync::Mutex::new(Vec::new()));

fn main() {
    tauri::Builder::default()
        .setup(move |app| {
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

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
            /*
                Here we listen for key events and play sounds accordingly.

                We also keep track of keys that are currently pressed to avoid playing the same sound multiple times when a key is held down.

            */
            thread::spawn(move || {
                if let Err(error) =
                    keyboard_listener::listen(move |event: keyboard_listener::KeyEvent| match event
                    {
                        KeyEvent::KeyPress(key) => {
                            let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                            if keys_pressed_lock.contains(&key) {
                                drop(keys_pressed_lock);
                                return;
                            } else {
                                keys_pressed_lock.push(key);
                                drop(keys_pressed_lock);
                            }

                            tauri::async_runtime::block_on(async {
                                SOUNDPACK.lock().await.play_sound(key, false);
                            });
                        }
                        KeyEvent::KeyRelease(key) => {
                            let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                            keys_pressed_lock.retain(|&x| x != key);
                            tauri::async_runtime::block_on(async {
                                SOUNDPACK.lock().await.play_sound(key, true);
                            });
                        }
                    })
                {
                    error!("Error: {:?}", error)
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            events::choose_soundpack,
            events::set_volume_level
        ])
        .plugin(plugins::mac_os::traffic_lights::init())
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .system_tray(build_system_tray())
        .on_system_tray_event(build_system_tray_events)
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
