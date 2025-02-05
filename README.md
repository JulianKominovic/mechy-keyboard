
[![mechy keyboard screenshot](https://github.com/user-attachments/assets/3d11f77e-2ba7-4f51-a8b5-baa8533d6f1f)](https://mechy-keyboard.jkominovic.dev)


## Installation
See [Mechy Keyboard Getting started guide](https://mechy-keyboard.jkominovic.dev/docs/getting-started)

## Features

Visit [Mechy Keyboard website](https://mechy-keyboard.jkominovic.dev)

### ⚡️ Fast & lightweight

- **Made in Tauri**: the app is made with Tauri, a fast and secure way to build web apps with Rust as backend. The app is ultra-lightweight and blazing fast.
- **Powered by Rust**: all the heavy lifting is done by Rust, a fast and safe language.
- **Instant sound**: the sound is played instantly when you press a key. No delay after the sound is loaded.
  <!-- - **Low CPU usage**: the app uses less than 1% of CPU when  -->
  <!-- - **Low memory usage**: the app uses less than 100MB of memory when running. -->
- **No stuttering**: the sound is played smoothly without any stuttering.
- **No lag**: the app is responsive and doesn't lag when you press keys.
- **No audio glitches**: the sound is played without any glitches.
<!-- - **Lightweight UI**: todavia no :) -->

### 1️⃣5️⃣ soundpacks

Thanks to [Mechvibes](https://mechvibes.com/sound-packs/) soundpacks for the amazing sounds.

- [x] Cherry MX Black - ABS keycaps
- [x] Cherry MX Black - PBT keycaps
- [x] Cherry MX Blue - ABS keycaps
- [x] Cherry MX Blue - PBT keycaps
- [x] Cherry MX Brown - ABS keycaps
- [x] Cherry MX Brown - PBT keycaps
- [x] Cherry MX Red - ABS keycaps
- [x] Cherry MX Red - PBT keycaps
- [x] Creams
- [x] EG Crystal Purple
- [x] EG Oreo
- [x] Glorious panda
- [x] Model FXT
- [x] Topre Purple Hybrid - PBT keycaps
- [ ] More to come!

### 🚫🔊📦 No pre-installed soundpacks

Just download the soundpacks you want from the UI.

### 🎧 Immersive sound

- **3D Sound**: sound is played in 3D space by panning the sounds when needed. Keys on the left sound on the left, keys on the right sound on the right, keys in the middle sound on the center. The sound is also played below you.
- **Little variations**: each key press has a little variation in pitch, speed and volume to make it sound more natural.
- **Key down and key up sounds**: we don't just play the sound when the key is pressed, we also play a more soft sound when the key is released to make it sound more realistic.

### 🔐 Privacy

I know this kind of software can be a privacy concern. That's why I made sure to respect your privacy:

- **No data collection**: we don't collect any data from you. We don't even have a server to store your data 😜.
- **No hidden keyloggers**: we don't log your keypresses. You can check the source code if you want to make sure. We don't have anything to hide.
- **Can run offline**: you can run the app without an internet connection after you download your favorite soundpacks.
- **No ads**: we don't show you ads. We don't have any incentive to show you ads. We just want to make a cool app for you.

I'm working on a way to block the app from accessing the internet. However I'm not sure if it's possible with Tauri. If you know how to do it, please let me know.

## References

- [Async tauri runtime example](https://rfdonnelly.github.io/posts/tauri-async-rust-process/#the-rust-side)
- [Tauri async commands conflict with std::sync::Mutex](https://stackoverflow.com/questions/67277282/async-function-the-trait-stdmarkersend-is-not-implemented-for-stdsync)
- [Tauri async commands official documentation](https://tauri.app/v1/guides/features/command/)

## Checklist

- [ ] Support newer Mechvibes soundpack schemas
- [ ] Add new soundpacks
- [x] Give credit to the soundpacks authors
- [x] Use standard folders
  - [x] logs
  - [x] app data
  - [x] app cache
- [x] Download soundpacks from CDN
- [ ] Click sounds
- [x] Change the soundpack
- [x] Change the volume
- [ ] Random mode: mixup a bunch of soundpacks
- [x] Key up sound
- [x] 3D sound
- [x] Key press variation
- [x] Key down sound
- [x] Shortcut for muting
- [x] Shortcut for changing volume
- [ ] Shortcut for changing soundpack
- [x] Tray icon
- [x] Minimize to tray
- [ ] Implement menubar features (like changing soundpack, volume, etc) on macOS
- [ ] Open on startup
- [ ] Block internet access
- [x] Add soundpacks metadata
- [ ] Implement tags
- [ ] Implement search
- [ ] Implement sorting
- [ ] Test on Windows
- [ ] Test on Linux
- [x] Test on macOS
- [ ] Reduce the app size
- [ ] Optimize the app
- [ ] Add a way to report bugs
- [ ] Add a way to request features
- [ ] Migration to Tauri 2.0
- [ ] Add a way to check for updates
- [ ] Remove the need for updating the app manually
- [ ] Remove the need for updating the app for new soundpacks
- [ ] Add a way to donate




## Development

Tauri development requisites: https://tauri.app/v1/guides/getting-started/prerequisites/


### Linux

#### Ubuntu 24.04

1. Install prerequisites

```bash
sudo apt-get update
sudo apt-get install build-essential pkg-config libglib2.0-dev libpango1.0-dev libgdk-pixbuf2.0-dev libatk-bridge2.0 libsoup2.4-dev libgtk-3-dev curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev javascriptcoregtk-4.1 libsoup-3.0 webkit2gtk-4.1 libwebkit2gtk-4.0-dev
```

### Soundpacks

1. Soundpacks come from [Mechvibes](https://mechvibes.com/sound-packs/).
2. Each soundpack is a zip file with the following structure **(for now)**:
   - `soundpack-name/`
     - `config.json`: metadata about the soundpack
     - `sound.ogg`: the sound file
3. I download the soundpacks from Mechvibes, compress them and upload them to github repo as a .zip file.
