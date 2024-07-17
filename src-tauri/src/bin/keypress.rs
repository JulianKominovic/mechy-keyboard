use std::sync::Mutex;

use once_cell::sync::Lazy;
use rdev::{listen, EventType, Key};
static KEYS_PRESSED: Lazy<Mutex<Vec<Key>>> = Lazy::new(|| Mutex::new(Vec::new()));

fn main() -> () {
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
        }
        _ => {}
    }) {
        println!("Error: {:?}", error)
    }
}
