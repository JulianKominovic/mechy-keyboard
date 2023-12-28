import { useRef, useState } from "react";
import { greet, chooseSoundpack } from "./bindings";

/*
cherrymx-black-abs  cherrymx-brown-pbt  eg-oreo
cherrymx-black-pbt  cherrymx-red-abs    glorious-panda
cherrymx-blue-abs   cherrymx-red-pbt    model-fxt
cherrymx-blue-pbt   creams              topre-purple-hybrid-pbt
cherrymx-brown-abs  eg-crystal-purple   unicompclassic

*/

import { appDataDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { readDir, readTextFile } from "@tauri-apps/api/fs";

const appDataDirPath = await appDataDir();
const soundpackPath = await join(appDataDirPath, "soundpacks");
const soundpackFolders = await readDir(soundpackPath);
const SOUND_PACKS = await Promise.allSettled(
  soundpackFolders.map(async (folder) => {
    const config = JSON.parse(
      await readTextFile(await join(folder.path, "config.json"))
    );
    const name = config.name;
    return {
      name,
      id: folder.name,
      folderPath: folder.path,
    };
  })
);

function setSoundpack(folderPath: string) {
  return chooseSoundpack(folderPath);
}

function joinClassNames(...classNames: any[]) {
  return classNames.filter((e) => e).join(" ");
}

function App() {
  const parsedSoundpacks = SOUND_PACKS.filter(
    (s) => s.status !== "rejected"
  ).sort((a: any, b: any) => (a.value.id as string).localeCompare(b.value.id));
  const [selectedSoundpack, setSelectedSoundpack] = useState<string>(
    (parsedSoundpacks as any)[0].value.folderPath
  );
  return (
    <div className="w-full max-w-lg px-4 mx-auto">
      <header className="w-full">
        <img
          src="https://images-platform.99static.com/n9S7iOvT0hCDS0aZi2Wxz1v8fVI=/201x201:1812x1812/500x500/top/smart/99designs-contests-attachments/99/99416/attachment_99416788"
          alt="Just for now..."
          className="object-none w-64 h-64 mx-auto"
        />
        <h1 className="text-3xl mx-auto max-w-[20ch] text-center text-balance font-semibold">
          The cheapest mechanical keyboard
        </h1>
      </header>

      <textarea
        className="w-full p-4 mt-4 border rounded-md border-neutral-200"
        name="try"
        id="try"
        placeholder="Write some text!"
      ></textarea>

      <main className="flex flex-col gap-4 mt-4 mb-16">
        {parsedSoundpacks.map((soundpack) => {
          if (soundpack.status === "rejected") return null;
          const isSelected = selectedSoundpack === soundpack.value.folderPath;
          return (
            <button
              key={soundpack.value.id}
              onClick={() => {
                setSoundpack(soundpack.value.folderPath).finally(() => {
                  setSelectedSoundpack(soundpack.value.folderPath);
                });
              }}
              className={joinClassNames(
                "flex items-center w-full h-10 gap-4",
                isSelected ? "opacity-100" : "opacity-45 hover:opacity-100"
              )}
            >
              <span
                className={joinClassNames(
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
              </span>
              {soundpack.value.name}
            </button>
          );
        })}
      </main>
    </div>
  );
}

export default App;
