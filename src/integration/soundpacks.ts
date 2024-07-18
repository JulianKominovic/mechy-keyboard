import { join } from "@tauri-apps/api/path";
import { chooseSoundpack } from "../bindings";
import { APP_CACHE_DIR, SOUNDPACKS_DIR } from "../init";
import { fs } from "@tauri-apps/api";
import { Err, Ok, Result } from "ts-results";
// enum DownloadSoundpackErrors {
//   DOWNLOAD_FAILED,
//   UNZIP_FAILED,
//   FOLDER_CREATION_FAILED,
//   FOLDER_ALREADY_EXISTS,
// }

// function humanizeError(error: DownloadSoundpackErrors) {
//   switch (error) {
//     case DownloadSoundpackErrors.DOWNLOAD_FAILED:
//       return "Failed to download soundpack. File may not exist or you may not have internet connection.";
//     case DownloadSoundpackErrors.UNZIP_FAILED:
//       return "Failed to unzip soundpack. File may be corrupted. Sorry!";
//     case DownloadSoundpackErrors.FOLDER_CREATION_FAILED:
//       return "Soundpack was downloaded but we failed to create a folder for it. Please try again.";
//     case DownloadSoundpackErrors.FOLDER_ALREADY_EXISTS:
//       return "Soundpack already exists. Maybe you already downloaded it?";
//   }
// }

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
