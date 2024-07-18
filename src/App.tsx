import { Toaster, toast } from "sonner";
import { StarFour } from "@phosphor-icons/react";
import {
  DEFAULT_SOUNDPACK,
  GITHUB_REPO,
  KEYBOARD_MODELS,
  LOCAL_STORAGE_SOUNDPACK_KEY,
  SOUNDPACKS_INSTALLED,
  VERSION,
} from "./init";
import { changeSoundpack } from "./integration/soundpacks";
import LogoImage from "./assets/logo-transparent.png";
import useLocalStorage from "use-local-storage";
import { error, trace } from "tauri-plugin-log-api";
import Separator from "./components/separator";
import { useEffect, useState } from "react";

function cn(...classNames: any[]) {
  return classNames.filter((e) => e).join(" ");
}

function KeyboardItems({
  soundpack,
  isInstalled,
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
  isInstalled: boolean;
  soundpack: (typeof KEYBOARD_MODELS)[0];
}) {
  return (
    <button
      onClick={onClick}
      key={soundpack.id}
      className={cn(
        "flex items-center text-left w-full h-8 gap-2 text-black/60 hover:bg-black/10 text-xs rounded-lg px-2 text-ellipsis truncate",
        isInstalled ? "opacity-100" : "opacity-35 hover:opacity-100",
        isSelected ? "bg-black/[0.05]" : ""
      )}
    >
      <div
        style={{
          backgroundColor: soundpack.color,
        }}
        className="rounded-[50%] w-2 h-2 flex-shrink-0"
      ></div>
      <span className="font-bold">{soundpack.vendor.name} •</span>

      <span className="truncate">{soundpack.name}</span>
    </button>
  );
}

function App() {
  const [installedSoundpacksIds, setInstalledSoundpacksIds] = useState(
    new Set(SOUNDPACKS_INSTALLED)
  );
  const [selectedSoundpackId, setSelectedSoundpackId] = useLocalStorage(
    LOCAL_STORAGE_SOUNDPACK_KEY,
    DEFAULT_SOUNDPACK
  );

  const alreadyInstalled = KEYBOARD_MODELS.filter((model) =>
    installedSoundpacksIds.has(model.id)
  );
  const notInstalled = KEYBOARD_MODELS.filter(
    (model) => !installedSoundpacksIds.has(model.id)
  );

  const onClick = (soundpack: (typeof KEYBOARD_MODELS)[0]) => {
    return () => {
      if (selectedSoundpackId === soundpack.id) return;
      const id = toast.loading(`Switching to ${soundpack.name}`, {
        important: true,
        id: soundpack.id + "loading",
      });
      changeSoundpack(soundpack.id)
        .then(() => {
          toast.success(`Now using ${soundpack.name}`);
          setSelectedSoundpackId(soundpack.id);
          setInstalledSoundpacksIds((prev) => prev.add(soundpack.id));
          trace(`Switched to ${soundpack.name}`);
        })
        .catch((err) => {
          toast.error(`Failed to switch to ${soundpack.name}`, {
            description: err,
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
        .catch((err) => {
          error(err);
        })
        .finally(() => toast.dismiss(id));
    }
  }, []);

  return (
    <>
      <nav
        data-tauri-drag-region
        className="fixed flex items-center top-0 left-0 w-full h-[48px] z-50 "
      ></nav>
      <div
        className="w-full grid grid-rows-1 h-[100dvh] overflow-hidden transition-all ease-in-out duration-300"
        style={{
          gridTemplateColumns: true ? "280px 1fr" : "0px 1fr",
        }}
      >
        <aside
          className={cn(
            "flex flex-col h-full pt-12 pl-4 pr-2 w-full transition-opacity duration-200"
            // {
            //   "opacity-0": !sidebarOpen,
            //   "opacity-100": sidebarOpen,
            // }
          )}
        >
          <div className="flex-grow">
            <Separator className="mb-2">
              Installed ({alreadyInstalled.length})
            </Separator>
            {alreadyInstalled.map((soundpack) => {
              const isSelected = selectedSoundpackId === soundpack.id;
              const isInstalled = true;
              return (
                <KeyboardItems
                  soundpack={soundpack}
                  isSelected={isSelected}
                  isInstalled={isInstalled}
                  onClick={onClick(soundpack)}
                />
              );
            })}
            <Separator className="mt-4 mb-2">
              Available ({notInstalled.length})
            </Separator>

            {notInstalled.map((soundpack) => {
              const isSelected = selectedSoundpackId === soundpack.id;
              const isInstalled = false;
              return (
                <KeyboardItems
                  soundpack={soundpack}
                  isSelected={isSelected}
                  isInstalled={isInstalled}
                  onClick={onClick(soundpack)}
                />
              );
            })}
          </div>
          <footer className="flex flex-shrink-0 gap-2"></footer>
        </aside>

        <main className="relative w-full h-full px-2 py-2 overflow-x-hidden overflow-y-visible">
          <img
            className="absolute -right-32 -top-28 drop-shadow-[5px_6px_4px_rgb(88,51,35)] shadow-primary-950"
            src={LogoImage}
            alt=""
          />

          <div className="h-full px-8 py-8 pt-12 overflow-x-hidden overflow-y-auto rounded-lg shadow-lg bg-neutral-100 bg-gradient-to-tl from-[#d9ac92] to-[#dfb398]">
            <header className="cursor-default select-none">
              <a
                target="_blank"
                href={GITHUB_REPO + "/releases/tag/" + VERSION}
                className="relative z-10 inline-flex items-center gap-1 px-1.5 py-0.5 text-xs rounded-full bg-primary-900 group text-primary-200"
              >
                <StarFour className="inline-block" weight="fill" /> Version{" "}
                {VERSION} is here!
              </a>
              <h1 className="relative font-extrabold drop-shadow-sm text-primary-900 text-7xl">
                Mechy <br /> Keyboard
              </h1>
              <p className="max-w-[26ch] text-primary-900 font-medium">
                Give your keyboard a voice. Simulate the sounds of typing on a
                mechanical keyboard.
              </p>
            </header>
          </div>
          <footer></footer>
        </main>
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-primary-900 text-primary-200 [&__*.sonner-loading-bar]:bg-primary-100",
          descriptionClassName: "text-primary-300",
        }}
      />
    </>
  );
}

export default App;
