import { fs } from "@tauri-apps/api";
import { APP_CACHE_DIR } from "../init";

export function deleteCacheFolder() {
  return fs.removeDir(APP_CACHE_DIR, { recursive: true });
}
