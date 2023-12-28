// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod events;
use events::greet;
use specta::collect_types;
use tauri_specta::ts;
fn main() {
    #[cfg(debug_assertions)]
    ts::export(collect_types![greet], "../src/bindings.ts").unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
