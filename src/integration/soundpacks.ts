import { join, appCacheDir } from "@tauri-apps/api/path";
import { chooseSoundpack } from "../bindings";
import { SOUNDPACKS_DIR } from "../const";

export async function changeSoundpack(id: string) {
  const path = await join(SOUNDPACKS_DIR, id);
  return await chooseSoundpack(path);
}
