# Mechy Keyboard

## Features

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

## Thanks to

- [Kira Rust backend agnostic library](https://docs.rs/kira/latest/kira/index.html) for the audio server manager
- [Mechvibes](https://github.com/hainguyents13/mechvibes/) for the soundpacks and the inspiration. Check their [website](https://mechvibes.com/).
- Check [Rusty vibes](https://github.com/KunalBagaria/rustyvibes). I took some inspiration from it and source code also 😜.
- [Fufesou rdev fork](https://github.com/fufesou/rdev) that fixes a macOS crash bug
- [Fooocus](https://github.com/lllyasviel/Fooocus) for AI logo generation
- [IOPaint](https://github.com/Sanster/IOPaint) an open source AI objects remover to fix some artifacts in the generated logos
- [Upscayl](https://upscayl.org/) to scale the generated logos up to 4k
- [Adobe AI background remover](https://www.adobe.com/express/feature/ai/image/remove-background)
- [tints.dev](https://www.tints.dev/primary/D9AC92) for the color palette

## Checklist

- [ ] Support newer Mechvibes soundpack schemas
- [ ] Add new soundpacks
- [ ] Give credit to the soundpacks authors
- [x] Use standard folders
  - [x] logs
  - [x] app data
  - [x] app cache
- [x] Download soundpacks from CDN
- [ ] Click sounds
- [x] Change the soundpack
- [ ] Change the volume
- [ ] Random mode: mixup a bunch of soundpacks
- [x] Key up sound
- [x] 3D sound
- [x] Key press variation
- [x] Key down sound
- [ ] Shortcut for muting
- [ ] Shortcut for changing soundpack
- [ ] Shortcut for changing volume
- [ ] Tray icon
- [ ] Minimize to tray
- [ ] Implement menubar features (like changing soundpack, volume, etc) on macOS
- [ ] Open on startup
- [ ] Block internet access
- [ ] Think about a way to block the app from accessing the internet (if possible)
- [ ] Add soundpacks metadata
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

## Technical details

This app is a mere excuse to learn Rust and Tauri.
The source code may not be large, although it required a lot of research and testing to make it work.
In this few houndred lines of code you will find a lot of interesting things such as:

- [x] Tauri commands
- [x] Tauri window management
- [x] Rust async
- [x] Multithreading
- [x] Mutexes
- [x] Audio management

### Soundpacks

1. Soundpacks come from [Mechvibes](https://mechvibes.com/sound-packs/).
2. Each soundpack is a zip file with the following structure **(for now)**:
   - `soundpack-name/`
     - `config.json`: metadata about the soundpack
     - `sound.ogg`: the sound file
3. I download the soundpacks from Mechvibes, compress them and upload them to github repo as a .zip file.

### Key listener

I know this is a privacy concern because the app listens to your key events. That's why I'm going to explain how the key listener works.
This is probably the most important part of the app.

I'm using [Fufesou rdev fork](https://github.com/fufesou/rdev).
Rust crate [here](https://docs.rs/rdev/latest/rdev/).

rdev is a Rust library that allows you to listen to key events. It's a simple library that listens to key and mouse events.

1. As listen function from [Fufesou rdev fork](https://github.com/fufesou/rdev) is blocking I need to spawn a new thread in order to listen to the key events.
2. I'm going to explain how it works. The thread code is the following:

```rust
// Spawn a new thread to avoid blocking the main thread (UI thread and Tauri's runtime)
thread::spawn(|| {
        // Listen to IO events
        // This listener now is listen for your mouse & keyboard events
        if let Err(error) = listen(move |event| match event.event_type {
            // When a key is pressed
            EventType::KeyPress(key) => {
                // KEY_PRESSED is a mutable mutex that contains a list of keys that are currently pressed
                // With this method we avoid playing the sound multiple times when the key is pressed and held
                let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                // If the key is already pressed, we do nothing and prevent the sound from playing
                if keys_pressed_lock.contains(&key) {
                    drop(keys_pressed_lock);
                    return;
                } else {
                    // If the key is not pressed, we add it to the list
                    keys_pressed_lock.push(key);
                    drop(keys_pressed_lock);
                }
                // This line do the magic
                tauri::async_runtime::block_on(async {
                    // SOUNDPACK is a mutable mutex that contains the Soundpack struct with the sound data
                    // Here we are passing the key to the play_sound function and a boolean to indicate if the sound is a key up sound
                    SOUNDPACK.lock().await.play_sound(key, false);
                });
            }
            // When a key is released
            EventType::KeyRelease(key) => {
                let mut keys_pressed_lock = KEYS_PRESSED.lock().unwrap();
                // We remove the key from the list of keys that are currently pressed
                keys_pressed_lock.retain(|&x| x != key);
                tauri::async_runtime::block_on(async {
                    // We play the key up sound
                    SOUNDPACK.lock().await.play_sound(key, true);
                });
            }
            // We don't care about other events such as mouse clicks, mouse movements, mouse scrolls, etc
            _ => {}
        }) {
            error!("Error: {:?}", error)
        }
    });
```

You can check the main.rs file [here](https://github.com/JulianKominovic/mechy-keyboard/blob/master/src-tauri/src/main.rs#L83C5-L111C8)

3. To keep things responsive we avoid doing heavy operations in the previous thread so we don't block it. Sound were already prepared in the `choose_soundpack` tauri command which is called by the frontend when the app starts **(I'm 99% sure this will change in the future)**.
4. So when a key is pressed, we just play the sound. We don't load the sound, we just play it. This is why the app is so fast and responsive.
