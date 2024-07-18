use kira::{
    manager::{AudioManager, DefaultBackend},
    sound::{self, static_sound::StaticSoundData, PlaybackPosition, PlaybackRate},
    tween::{Easing, Tween},
    StartTime, Volume,
};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    fs,
    io::Cursor,
    path::{Path, PathBuf},
    time::Duration,
};

use crate::{constants::REMOTE_SOUNDPACK_DIRECTORY, utils};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ConfigStruct {
    pub defines: HashMap<i32, Option<(i32, i32)>>,
}

#[derive(Debug, Clone)]
pub struct Soundpack {
    pub sound_slices: HashMap<i32, (i32, i32)>,
    pub sound_data: Option<StaticSoundData>,
    pub id: String,
}

impl Soundpack {
    pub fn new() -> Self {
        Soundpack {
            sound_slices: HashMap::new(),
            sound_data: None,
            id: String::new(),
        }
    }

    pub fn set_sound_data(&mut self, sound_data: StaticSoundData) {
        self.sound_data = Some(sound_data);
    }

    pub fn set_sound_slices(&mut self, sound_slices: HashMap<i32, (i32, i32)>) {
        self.sound_slices = sound_slices;
    }
    pub fn set_id(&mut self, id: String) {
        self.id = id;
    }

    pub fn play_sound(&self, key: Option<i32>, reversed: bool) {
        let key = key.unwrap_or_else(|| {
            println!("Key {:?} not found in soundpack, playing random sound", key);
            1
        });
        if let Some(ranges) = self.sound_slices.get(&key) {
            let (start, end) = ranges;
            let start_seconds =
                PlaybackPosition::Seconds(Duration::from_millis(*start as u64).as_secs_f64());
            let end_seconds =
                Duration::from_secs_f64(Duration::from_millis(*end as u64).as_secs_f64());
            let mut sound_manager =
                AudioManager::<DefaultBackend>::new(kira::manager::AudioManagerSettings::default())
                    .unwrap();
            let slice = self
                .sound_data
                .clone()
                .unwrap()
                .start_position(start_seconds);
            let slice = slice.playback_rate(PlaybackRate::Factor(utils::get_random_f32_between(
                0.9, 1.1,
            ) as f64));
            let slice = if reversed {
                slice.volume(Volume::Amplitude(
                    utils::get_random_f32_between(0.1, 0.3) as f64
                ))
            } else {
                slice.volume(Volume::Amplitude(
                    utils::get_random_f32_between(0.8, 1.0) as f64
                ))
            };

            sound_manager.play(slice).unwrap().stop(Tween {
                start_time: StartTime::Delayed(end_seconds),
                duration: Duration::from_nanos(1),
                easing: Easing::Linear,
            })
        }
    }
}

pub fn prepare_sound_slices(soundpack_folder: &PathBuf) -> HashMap<i32, (i32, i32)> {
    let json_file_content = std::fs::read_to_string(soundpack_folder.join("config.json"))
        .expect("Something went wrong reading the file");
    let json: ConfigStruct =
        serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
    let mut sound_slices = HashMap::new();
    for (k, v) in json.defines.iter() {
        if let Some(v) = v {
            sound_slices.insert(*k, *v);
        }
    }
    sound_slices
}

pub fn prepare_sound_data(soundpack_folder: &PathBuf) -> StaticSoundData {
    let ogg_file = soundpack_folder.join("sound.ogg");
    StaticSoundData::from_file(ogg_file).unwrap()
}

pub async fn download_soundpack_if_necessary(
    soundpack_id: String,
    soundpack_destination: &PathBuf,
) {
    println!("Checking if soundpack exists: {:?}", soundpack_destination);
    if soundpack_destination.exists() {
        println!("Soundpack already exists, skipping download");
        return;
    }
    println!("Soundpack does not exist, downloading");
    let zip_file_url = format!("{}/{}.zip", REMOTE_SOUNDPACK_DIRECTORY, soundpack_id);
    println!("Downloading soundpack: {}", zip_file_url);
    let body = reqwest::get(zip_file_url)
        .await
        .unwrap()
        .bytes()
        .await
        .unwrap();

    fs::create_dir_all(soundpack_destination).unwrap();
    zip_extract::extract(Cursor::new(body), soundpack_destination, true).unwrap();
}
