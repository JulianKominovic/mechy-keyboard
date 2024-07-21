import { useCallback, useDeferredValue, useEffect, useRef } from "react";
import useLocalStorage from "use-local-storage";
import {
  LOCAL_STORAGE_VOLUME_KEY,
  MUTE_SHORTCUT,
  PLATFORM,
  VOLUME_DOWN_SHORTCUT,
  VOLUME_UP_SHORTCUT,
} from "../init";
import {
  SpeakerX,
  SpeakerLow,
  SpeakerHigh,
  Plus,
  Minus,
} from "@phosphor-icons/react";
import { useDebounceFunction } from "../utils/debounce-fn";
import { setVolumeLevel } from "../bindings";
import { toast } from "sonner";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { error } from "tauri-plugin-log-api";
import { Keys } from "../utils/keymaps";
import Shortcut from "./shortcut";

async function registerKeyboardShortcut(
  shortcut: string,
  callback: () => void
) {
  await unregister(shortcut)
    .then(() => {
      register(shortcut, callback).catch((err) => {
        toast.warning("Error registering shortcut", {
          duration: 5000,
          description: err,
        });
        error("Failed to register shortcut" + err);
      });
    })
    .catch((err) => {
      toast.warning("Error unregistering shortcut", {
        duration: 5000,
        description: err,
      });
      error("Failed to unregister shortcut" + err);
    });

  return () =>
    unregister(shortcut).catch((err) => {
      toast.warning("Error unregistering shortcut", {
        duration: 5000,
        description: err,
      });
    });
}

const VolumeSlider = () => {
  const { debounce } = useDebounceFunction(50);
  const [value, setValue] = useLocalStorage<number>(
    LOCAL_STORAGE_VOLUME_KEY,
    50,
    {
      serializer: (val) => val?.toString() || "50",
      parser: (val) => parseInt(val),
    }
  );
  const previousValueBeforeMute = useRef(value);

  function setVolume(value: number) {
    value = Math.min(100, Math.max(0, value));
    setValue(value);
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

  const toggleMute = useCallback(
    function toggleMute() {
      setVolume(value === 0 ? previousValueBeforeMute.current : 0);
      previousValueBeforeMute.current = value;
    },
    [value, previousValueBeforeMute]
  );
  const deferredValue = useDeferredValue(value);
  useEffect(() => {
    let unregisterMuteShortcut = registerKeyboardShortcut(
      MUTE_SHORTCUT,
      toggleMute
    );
    let unregisterVolumeUpShortcut = registerKeyboardShortcut(
      VOLUME_UP_SHORTCUT,
      () => {
        setVolume(value + 5);
      }
    );
    let unregisterVolumeDownShortcut = registerKeyboardShortcut(
      VOLUME_DOWN_SHORTCUT,
      () => {
        setVolume(value - 5);
      }
    );

    return () => {
      unregisterMuteShortcut.then((fn) => fn());
      unregisterVolumeUpShortcut.then((fn) => fn());
      unregisterVolumeDownShortcut.then((fn) => fn());
    };
  }, [deferredValue]);

  useEffect(() => {
    setVolume(value);
  }, []);

  return (
    <fieldset className="relative z-10 select-none text-primary-800">
      <label
        htmlFor="volume"
        className="block text-sm font-semibold leading-tight text-primary-900 whitespace-nowrap dark:text-white"
      >
        Volume ({value}%)
      </label>
      <span className="mb-3 text-xs text-primary-900/70">
        Volume is relative to the system volume.
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setVolume(value - 5);
          }}
          className="flex items-center w-auto h-6 gap-1 p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          <Minus weight="bold" />
          <Shortcut
            className="pl-1 border-l border-primary-900/20"
            keys={[
              PLATFORM === "darwin" ? Keys.MAC_COMMAND : Keys.CONTROL,
              Keys.SHIFT,
              Keys.ARROW_DOWN,
            ]}
          />
        </button>
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
        <button
          onClick={() => {
            setVolume(value + 5);
          }}
          className="flex items-center w-auto h-6 gap-1 p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          <Plus weight="bold" />
          <Shortcut
            className="pl-1 border-l border-primary-900/20"
            keys={[
              PLATFORM === "darwin" ? Keys.MAC_COMMAND : Keys.CONTROL,
              Keys.SHIFT,
              Keys.ARROW_UP,
            ]}
          />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={toggleMute}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
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
            keys={[
              PLATFORM === "darwin" ? Keys.MAC_COMMAND : Keys.CONTROL,
              Keys.SHIFT,
              "M",
            ]}
          />
        </button>
        <button
          onClick={() => {
            setVolume(25);
          }}
          className="p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          25%
        </button>
        <button
          onClick={() => {
            setVolume(50);
          }}
          className="p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          50%
        </button>
        <button
          onClick={() => {
            setVolume(75);
          }}
          className="p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          75%
        </button>
        <button
          onClick={() => {
            setVolume(100);
          }}
          className="p-1 rounded-lg bg-primary-900/10 text-primary-900 hover:bg-primary-900/20"
        >
          100%
        </button>
      </div>
    </fieldset>
  );
};

export default VolumeSlider;
