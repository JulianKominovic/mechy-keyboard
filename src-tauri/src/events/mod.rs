// https://github.com/oscartbeaumont/tauri-specta
// Completely typesafe Tauri commands

#[specta::specta] // <-- This bit here
#[tauri::command]
pub fn greet(name: String) -> String {
    format!("Hello {name}!")
}
