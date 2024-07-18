use kira::{
    manager::{AudioManager, DefaultBackend},
    sound::{static_sound::StaticSoundData, PlaybackPosition, PlaybackRate},
    tween::{Easing, Tween},
    StartTime, Volume,
};
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, path::Path, time::Duration};

use crate::utils;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ConfigStruct {
    pub defines: HashMap<i32, Option<(i32, i32)>>,
}

#[derive(Debug, Clone)]
pub struct Soundpack {
    pub sound_slices: HashMap<i32, (i32, i32)>,
    pub sound_data: Option<StaticSoundData>,
}

impl Soundpack {
    pub fn new() -> Self {
        Soundpack {
            sound_slices: HashMap::new(),
            sound_data: None,
        }
    }

    pub fn choose_soundpack(&mut self, folder_path: String) -> () {
        let json_file_content =
            std::fs::read_to_string(Path::new(&folder_path).join("config.json"))
                .expect("Something went wrong reading the file");
        let json: ConfigStruct =
            serde_json::from_str(json_file_content.as_str()).expect("JSON was not well-formatted");
        let defines: HashMap<i32, (i32, i32)> =
            json.defines.iter().map(|(k, v)| (*k, v.unwrap())).collect();
        let ogg_file = Path::new(&folder_path).join("sound.ogg");
        let sound_data = StaticSoundData::from_file(ogg_file).unwrap();

        self.sound_slices = defines;
        self.sound_data = Some(sound_data);
    }
    pub fn play_sound(&self, key: Option<i32>) {
        let key = key.unwrap_or_else(|| 1);
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
            let slice = slice.volume(Volume::Amplitude(
                utils::get_random_f32_between(0.8, 1.0) as f64
            ));
            sound_manager.play(slice).unwrap().stop(Tween {
                start_time: StartTime::Delayed(end_seconds),
                duration: Duration::from_nanos(1),
                easing: Easing::Linear,
            })
        }
    }
}
