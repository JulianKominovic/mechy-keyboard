import { chooseSoundpack } from "../bindings";
import { SOUNDPACKS_DIR } from "../init";
import { fs } from "@tauri-apps/api";

export async function changeSoundpack(id: string) {
  return await chooseSoundpack(id, SOUNDPACKS_DIR);
}

export async function getSoundpacksInstalled(): Promise<string[]> {
  const soundpacks = await fs.readDir(SOUNDPACKS_DIR);
  return (
    (soundpacks.map((e) => e.name).filter(Boolean) as string[] | undefined) ||
    []
  );
}
