import {
  SpeakerX,
  SpeakerLow,
  SpeakerHigh,
  Plus,
  Minus,
} from "@phosphor-icons/react";
import { useDebounceFunction } from "../utils/debounce-fn";
import { toast } from "sonner";
import { error } from "tauri-plugin-log-api";
import { tauriOrJsKeyToString } from "../utils/keymaps";
import Shortcut from "./shortcut";
import { setVolumeLevel } from "../integration/soundpacks";
import useVolumeStore from "../stores/volume";
import useShortcutsStore from "../stores/shortcuts";
import Button from "./button";

const VolumeSlider = () => {
  const { debounce } = useDebounceFunction(50);
  const volumeStore = useVolumeStore((s) => s);
  const value = volumeStore.volume;
  const volumeUpShortcut = useShortcutsStore((s) => s.shortcuts.volumeUp);
  const volumeDownShortcut = useShortcutsStore((s) => s.shortcuts.volumeDown);
  const muteShortcut = useShortcutsStore((s) => s.shortcuts.mute);

  function setVolume(value: number) {
    value = Math.min(100, Math.max(0, value));
    volumeStore.setVolume(value);
    debounce(() => {
      setVolumeLevel(value / 100).catch((err) => {
        error("Failed to set volume level" + err);
        toast.error("Failed to set volume level", {
          duration: 5000,
          description: err,
        });
      });
    });
  }

  return (
    <fieldset className="relative z-10 select-none text-primary-800">
      <label
        htmlFor="volume"
        className="block font-semibold leading-tight text-primary-900 whitespace-nowrap dark:text-white"
      >
        Volume ({value}%)
      </label>
      <p className="mb-4 text-sm text-primary-900/70">
        Volume is relative to the system volume.
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            setVolume(value - 5);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          <Minus weight="bold" />
          <Shortcut
            className="pl-1 border-l border-primary-900/20"
            keys={volumeDownShortcut.visual.map(tauriOrJsKeyToString)}
          />
        </Button>
        <input
          id="volume"
          type="range"
          value={value}
          min={0}
          max={100}
          step={1}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer max-w-64 bg-primary-900/20"
        />
        <Button
          onClick={() => {
            setVolume(value + 5);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          <Plus weight="bold" />
          <Shortcut
            className="pl-1 border-l border-primary-900/20"
            keys={volumeUpShortcut.visual.map(tauriOrJsKeyToString)}
          />
        </Button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button
          onClick={volumeStore.toggleMute}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          {value === 0 ? (
            <SpeakerX
              color=""
              className="fill-primary-900"
              weight="duotone"
              size={20}
            />
          ) : value < 50 ? (
            <SpeakerLow
              color=""
              className="fill-primary-900"
              weight="duotone"
              size={20}
            />
          ) : (
            <SpeakerHigh
              color=""
              className="fill-primary-900"
              weight="duotone"
              size={20}
            />
          )}
          <Shortcut
            className="pl-1 border-l border-primary-900/20"
            keys={muteShortcut.visual.map(tauriOrJsKeyToString)}
          />
        </Button>
        <Button
          onClick={() => {
            setVolume(25);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          25%
        </Button>
        <Button
          onClick={() => {
            setVolume(50);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          50%
        </Button>
        <Button
          onClick={() => {
            setVolume(75);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          75%
        </Button>
        <Button
          onClick={() => {
            setVolume(100);
          }}
          variant="secondary"
          size="sm"
          className="px-2 text-base text-primary-900"
        >
          100%
        </Button>
      </div>
    </fieldset>
  );
};

export default VolumeSlider;
