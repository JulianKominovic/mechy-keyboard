use kira::{
    manager::{AudioManager, DefaultBackend},
    sound::{static_sound::StaticSoundData, FromFileError, PlaybackPosition, PlaybackRate},
    tween::{Easing, Tween},
    StartTime, Volume,
};
use log::{error, trace};
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, fs, io::Cursor, path::PathBuf, time::Duration};

use crate::{
    constants::REMOTE_SOUNDPACK_DIRECTORY,
    keyboard_listener,
    keypress::key_code::{code_from_key, get_panning_from_key_location},
    utils,
};

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
    pub volume: f32,
}

impl Soundpack {
    pub fn new() -> Self {
        Soundpack {
            sound_slices: HashMap::new(),
            sound_data: None,
            id: String::new(),
            volume: 0.5,
        }
    }

    pub fn set_volume(&mut self, volume: f32) {
        self.volume = volume;
    }

    pub fn set_sound_data(&mut self, sound_data: Option<StaticSoundData>) {
        self.sound_data = sound_data;
    }

    pub fn set_sound_slices(&mut self, sound_slices: HashMap<i32, (i32, i32)>) {
        self.sound_slices = sound_slices;
    }
    pub fn set_id(&mut self, id: String) {
        self.id = id;
    }

    pub fn play_sound(&self, key: keyboard_listener::Key, reversed: bool) {
        let key_code = code_from_key(key).unwrap_or_else(|| 1);
        let panning_from_key = get_panning_from_key_location(key);
        if let Some(ranges) = self.sound_slices.get(&key_code) {
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
            let slice = slice.panning(panning_from_key);
            let slice = if reversed {
                slice.volume(Volume::Amplitude(utils::get_random_f32_between(
                    0.1 * self.volume,
                    0.2 * self.volume,
                ) as f64))
            } else {
                slice.volume(Volume::Amplitude(utils::get_random_f32_between(
                    0.8 * self.volume,
                    1.0 * self.volume,
                ) as f64))
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
    let json_file_content = match std::fs::read_to_string(soundpack_folder.join("config.json")) {
        Ok(content) => content,
        Err(e) => {
            error!(
                "Error reading config.json from {:?}: {:?}",
                soundpack_folder, e
            );
            return HashMap::new();
        }
    };

    let json: ConfigStruct = match serde_json::from_str(json_file_content.as_str()) {
        Ok(json) => json,
        Err(e) => {
            error!(
                "Error parsing config.json from {:?}: {:?}",
                soundpack_folder, e
            );
            return HashMap::new();
        }
    };

    let mut sound_slices = HashMap::new();
    for (k, v) in json.defines.iter() {
        if let Some(v) = v {
            sound_slices.insert(*k, *v);
        }
    }
    sound_slices
}

pub fn prepare_sound_data(soundpack_folder: &PathBuf) -> Result<StaticSoundData, FromFileError> {
    let ogg_file = soundpack_folder.join("sound.ogg");
    StaticSoundData::from_file(ogg_file)
}

pub async fn download_soundpack_if_necessary(
    soundpack_id: String,
    soundpack_destination: &PathBuf,
) -> Result<(), String> {
    trace!("Checking if soundpack exists: {:?}", soundpack_destination);
    if soundpack_destination.exists() {
        println!("Soundpack already exists, skipping download");
        return Ok(());
    }
    trace!("Soundpack does not exist, downloading");
    let zip_file_url = format!("{}/{}.zip", REMOTE_SOUNDPACK_DIRECTORY, soundpack_id);
    trace!("Downloading soundpack: {}", zip_file_url);
    let body = if let Ok(body) = reqwest::get(&zip_file_url).await {
        body
    } else {
        let error = format!("Error downloading soundpack GET {}", zip_file_url);
        trace!("{error}");
        return Err(error);
    };
    trace!("Downloaded file, getting bytes");
    let body = if let Ok(bytes) = body.bytes().await {
        bytes
    } else {
        let error = "Error getting bytes from response".to_string();
        trace!("{error}");
        return Err(error);
    };
    trace!("Creating soundpack destination directory");
    let create_dir_result = fs::create_dir_all(soundpack_destination);
    if create_dir_result.is_err() {
        let error = format!(
            "Error creating soundpack destination directory: {:?}",
            soundpack_destination
        );
        trace!("{error}");
        return Err(error);
    }

    trace!("Extracting zip file");
    let extracted_zip_result = zip_extract::extract(Cursor::new(body), soundpack_destination, true);
    if extracted_zip_result.is_err() {
        let error = format!("Error extracting zip file");
        trace!("{} {:?}", error, extracted_zip_result.unwrap_err());
        return Err(error);
    }
    Ok(())
}
