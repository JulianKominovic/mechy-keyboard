import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useVolumeStore from "./volume";
import {
  clearKeyboardShortcuts,
  registerKeyboardShortcut,
  unregisterKeyboardShortcut,
} from "../utils/shortcut";
import { DEFAULT_SHORTCUTS } from "../init";
// import { jsKeyToTauriKey } from "../utils/keymaps";
import { trace } from "tauri-plugin-log-api";

type ShortcutsStore = {
  shortcuts: {
    volumeUp: {
      internal: string[];
      visual: string[];
    };
    volumeDown: {
      internal: string[];
      visual: string[];
    };
    mute: {
      internal: string[];
      visual: string[];
    };
  };
};

type ShortcutsStoreMethods = {
  setShortcut: (
    shortcut: keyof ShortcutsStore["shortcuts"],
    keys: string[],
    visualKeys: string[]
  ) => void;
  // resetVolumeUp: () => void;
  // resetVolumeDown: () => void;
  // resetMute: () => void;
  resetShortcut: (shortcut: keyof ShortcutsStore["shortcuts"]) => void;
  attachShortcuts: () => void;
  resetShortcuts: () => void;
};

const useShortcutsStore = create(
  persist<ShortcutsStore & ShortcutsStoreMethods>(
    (set, get) => ({
      /**
       * Set a keyboard shortcut for a specific action
       * Important:
       *  For tauri:
       *    - Modifier keys should come from e.key
       *    - The rest should come from e.code
       *  For the UI:
       *    - Modifier keys should come from e.key and parsed by OS
       */
      async setShortcut(shortcut, keys, visualKeys) {
        trace(`Setting shortcut ${shortcut} to ${keys}`);
        const oldShortcut = get().shortcuts[shortcut].internal.join("+");
        const newShortcutKeys = keys.join("+");
        await unregisterKeyboardShortcut(oldShortcut).catch(() => {});
        switch (shortcut) {
          case "volumeUp":
            registerKeyboardShortcut(newShortcutKeys, () => {
              useVolumeStore
                .getState()
                .setVolume(useVolumeStore.getState().volume + 5);
              useVolumeStore.getState().sendVolumeLevel();
            });
            break;
          case "volumeDown":
            registerKeyboardShortcut(newShortcutKeys, () => {
              useVolumeStore
                .getState()
                .setVolume(useVolumeStore.getState().volume - 5);
              useVolumeStore.getState().sendVolumeLevel();
            });
            break;
          case "mute":
            registerKeyboardShortcut(
              newShortcutKeys,
              useVolumeStore.getState().toggleMute
            );
            break;
        }
        set({
          shortcuts: {
            ...get().shortcuts,
            [shortcut]: {
              internal: keys,
              visual: visualKeys,
            },
          },
        });
      },
      resetShortcut(shortcut) {
        get().setShortcut(
          shortcut,
          DEFAULT_SHORTCUTS[shortcut].internal,
          DEFAULT_SHORTCUTS[shortcut].visual
        );
      },
      shortcuts: DEFAULT_SHORTCUTS,
      attachShortcuts() {
        const { shortcuts, setShortcut } = get();
        for (const shortcut in shortcuts) {
          const s = shortcut as keyof ShortcutsStore["shortcuts"];
          setShortcut(s, shortcuts[s].internal, shortcuts[s].visual);
        }
      },
      resetShortcuts() {
        clearKeyboardShortcuts().finally(() => {
          const { shortcuts, setShortcut } = get();
          for (const shortcut in shortcuts) {
            const s = shortcut as keyof ShortcutsStore["shortcuts"];
            setShortcut(
              s,
              DEFAULT_SHORTCUTS[s].internal,
              DEFAULT_SHORTCUTS[s].visual
            );
          }
        });
      },
    }),
    {
      name: "shortcuts",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useShortcutsStore;
