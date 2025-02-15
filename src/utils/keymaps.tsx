import { PLATFORM } from "../init";

export const Keys = {
  MAC_COMMAND: "⌘",
  MAC_OPTION: "⌥",
  MAC_CONTROL: "⌃",
  SHIFT: "⇧",
  ENTER: "⏎",
  DELETE: "⌫",
  TAB: "⇥",
  SPACE: "␣",
  ARROW_UP: "↑",
  ARROW_DOWN: "↓",
  ARROW_LEFT: "←",
  ARROW_RIGHT: "→",
  PAGE_UP: "⇞",
  PAGE_DOWN: "⇟",
  HOME: "↖",
  END: "↘",
  BACKSPACE: "⌫",
  CAPS_LOCK: "⇪",
  PRINT_SCREEN: "PrtSc",
  SCROLL_LOCK: "⇳",
  PAUSE_BREAK: "Pause",
  INSERT: "Ins",
  NUM_LOCK: "Num",
  CONTEXT_MENU: "Menu",
  WINDOWS: "⊞",
  ALT: "Alt",
  CONTROL: "Ctrl",
} as const;

export function tauriOrJsKeyToString(key: string) {
  switch (key.toUpperCase()) {
    case "META":
    case "METALEFT":
    case "METARIGHT":
      return PLATFORM === "darwin" ? Keys.MAC_COMMAND : Keys.WINDOWS;
    case "CMD":
    case "COMMAND":
    case "CMDORCTRL":
    case "CMDORCONTROL":
    case "COMMANDORCONTROL":
      return PLATFORM === "darwin" ? Keys.MAC_COMMAND : Keys.CONTROL;
    case "SHIFT":
    case "SHIFTLEFT":
    case "SHIFTRIGHT":
      return Keys.SHIFT;
    case "ALT":
    case "ALTLEFT":
    case "ALTRIGHT":
      return PLATFORM === "darwin" ? Keys.MAC_OPTION : Keys.ALT;
    case "UP":
    case "ARROWUP":
      return Keys.ARROW_UP;
    case "DOWN":
    case "ARROWDOWN":
      return Keys.ARROW_DOWN;
    case "LEFT":
    case "ARROWLEFT":
      return Keys.ARROW_LEFT;
    case "RIGHT":
    case "ARROWRIGHT":
      return Keys.ARROW_RIGHT;
    case "OPTION":
      return Keys.MAC_OPTION;
    case "CTRL":
    case "CONTROL":
    case "CONTROLORCMD":
    case "CONTROLORCOMMAND":
    case "CTRLLEFT":
    case "CONTROLLEFT":
      return PLATFORM === "darwin" ? Keys.MAC_CONTROL : Keys.CONTROL;
    default:
      return key;
  }
}

/**
 * Important:
 *  For tauri:
 *    - Modifier keys should come from e.key
 *    - The rest should come from e.code
 *  For the UI:
 *    - Modifier keys should come from e.key and parsed by OS
 */

// export function jsKeyToTauriKey(key: string) {
//   switch (key.toUpperCase()) {
//     case "ARROWUP":
//     case "UP":
//       return "ArrowUp";
//     case "ARROWDOWN":
//     case "DOWN":
//       return "ArrowDown";
//     case "ARROWLEFT":
//     case "LEFT":
//       return "ArrowLeft";
//     case "ARROWRIGHT":
//     case "RIGHT":
//       return "ArrowRight";
//     case "META":
//     case "METALEFT":
//       return PLATFORM === "darwin" ? "Command" : "Win";
//     case "ALTLEFT":
//     case "ALT":
//       return PLATFORM === "darwin" ? "Option" : "Alt";
//     case "SHIFT":
//     case "SHIFTLEFT":
//       return "Shift";
//     case "CTRL":
//     case "CONTROL":
//     case "CTRLLEFT":
//     case "CONTROLLEFT":
//       return PLATFORM === "darwin" ? "Control" : "Ctrl";
//     default:
//       return key;
//   }
// }
