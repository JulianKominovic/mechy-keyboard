use crate::{
    soundpacks::{self, download_soundpack_if_necessary},
    SOUNDPACK,
};
use log::trace;
use std::path::PathBuf;

#[tauri::command]
pub async fn set_volume_level(volume: f32) -> Result<(), String> {
    if volume < 0.0 || volume > 1.0 {
        return Err("For good sake of your ears volume must be between 0.0 and 1.0. If you see this, probably a bug happened.".to_string());
    }
    trace!("Setting volume to: {}", volume);
    let mut soundpack_lock = SOUNDPACK.lock().await;
    soundpack_lock.set_volume(volume);
    Ok(())
}

#[tauri::command]
pub async fn choose_soundpack(
    soundpack_id: String,
    soundpack_folder: String,
) -> Result<(), String> {
    trace!(
        "Choosing soundpack: {} with folder located in: {}",
        soundpack_id,
        soundpack_folder
    );
    let new_soundpack_folder = PathBuf::from(soundpack_folder).join(&soundpack_id);
    trace!("New soundpack folder will be: {:?}", new_soundpack_folder);
    let download_result =
        download_soundpack_if_necessary(soundpack_id, &new_soundpack_folder).await;
    if download_result.is_err() {
        return Err(download_result.unwrap_err());
    }
    let new_soundpack_sound_data = soundpacks::prepare_sound_data(&new_soundpack_folder);
    let new_soundpack_slices = soundpacks::prepare_sound_slices(&new_soundpack_folder);
    trace!("New soundpack slices: {:?}", new_soundpack_slices);
    trace!("New soundpack sound data: {:?}", new_soundpack_sound_data);
    let mut soundpack_lock = SOUNDPACK.lock().await;

    if new_soundpack_sound_data.is_err() {
        return Err("Error preparing sounds".to_string());
    }
    if new_soundpack_slices.is_empty() {
        return Err("Error preparing sound slices".to_string());
    }
    soundpack_lock.set_sound_data(Some(new_soundpack_sound_data.unwrap()));
    soundpack_lock.set_sound_slices(new_soundpack_slices);

    Ok(())
}
