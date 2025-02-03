pub mod key_code {

    use crate::keyboard_listener;
    /// Option
    const ALT: i32 = 56;
    /// Option_Right
    const ALT_GR: i32 = 3640;
    const BACKSPACE: i32 = 14;
    const CAPS_LOCK: i32 = 58;
    /// Control Right does not exist on Mac
    const CONTROL_LEFT: i32 = 29;
    const DOWN_ARROW: i32 = 57424;
    const ESCAPE: i32 = 1;
    const F1: i32 = 59;
    const F10: i32 = 68;
    const F11: i32 = 87;
    const F12: i32 = 88;
    const F2: i32 = 60;
    const F3: i32 = 61;
    const F4: i32 = 62;
    const F5: i32 = 63;
    const F6: i32 = 64;
    const F7: i32 = 65;
    const F8: i32 = 66;
    const F9: i32 = 67;
    const FUNCTION: i32 = 3666;
    const LEFT_ARROW: i32 = 57419;
    const META_LEFT: i32 = 3675;
    const META_RIGHT: i32 = 3676;
    const RETURN: i32 = 28;
    const RIGHT_ARROW: i32 = 57421;
    const SHIFT_LEFT: i32 = 42;
    const SHIFT_RIGHT: i32 = 54;
    const SPACE: i32 = 57;
    const TAB: i32 = 15;
    const UP_ARROW: i32 = 57416;
    const BACK_QUOTE: i32 = 41;

    const NUM1: i32 = 2;
    const NUM2: i32 = 3;
    const NUM3: i32 = 4;
    const NUM4: i32 = 5;
    const NUM5: i32 = 6;
    const NUM6: i32 = 7;
    const NUM7: i32 = 8;
    const NUM8: i32 = 9;
    const NUM9: i32 = 10;
    const NUM0: i32 = 11;
    const MINUS: i32 = 12;
    const EQUAL: i32 = 13;

    const KEY_Q: i32 = 16;
    const KEY_W: i32 = 17;
    const KEY_E: i32 = 18;
    const KEY_R: i32 = 19;
    const KEY_T: i32 = 20;
    const KEY_Y: i32 = 21;
    const KEY_U: i32 = 22;
    const KEY_I: i32 = 23;
    const KEY_O: i32 = 24;
    const KEY_P: i32 = 25;

    const LEFT_BRACKET: i32 = 26;
    const RIGHT_BRACKET: i32 = 27;

    const KEY_A: i32 = 30;
    const KEY_S: i32 = 31;
    const KEY_D: i32 = 32;
    const KEY_F: i32 = 33;
    const KEY_G: i32 = 34;
    const KEY_H: i32 = 35;
    const KEY_J: i32 = 36;
    const KEY_K: i32 = 37;
    const KEY_L: i32 = 38;
    const SEMI_COLON: i32 = 39;
    const QUOTE: i32 = 40;
    const BACK_SLASH: i32 = 43;

    const KEY_Z: i32 = 44;
    const KEY_X: i32 = 45;
    const KEY_C: i32 = 46;
    const KEY_V: i32 = 47;
    const KEY_B: i32 = 48;
    const KEY_N: i32 = 49;
    const KEY_M: i32 = 50;
    const COMMA: i32 = 51;
    const DOT: i32 = 52;
    const SLASH: i32 = 53;

    pub fn get_panning_from_key_location(key: keyboard_listener::Key) -> f64 {
        /*
           Min left pan 0.2
           Max right pan 0.8
        */
        match key {
            keyboard_listener::Key::Alt => 0.2,
            keyboard_listener::Key::AltGr => 0.8,
            keyboard_listener::Key::Backspace => 0.8,
            keyboard_listener::Key::CapsLock => 0.2,
            keyboard_listener::Key::ControlLeft => 0.2,
            keyboard_listener::Key::DownArrow => 0.75,
            keyboard_listener::Key::Escape => 0.2,
            keyboard_listener::Key::F1 => 0.2,
            keyboard_listener::Key::F10 => 0.65,
            keyboard_listener::Key::F11 => 0.7,
            keyboard_listener::Key::F12 => 0.75,
            keyboard_listener::Key::F2 => 0.2,
            keyboard_listener::Key::F3 => 0.25,
            keyboard_listener::Key::F4 => 0.3,
            keyboard_listener::Key::F5 => 0.35,
            keyboard_listener::Key::F6 => 0.4,
            keyboard_listener::Key::F7 => 0.45,
            keyboard_listener::Key::F8 => 0.5,
            keyboard_listener::Key::F9 => 0.55,
            keyboard_listener::Key::LeftArrow => 0.8,
            keyboard_listener::Key::MetaLeft => 0.2,
            keyboard_listener::Key::MetaRight => 0.8,
            keyboard_listener::Key::Return => 0.7,
            keyboard_listener::Key::RightArrow => 0.8,
            keyboard_listener::Key::ShiftLeft => 0.2,
            keyboard_listener::Key::ShiftRight => 0.7,
            keyboard_listener::Key::Space => 0.5,
            keyboard_listener::Key::Tab => 0.2,
            keyboard_listener::Key::UpArrow => 0.7,
            keyboard_listener::Key::BackQuote => 0.6,
            keyboard_listener::Key::Num1 => 0.2,
            keyboard_listener::Key::Num2 => 0.25,
            keyboard_listener::Key::Num3 => 0.3,
            keyboard_listener::Key::Num4 => 0.35,
            keyboard_listener::Key::Num5 => 0.4,
            keyboard_listener::Key::Num6 => 0.45,
            keyboard_listener::Key::Num7 => 0.5,
            keyboard_listener::Key::Num8 => 0.55,
            keyboard_listener::Key::Num9 => 0.6,
            keyboard_listener::Key::Num0 => 0.65,
            keyboard_listener::Key::Minus => 0.65,
            keyboard_listener::Key::Equal => 0.6,
            keyboard_listener::Key::KeyQ => 0.3,
            keyboard_listener::Key::KeyW => 0.35,
            keyboard_listener::Key::KeyE => 0.4,
            keyboard_listener::Key::KeyR => 0.45,
            keyboard_listener::Key::KeyT => 0.5,
            keyboard_listener::Key::KeyY => 0.55,
            keyboard_listener::Key::KeyU => 0.6,
            keyboard_listener::Key::KeyI => 0.6,
            keyboard_listener::Key::KeyO => 0.6,
            keyboard_listener::Key::KeyP => 0.65,
            keyboard_listener::Key::LeftBracket => 0.65,
            keyboard_listener::Key::RightBracket => 0.7,
            keyboard_listener::Key::KeyA => 0.35,
            keyboard_listener::Key::KeyS => 0.4,
            keyboard_listener::Key::KeyD => 0.45,
            keyboard_listener::Key::KeyF => 0.45,
            keyboard_listener::Key::KeyG => 0.5,
            keyboard_listener::Key::KeyH => 0.55,
            keyboard_listener::Key::KeyJ => 0.6,
            keyboard_listener::Key::KeyK => 0.6,
            keyboard_listener::Key::KeyL => 0.65,
            keyboard_listener::Key::SemiColon => 0.65,
            keyboard_listener::Key::Quote => 0.7,
            keyboard_listener::Key::BackSlash => 0.75,
            keyboard_listener::Key::KeyZ => 0.4,
            keyboard_listener::Key::KeyX => 0.45,
            keyboard_listener::Key::KeyC => 0.5,
            keyboard_listener::Key::KeyV => 0.55,
            keyboard_listener::Key::KeyB => 0.6,
            keyboard_listener::Key::KeyN => 0.65,
            keyboard_listener::Key::KeyM => 0.7,
            keyboard_listener::Key::Comma => 0.75,
            keyboard_listener::Key::Dot => 0.75,
            keyboard_listener::Key::Slash => 0.8,
            keyboard_listener::Key::Function => 0.5,

            _ => 0.5,
        }
    }

    pub fn code_from_key(key: keyboard_listener::Key) -> Option<i32> {
        match key {
            keyboard_listener::Key::Alt => Some(ALT),
            keyboard_listener::Key::AltGr => Some(ALT_GR),
            keyboard_listener::Key::Backspace => Some(BACKSPACE),
            keyboard_listener::Key::CapsLock => Some(CAPS_LOCK),
            keyboard_listener::Key::ControlLeft => Some(CONTROL_LEFT),
            keyboard_listener::Key::DownArrow => Some(DOWN_ARROW),
            keyboard_listener::Key::Escape => Some(ESCAPE),
            keyboard_listener::Key::F1 => Some(F1),
            keyboard_listener::Key::F10 => Some(F10),
            keyboard_listener::Key::F11 => Some(F11),
            keyboard_listener::Key::F12 => Some(F12),
            keyboard_listener::Key::F2 => Some(F2),
            keyboard_listener::Key::F3 => Some(F3),
            keyboard_listener::Key::F4 => Some(F4),
            keyboard_listener::Key::F5 => Some(F5),
            keyboard_listener::Key::F6 => Some(F6),
            keyboard_listener::Key::F7 => Some(F7),
            keyboard_listener::Key::F8 => Some(F8),
            keyboard_listener::Key::F9 => Some(F9),
            keyboard_listener::Key::LeftArrow => Some(LEFT_ARROW),
            keyboard_listener::Key::MetaLeft => Some(META_LEFT),
            keyboard_listener::Key::MetaRight => Some(META_RIGHT),
            keyboard_listener::Key::Return => Some(RETURN),
            keyboard_listener::Key::RightArrow => Some(RIGHT_ARROW),
            keyboard_listener::Key::ShiftLeft => Some(SHIFT_LEFT),
            keyboard_listener::Key::ShiftRight => Some(SHIFT_RIGHT),
            keyboard_listener::Key::Space => Some(SPACE),
            keyboard_listener::Key::Tab => Some(TAB),
            keyboard_listener::Key::UpArrow => Some(UP_ARROW),
            keyboard_listener::Key::BackQuote => Some(BACK_QUOTE),
            keyboard_listener::Key::Num1 => Some(NUM1),
            keyboard_listener::Key::Num2 => Some(NUM2),
            keyboard_listener::Key::Num3 => Some(NUM3),
            keyboard_listener::Key::Num4 => Some(NUM4),
            keyboard_listener::Key::Num5 => Some(NUM5),
            keyboard_listener::Key::Num6 => Some(NUM6),
            keyboard_listener::Key::Num7 => Some(NUM7),
            keyboard_listener::Key::Num8 => Some(NUM8),
            keyboard_listener::Key::Num9 => Some(NUM9),
            keyboard_listener::Key::Num0 => Some(NUM0),
            keyboard_listener::Key::Minus => Some(MINUS),
            keyboard_listener::Key::Equal => Some(EQUAL),
            keyboard_listener::Key::KeyQ => Some(KEY_Q),
            keyboard_listener::Key::KeyW => Some(KEY_W),
            keyboard_listener::Key::KeyE => Some(KEY_E),
            keyboard_listener::Key::KeyR => Some(KEY_R),
            keyboard_listener::Key::KeyT => Some(KEY_T),
            keyboard_listener::Key::KeyY => Some(KEY_Y),
            keyboard_listener::Key::KeyU => Some(KEY_U),
            keyboard_listener::Key::KeyI => Some(KEY_I),
            keyboard_listener::Key::KeyO => Some(KEY_O),
            keyboard_listener::Key::KeyP => Some(KEY_P),
            keyboard_listener::Key::LeftBracket => Some(LEFT_BRACKET),
            keyboard_listener::Key::RightBracket => Some(RIGHT_BRACKET),
            keyboard_listener::Key::KeyA => Some(KEY_A),
            keyboard_listener::Key::KeyS => Some(KEY_S),
            keyboard_listener::Key::KeyD => Some(KEY_D),
            keyboard_listener::Key::KeyF => Some(KEY_F),
            keyboard_listener::Key::KeyG => Some(KEY_G),
            keyboard_listener::Key::KeyH => Some(KEY_H),
            keyboard_listener::Key::KeyJ => Some(KEY_J),
            keyboard_listener::Key::KeyK => Some(KEY_K),
            keyboard_listener::Key::KeyL => Some(KEY_L),
            keyboard_listener::Key::SemiColon => Some(SEMI_COLON),
            keyboard_listener::Key::Quote => Some(QUOTE),
            keyboard_listener::Key::BackSlash => Some(BACK_SLASH),
            keyboard_listener::Key::KeyZ => Some(KEY_Z),
            keyboard_listener::Key::KeyX => Some(KEY_X),
            keyboard_listener::Key::KeyC => Some(KEY_C),
            keyboard_listener::Key::KeyV => Some(KEY_V),
            keyboard_listener::Key::KeyB => Some(KEY_B),
            keyboard_listener::Key::KeyN => Some(KEY_N),
            keyboard_listener::Key::KeyM => Some(KEY_M),
            keyboard_listener::Key::Comma => Some(COMMA),
            keyboard_listener::Key::Dot => Some(DOT),
            keyboard_listener::Key::Slash => Some(SLASH),
            keyboard_listener::Key::Function => Some(FUNCTION),
            _ => None,
        }
    }
}
