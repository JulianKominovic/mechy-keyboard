import { SOUNDPACKS_DIR } from "../init";
import { fs, invoke } from "@tauri-apps/api";

export function changeSoundpack(id: string) {
  return invoke("choose_soundpack", {
    soundpackId: id,
    soundpackFolder: SOUNDPACKS_DIR,
  });
}

export function setVolumeLevel(volume: number) {
  return invoke("set_volume_level", { volume });
}

export async function getSoundpacksInstalled(): Promise<string[]> {
  const soundpacks = await fs.readDir(SOUNDPACKS_DIR);
  return (
    (soundpacks.map((e) => e.name).filter(Boolean) as string[] | undefined) ||
    []
  );
}

export function deleteSoundpacks() {
  return fs.removeDir(SOUNDPACKS_DIR, { recursive: true });
}
