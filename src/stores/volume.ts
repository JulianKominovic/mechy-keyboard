import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setVolumeLevel } from "../integration/soundpacks";
import { error } from "tauri-plugin-log-api";
import { toast } from "sonner";

type VolumeStore = {
  volume: number;
  previousVolumeBeforeMute: number;
};

type VolumeStoreMethods = {
  setVolume: (value: number) => void;
  toggleMute: () => void;
  sendVolumeLevel: () => void;
};

const useVolumeStore = create(
  persist<VolumeStore & VolumeStoreMethods>(
    (set, get) => ({
      volume: 50,
      previousVolumeBeforeMute: 50,

      setVolume(value: number) {
        value = Math.min(100, Math.max(0, value));
        set({ volume: value, previousVolumeBeforeMute: get().volume });
      },
      toggleMute() {
        if (get().volume === 0) {
          set({ volume: get().previousVolumeBeforeMute });
        } else {
          set({ volume: 0, previousVolumeBeforeMute: get().volume });
        }
        get().sendVolumeLevel();
      },
      sendVolumeLevel() {
        setVolumeLevel(get().volume / 100).catch((err) => {
          error("Failed to set volume level" + err);
          toast.error("Failed to set volume level", {
            duration: 5000,
            description: err,
          });
        });
      },
    }),
    {
      name: "volume",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useVolumeStore;
