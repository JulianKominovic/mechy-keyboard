import { Toaster, toast } from "sonner";

import { KEYBOARD_MODELS } from "./const";
import {
  changeSoundpack,
  getSoundpacksInstalled,
} from "./integration/soundpacks";
const installedSoundpacks = await getSoundpacksInstalled();

function cn(...classNames: any[]) {
  return classNames.filter((e) => e).join(" ");
}

function App() {
  return (
    <>
      <nav
        data-tauri-drag-region
        className="fixed flex items-center top-0 left-0 w-full h-[48px] z-50 "
      ></nav>
      <div
        className="w-full grid grid-rows-1 h-[100dvh] overflow-hidden transition-all ease-in-out duration-300"
        style={{
          gridTemplateColumns: true ? "240px 1fr" : "0px 1fr",
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
            {KEYBOARD_MODELS.sort((a, b) => {
              if (installedSoundpacks.includes(a.id)) return -1;
              if (installedSoundpacks.includes(b.id)) return 1;
              return 0;
            }).map((soundpack) => {
              const isSelected = false;
              const isInstalled = installedSoundpacks.includes(soundpack.id);
              return (
                <button
                  onClick={() => {
                    toast.promise(changeSoundpack(soundpack.id), {
                      important: true,
                      loading: `${
                        isInstalled ? "Switching" : "Downloading"
                      } to ${soundpack.name}...`,
                      success: `Now using ${soundpack.name}`,
                      error: `Failed to switch to ${soundpack.name}`,
                    });
                  }}
                  key={soundpack.id}
                  className={cn(
                    "flex items-center text-left w-full h-8 gap-2 text-black/60 hover:bg-black/10 text-xs rounded-lg px-2 text-ellipsis truncate",
                    isInstalled ? "opacity-100" : "opacity-35 hover:opacity-100"
                  )}
                >
                  <div
                    style={{
                      backgroundColor: soundpack.color,
                    }}
                    className="rounded-[50%] w-2 h-2 flex-shrink-0"
                  ></div>
                  <span className="font-bold">{soundpack.vendor.name} •</span>
                  {/* <span
                    className={cn(
                      "rounded-[50%] border p-1 ",
                      isSelected
                        ? "text-green-400 border-green-400 bg-green-100"
                        : "text-neutral-400 border-neutral-400 bg-neutral-100"
                    )}
                  >
                    {isSelected ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 icon-tabler icon-tabler-check"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 icon-tabler icon-tabler-x"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </span> */}
                  <span className="truncate">{soundpack.name}</span>
                </button>
              );
            })}
          </div>
          <footer className="flex flex-shrink-0 gap-2"></footer>
        </aside>

        <main className="w-full h-full px-2 py-2 overflow-y-auto">
          <div className="h-full px-8 py-8 pt-12 overflow-y-auto rounded-lg shadow-lg bg-neutral-100"></div>
        </main>
      </div>
      <Toaster />
    </>
  );
}

export default App;
