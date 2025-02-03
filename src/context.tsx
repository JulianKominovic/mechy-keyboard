import { trace, error } from "tauri-plugin-log-api";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import useLocalStorage from "use-local-storage";
import {
  SOUNDPACKS_INSTALLED,
  LOCAL_STORAGE_SOUNDPACK_KEY,
  KEYBOARD_MODELS,
} from "./init";
import { changeSoundpack, deleteSoundpacks } from "./integration/soundpacks";
import { deleteCacheFolder } from "./integration/general";

type ContextType = {
  currentSoundpack: (typeof KEYBOARD_MODELS)[0] | undefined;
  alreadyInstalled: typeof KEYBOARD_MODELS;
  notInstalled: typeof KEYBOARD_MODELS;
  handleChangeSoundpackClick: (
    soundpack: (typeof KEYBOARD_MODELS)[0]
  ) => () => void;
  clearSoundpacks: () => void;
  clearCache: () => void;
};
export const Context = createContext<ContextType>({
  currentSoundpack: undefined,
  alreadyInstalled: [],
  notInstalled: [],
  handleChangeSoundpackClick: () => () => {},
  clearSoundpacks: () => {},
  clearCache: () => {},
});
const ContextProvider = ({ children }: any) => {
  const [installedSoundpacksIds, setInstalledSoundpacksIds] = useState(
    new Set(SOUNDPACKS_INSTALLED)
  );
  const [selectedSoundpackId, setSelectedSoundpackId] = useLocalStorage<
    string | undefined
  >(LOCAL_STORAGE_SOUNDPACK_KEY, undefined);

  const currentSoundpack = KEYBOARD_MODELS.find(
    (keyboard) => keyboard.id === selectedSoundpackId
  );

  const alreadyInstalled = KEYBOARD_MODELS.filter((model) =>
    installedSoundpacksIds.has(model.id)
  );
  const notInstalled = KEYBOARD_MODELS.filter(
    (model) => !installedSoundpacksIds.has(model.id)
  );

  const handleChangeSoundpackClick = (
    soundpack: (typeof KEYBOARD_MODELS)[0]
  ) => {
    return () => {
      if (selectedSoundpackId === soundpack.id) return;
      const id = toast.loading(`Switching to ${soundpack.name}`, {
        important: true,
        id: soundpack.id + "loading",
      });
      changeSoundpack(soundpack.id)
        .then(() => {
          toast.success(`Now using ${soundpack.name}`, { duration: 2000 });
          setSelectedSoundpackId(soundpack.id);
          setInstalledSoundpacksIds((prev) => prev.add(soundpack.id));
          trace(`Switched to ${soundpack.name}`);
        })
        .catch((err) => {
          toast.error(`Failed to switch to ${soundpack.name}`, {
            description: err,
            duration: 5000,
          });
          error(err);
        })
        .finally(() => {
          toast.dismiss(id);
        });
    };
  };

  useEffect(() => {
    if (selectedSoundpackId) {
      const id = toast.loading("Starting up", {
        description: "Please wait while we load your soundpack",
      });

      changeSoundpack(selectedSoundpackId)
        .then(() => {
          setSelectedSoundpackId(selectedSoundpackId);
          setInstalledSoundpacksIds((prev) => prev.add(selectedSoundpackId));
        })
        .catch(error)
        .finally(() => toast.dismiss(id));
    }
  }, []);

  function clearSoundpacks() {
    setInstalledSoundpacksIds(new Set());
    setSelectedSoundpackId(undefined);
    toast.promise(deleteSoundpacks(), {
      error: "Failed to delete soundpacks",
      loading: "Deleting soundpacks",
      success: "Soundpacks deleted",
    });
  }
  function clearCache() {
    setInstalledSoundpacksIds(new Set());
    setSelectedSoundpackId(undefined);
    toast.promise(deleteCacheFolder(), {
      error: "Failed to delete cache and soundpacks",
      loading: "Deleting cache and soundpacks",
      success: "Cache and soundpacks deleted",
    });
  }
  return (
    <Context.Provider
      value={{
        currentSoundpack,
        alreadyInstalled,
        notInstalled,
        handleChangeSoundpackClick,
        clearSoundpacks,
        clearCache,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
