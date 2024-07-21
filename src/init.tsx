import { appCacheDir, appConfigDir, appLogDir } from "@tauri-apps/api/path";
import { createDir } from "@tauri-apps/api/fs";
import CherryLogo from "./assets/CherryLogo";
import EverglideLogo from "./assets/EverglideLogo";
import GloriousLogo from "./assets/GloriousLogo";
import IBMLogo from "./assets/IBMLogo";
import NovelKeysLogo from "./assets/NovelKeysLogo";
import TopreLogo from "./assets/TopreLogo";
import { join } from "@tauri-apps/api/path";
import { platform } from "@tauri-apps/api/os";
import { info, warn } from "tauri-plugin-log-api";
import { getSoundpacksInstalled } from "./integration/soundpacks";
import { version, homepage, repository } from "../package.json";
import { GithubLogo, TwitterLogo } from "@phosphor-icons/react";
import UnicompLogo from "./assets/UnicompLogo";

export const SOCIAL = [
  {
    icon: <GithubLogo weight="fill" size={18} />,
    url: "https://github.com/JulianKominovic/mechy-keyboard",
  },
  {
    icon: <TwitterLogo weight="fill" size={18} />,
    url: "https://twitter.com/juliankominovic",
  },
];
export const MUTE_SHORTCUT = "CommandOrControl+Shift+M";
export const VOLUME_UP_SHORTCUT = "CommandOrControl+Shift+ArrowUp";
export const VOLUME_DOWN_SHORTCUT = "CommandOrControl+Shift+ArrowDown";
export const PLATFORM = await platform();
export const VERSION = version;
export const GITHUB_REPO = repository;
export const HOMEPAGE = homepage;
export const APP_CACHE_DIR = await appCacheDir();
export const APP_CONFIG_DIR = await appConfigDir();
export const APP_LOG_DIR = await appLogDir();
export const SOUNDPACKS_DIR = await join(APP_CACHE_DIR, "soundpacks");
await createDir(APP_CACHE_DIR, { recursive: true }).catch(() =>
  warn("Failed to create cache dir")
);
await createDir(APP_CONFIG_DIR, { recursive: true }).catch(() =>
  warn("Failed to create config dir")
);
await createDir(SOUNDPACKS_DIR, { recursive: true }).catch((err) =>
  warn("Failed to create soundpacks dir " + err)
);
export const SOUNDPACKS_INSTALLED = await getSoundpacksInstalled();
export const LOCAL_STORAGE_SOUNDPACK_KEY = "selected-soundpack";
export const LOCAL_STORAGE_VOLUME_KEY = "volume";

info(`App cache dir: ${APP_CACHE_DIR}`);
info(`App config dir: ${APP_CONFIG_DIR}`);
info(`App log dir: ${APP_LOG_DIR}`);
info(`Soundpacks dir: ${SOUNDPACKS_DIR}`);

type KeyboardModel = {
  name: string;
  id: string;
  imageSrc: string;
  vendor: {
    name:
      | "Cherry"
      | "Everglide"
      | "NovelKeys"
      | "Glorious"
      | "IBM"
      | "Topre"
      | "Unicomp";
    logoSrc:
      | typeof CherryLogo
      | typeof EverglideLogo
      | typeof NovelKeysLogo
      | typeof GloriousLogo
      | typeof IBMLogo
      | typeof TopreLogo
      | typeof UnicompLogo;
  };
  color: `#${string}`;
  author: "Mechvibes" | (string & {});
};

export const KEYBOARD_MODELS: KeyboardModel[] = [
  {
    name: "Black - ABS keycaps",
    imageSrc: "",
    id: "cherrymx-black-abs",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#000",
    author: "Mechvibes",
  },

  {
    name: "Black - PBT keycaps",
    imageSrc:
      "https://mechanicalkeyboards.com/cdn/shop/files/6296-S5MVU-One-3-Matcha.jpg?v=1707861551&width=750",
    id: "cherrymx-black-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#414141",
    author: "Mechvibes",
  },
  {
    name: "Blue - ABS keycaps",
    imageSrc: "",
    id: "cherrymx-blue-abs",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#2b75ff",
    author: "Mechvibes",
  },
  {
    name: "Blue - PBT keycaps",
    imageSrc: "",
    id: "cherrymx-blue-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#6fa1ff",
    author: "Mechvibes",
  },
  {
    name: "Brown - ABS keycaps",
    imageSrc: "",
    id: "cherrymx-brown-abs",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#9e4607",
    author: "Mechvibes",
  },
  {
    name: "Brown - PBT keycaps",
    imageSrc: "",
    id: "cherrymx-brown-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#a86e45",
    author: "Mechvibes",
  },
  {
    name: "Red - ABS keycaps",
    imageSrc: "",
    id: "cherrymx-red-abs",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#e82828",
    author: "Mechvibes",
  },
  {
    name: "Red - PBT keycaps",
    imageSrc: "",
    id: "cherrymx-red-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: CherryLogo,
    },
    color: "#ff6b6b",
    author: "Mechvibes",
  },
  {
    name: "Creams",
    imageSrc: "",
    id: "creams",
    vendor: {
      name: "NovelKeys",
      logoSrc: NovelKeysLogo,
    },
    color: "#ffddb6",
    author: "Aksh Aggarwal",
  },
  {
    name: "EG Crystal Purple",
    imageSrc: "",
    id: "eg-crystal-purple",
    vendor: {
      name: "Everglide",
      logoSrc: EverglideLogo,
    },
    color: "#b39bd2",
    author: "Mechvibes",
  },
  {
    name: "EG Oreo",
    imageSrc: "",
    id: "eg-oreo",
    vendor: {
      name: "Everglide",
      logoSrc: EverglideLogo,
    },
    color: "#3e3830",
    author: "Mechvibes",
  },
  {
    name: "Glorious panda",
    imageSrc: "",
    id: "glorious-panda",
    vendor: {
      name: "Glorious",
      logoSrc: GloriousLogo,
    },
    color: "#f2a83e",
    author: "prpetar17",
  },
  {
    name: "Model_F_XT",
    imageSrc: "",
    id: "model-fxt",
    vendor: {
      name: "IBM",
      logoSrc: IBMLogo,
    },
    color: "#adadad",
    author: "Rezenee",
  },
  {
    name: "Purple Hybrid - PBT",
    imageSrc: "",
    id: "topre-purple-hybrid-pbt",
    vendor: {
      name: "Topre",
      logoSrc: TopreLogo,
    },
    color: "#4439c4",
    author: "Mechvibes",
  },
  {
    name: "Classic",
    imageSrc: "",
    id: "unicompclassic",
    vendor: {
      name: "Unicomp",
      logoSrc: UnicompLogo,
    },
    color: "#8d9473",
    author: "Thànhh the Xignature",
  },
];
