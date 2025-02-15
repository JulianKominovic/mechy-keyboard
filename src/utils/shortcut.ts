import {
  register,
  unregister,
  unregisterAll,
} from "@tauri-apps/api/globalShortcut";
import { toast } from "sonner";
import { error, trace } from "tauri-plugin-log-api";
export async function unregisterKeyboardShortcut(shortcut: string) {
  trace("Unregistering shortcut: " + shortcut);
  await unregister(shortcut).catch((err) => {
    toast.warning("Error unregistering shortcut", {
      duration: 5000,
      description: err,
    });
    error("Failed to unregister shortcut" + err);
  });
}
export async function clearKeyboardShortcuts() {
  trace("Clearing all shortcuts");
  await unregisterAll().catch((err) => {
    toast.warning("Error clearing shortcuts", {
      duration: 5000,
      description: err,
    });
    error("Failed to clear shortcuts" + err);
  });
}
export async function registerKeyboardShortcut(
  shortcut: string,
  callback: () => void
) {
  trace("Registering shortcut: " + shortcut);
  await unregister(shortcut)
    .then(() => {
      register(shortcut, callback).catch((err) => {
        toast.warning("Error registering shortcut", {
          duration: 5000,
          description: err,
        });
        error("Failed to register shortcut" + err);
      });
    })
    .catch((err) => {
      toast.warning("Error unregistering shortcut", {
        duration: 5000,
        description: err,
      });
      error("Failed to unregister shortcut" + err);
    });

  return () =>
    unregister(shortcut).catch((err) => {
      toast.warning("Error unregistering shortcut", {
        duration: 5000,
        description: err,
      });
      error("Failed to unregister shortcut" + err);
    });
}
