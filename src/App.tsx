import { Toaster, toast } from "sonner";
import { StarFour } from "@phosphor-icons/react";
import {
  APP_CACHE_DIR,
  APP_CONFIG_DIR,
  APP_LOG_DIR,
  DEFAULT_SOUNDPACK,
  GITHUB_REPO,
  KEYBOARD_MODELS,
  LOCAL_STORAGE_SOUNDPACK_KEY,
  SOCIAL,
  SOUNDPACKS_DIR,
  SOUNDPACKS_INSTALLED,
  VERSION,
} from "./init";
import { changeSoundpack } from "./integration/soundpacks";
import LogoImage from "./assets/logo-transparent.png";
import FaviconImage from "./assets/128x128.png";
import useLocalStorage from "use-local-storage";
import { error, trace } from "tauri-plugin-log-api";
import Separator from "./components/separator";
import { useEffect, useState } from "react";
import VolumeSlider from "./components/volume-slider";
import { open } from "@tauri-apps/api/shell";

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

  const currentSoundpack = KEYBOARD_MODELS.find(
    (keyboard) => keyboard.id === selectedSoundpackId
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
            "flex flex-col relative select-none h-full pt-12 pl-4 pr-2 w-full overflow-y-auto transition-opacity duration-200 pb-4"
            // {
            //   "opacity-0": !sidebarOpen,
            //   "opacity-100": sidebarOpen,
            // }
          )}
        >
          <div className="flex-grow">
            {alreadyInstalled.length > 0 && (
              <Separator className="mb-2">
                Installed ({alreadyInstalled.length})
              </Separator>
            )}
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
          <Separator className="mt-4 mb-2">Info</Separator>
          <footer className="text-xs text-neutral-500">
            <ul className="flex flex-col gap-1 mb-4">
              <li>
                <b>Version</b>:{" "}
                <a
                  href={GITHUB_REPO + "/releases/tag/" + VERSION}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline cursor-pointer underline-offset-2"
                >
                  {VERSION}
                </a>
              </li>
              <li className="flex overflow-x-hidden">
                <b className="flex-shrink-0">App log folder</b>:{" "}
                <button
                  title={APP_LOG_DIR}
                  onClick={() => {
                    open("file://" + APP_LOG_DIR);
                  }}
                  className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
                >
                  {APP_LOG_DIR}
                </button>
              </li>
              <li className="flex overflow-x-hidden">
                <b className="flex-shrink-0">App config folder</b>:{" "}
                <button
                  title={APP_CONFIG_DIR}
                  onClick={() => {
                    open("file://" + APP_CONFIG_DIR);
                  }}
                  className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
                >
                  {APP_CONFIG_DIR}
                </button>
              </li>
              <li className="flex overflow-x-hidden">
                <b className="flex-shrink-0">App cache folder</b>:{" "}
                <button
                  title={APP_CACHE_DIR}
                  onClick={() => {
                    open("file://" + APP_CACHE_DIR);
                  }}
                  className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
                >
                  {APP_CACHE_DIR}
                </button>
              </li>
              <li className="flex overflow-x-hidden">
                <b className="flex-shrink-0">Soundpacks folders</b>:{" "}
                <button
                  title={SOUNDPACKS_DIR}
                  onClick={() => {
                    open("file://" + SOUNDPACKS_DIR);
                  }}
                  className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
                >
                  {SOUNDPACKS_DIR}
                </button>
              </li>
            </ul>
            Created by{" "}
            <a
              href="https://twitter.com/juliankominovic"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer underline-offset-2"
            >
              @Julian Kominvovic
            </a>{" "}
            <div className="flex">
              {SOCIAL.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 gap-2 text-xs text-left truncate rounded-lg text-black/60 hover:bg-black/10 text-ellipsis"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </footer>
        </aside>

        <main className="relative w-full h-full px-2 py-2 overflow-hidden">
          <div className="relative h-full px-8 py-8 pt-12 overflow-x-hidden overflow-y-auto rounded-lg shadow-lg bg-neutral-100 bg-gradient-to-tl from-[#d9ac92] to-[#dfb398]">
            <img
              className="absolute -right-32 -top-28 drop-shadow-[5px_6px_4px_rgb(88,51,35)] shadow-primary-950 select-none"
              src={LogoImage}
              alt=""
            />
            <header className="cursor-default select-none">
              <a
                target="_blank"
                href={GITHUB_REPO + "/releases/tag/" + VERSION}
                className="relative z-10 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded-full bg-primary-900 group text-primary-200 hover:bg-primary-900/80 transition-colors"
              >
                <StarFour className="inline-block" weight="fill" /> Version{" "}
                {VERSION} is here!
              </a>
              <h1 className="relative font-extrabold drop-shadow-sm text-primary-900 text-7xl">
                Mechy <br /> Keyboard
              </h1>
              <p className="mt-1 max-w-[26ch] text-primary-900 font-medium">
                Give your keyboard a voice. Simulate the sounds of typing on a
                mechanical keyboard.
              </p>
            </header>
            <Separator className="my-8 after:bg-primary-900/20 after:h-[2px]"></Separator>
            <VolumeSlider />
            <Separator className="my-8 after:bg-primary-900/20 after:h-[2px]"></Separator>
            {currentSoundpack && (
              <footer className="mt-10 text-primary-900">
                <div className="flex flex-wrap items-center gap-1 text-lg">
                  Using{" "}
                  <div className="inline-flex items-center h-6 gap-1 p-1 overflow-hidden text-base rounded-md bg-primary-300">
                    <span
                      className="inline-block w-3 h-3 rounded-[4px]"
                      style={{
                        backgroundColor: currentSoundpack.color,
                      }}
                    ></span>
                    <b className="whitespace-pre">{currentSoundpack.name}</b>
                  </div>
                  by{" "}
                  <div className="inline-flex items-center h-6 gap-1 p-1 overflow-hidden text-base rounded-md bg-primary-300">
                    {
                      <currentSoundpack.vendor.logoSrc className="object-scale-down w-auto h-full rounded-[4px] max-w-7" />
                    }
                    <b className="">
                      {currentSoundpack.vendor.name}
                      {"™"}
                    </b>
                  </div>
                </div>
                <p className="text-sm">
                  Thanks to <b>{currentSoundpack.author}</b> for this soundpack!
                </p>
              </footer>
            )}
          </div>
        </main>
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-primary-900 text-primary-100 [&__*.sonner-loading-bar]:bg-primary-100",

          descriptionClassName: "text-primary-300",
        }}
      />
    </>
  );
}

export default App;
