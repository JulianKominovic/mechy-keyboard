use kira::{
    manager::{backend::DefaultBackend, AudioManager, AudioManagerSettings},
    sound::{
        self,
        static_sound::{StaticSoundData, StaticSoundSettings},
        PlaybackPosition,
    },
};
use once_cell::sync::Lazy;
use rdev::{listen, EventType, Key};
use std::{
    any::Any,
    collections::HashMap,
    fs::{read_dir, File},
    io::BufReader,
    path::Path,
    time::Duration,
};
use std::{io::Write, sync::Mutex};

#[derive(serde::Deserialize, Debug)]
struct ConfigStruct {
    pub defines: HashMap<i32, Option<(i32, i32)>>,
}
static KEYS_PRESSED: Lazy<Mutex<Vec<i32>>> = Lazy::new(|| Mutex::new(Vec::new()));

fn main() -> () {
    let soundpack_folder = read_dir("../soundpacks").unwrap();
    let mut sound_map: HashMap<i32, StaticSoundData> = HashMap::new();
    for folder in soundpack_folder {
        let folder = folder.unwrap();
        let path = folder.path();
        let path = path.to_str().unwrap();
        println!("PATH: {:?}", path);
        let json_file = Path::new(path).join("config.json");
        println!("JSON: {:?}", json_file);
        let json_file_content =
            std::fs::read_to_string(json_file).expect("Something went wrong reading the file");
        let json: ConfigStruct =
            serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
        let defines = json.defines;
        println!("JSON: {:?}", defines);

        let mut manager =
            AudioManager::<DefaultBackend>::new(AudioManagerSettings::default()).unwrap();
        let ogg_file = Path::new(path).join("sound.ogg");
        let sound_data = StaticSoundData::from_file(ogg_file).unwrap();
        for (key, range) in defines {
            // Create an audio manager. This plays sounds and manages resources.
            let slice = sound_data.start_position(PlaybackPosition::Seconds(
                (Duration::from_millis(range.unwrap().0 as u64).as_secs_f32()) as f64,
            ));
            sound_map.insert(key as i32, slice);
        }

        // if let Err(error) = listen(move |event| {
        //     match event.event_type {
        //         EventType::KeyRelease(key) => {
        //             println!("Key release {:?}", key);
        //             let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
        //             let key_as_i32=
        //             keys_pressed_lock.retain(|&x| x != key);
        //         }
        //         EventType::KeyPress(key) => {
        //             println!("Keys pressed: {:?}", key);
        //             let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
        //             if keys_pressed_lock.contains(&key) {
        //                 drop(keys_pressed_lock);
        //                 return;
        //             } else {
        //                 keys_pressed_lock.push(key);
        //                 drop(keys_pressed_lock);
        //             }
        //             println!("Key press {:?}", key);
        //             if sound_map.contains_key(key.) {
        //                 manager.play(sound_map.get(&key).unwrap().clone()).unwrap();
        //                 return;
        //             }
        //             let slice = match sound_map.get(&key) {
        //                 Some(slice) => slice.clone(),
        //                 None => return,
        //             };
        //             manager.play(slice.clone()).unwrap();
        //             // So inefficient, but it works
        //             // if pool.active_count() >= n_workers {
        //             //     println!("Pool is busy");
        //             //     return;
        //             // }

        //             // pool.execute(move || {
        //             //     let init_timestamp = std::time::SystemTime::now();
        //             //     let soundpack = SOUNDPACK.lock().expect("Could not lock soundpack");
        //             //     println!(
        //             //         "Played sound in {}ms",
        //             //         init_timestamp.elapsed().unwrap().as_millis()
        //             //     );
        //             //     let slice = match soundpack
        //             //         .sound_slices
        //             //         .get(&key_code::code_from_key(key).unwrap_or(1))
        //             //     {
        //             //         Some(slice) => slice.clone(),
        //             //         None => return,
        //             //     };

        //             //     // drop(soundpack);
        //             //     let (_stream, stream_handle) = OutputStream::try_default().unwrap();
        //             //     let sink: Sink = Sink::try_new(&stream_handle).unwrap();

        //             //     sink.append(slice);
        //             //     sink.sleep_until_end();
        //             // });
        //         }
        //         _ => {}
        //     }
        // }) {
        //     println!("Error: {:?}", error)
        // }
    }
}
