import { appCacheDir, appConfigDir, appLogDir } from "@tauri-apps/api/path";
import { createDir } from "@tauri-apps/api/fs";
import CherryLogo from "./assets/CherryLogo";
import EverglideLogo from "./assets/EverglideLogo";
import GloriousLogo from "./assets/GloriousLogo";
import IBMLogo from "./assets/IBMLogo";
import NovelKeysLogo from "./assets/NovelKeysLogo";
import TopreLogo from "./assets/TopreLogo";
import { join } from "@tauri-apps/api/path";

export const APP_CACHE_DIR = await appCacheDir();
export const APP_CONFIG_DIR = await appConfigDir();
export const APP_LOG_DIR = await appLogDir();
export const SOUNDPACKS_DIR = await join(APP_CACHE_DIR, "soundpacks");
await createDir(APP_CACHE_DIR).catch(() => {});
await createDir(APP_CONFIG_DIR).catch(() => {});
await createDir(SOUNDPACKS_DIR).catch(() => {});

console.log({
  APP_CACHE_DIR,
  APP_CONFIG_DIR,
  APP_LOG_DIR,
  SOUNDPACKS_DIR,
});

type KeyboardModel = {
  name: string;
  includesNumpad: boolean;
  imageSrc: string;
  id: string;
  vendor: {
    name: "Cherry" | "Everglide" | "NovelKeys" | "Glorious" | "IBM" | "Topre";
    logoSrc: React.ReactNode;
  };
  color: `#${string}`;
};

export const KEYBOARD_MODELS: KeyboardModel[] = [
  {
    name: "Black - ABS keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-black-abs",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#000",
  },
  {
    name: "Black - PBT keycaps",
    includesNumpad: false,
    imageSrc:
      "https://mechanicalkeyboards.com/cdn/shop/files/6296-S5MVU-One-3-Matcha.jpg?v=1707861551&width=750",
    id: "cherrymx-black-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#414141",
  },
  {
    name: "Blue - ABS keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-blue-abs",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#2b75ff",
  },
  {
    name: "Blue - PBT keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-blue-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#6fa1ff",
  },
  {
    name: "Brown - ABS keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-brown-abs",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#9e4607",
  },
  {
    name: "Brown - PBT keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-brown-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#a86e45",
  },
  {
    name: "Red - ABS keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-red-abs",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#e82828",
  },
  {
    name: "Red - PBT keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "cherrymx-red-pbt",
    vendor: {
      name: "Cherry",
      logoSrc: <CherryLogo />,
    },
    color: "#ff6b6b",
  },
  {
    name: "Creams",
    includesNumpad: false,
    imageSrc: "",
    id: "creams",
    vendor: {
      name: "NovelKeys",
      logoSrc: <NovelKeysLogo />,
    },
    color: "#ffddb6",
  },
  {
    name: "EG Crystal Purple",
    includesNumpad: false,
    imageSrc: "",
    id: "eg-crystal-purple",
    vendor: {
      name: "Everglide",
      logoSrc: <EverglideLogo />,
    },
    color: "#b39bd2",
  },
  {
    name: "EG Oreo",
    includesNumpad: false,
    imageSrc: "",
    id: "eg-oreo",
    vendor: {
      name: "Everglide",
      logoSrc: <EverglideLogo />,
    },
    color: "#3e3830",
  },
  {
    name: "Glorious panda",
    includesNumpad: false,
    imageSrc: "",
    id: "glorious-panda",
    vendor: {
      name: "Glorious",
      logoSrc: <GloriousLogo />,
    },
    color: "#f2a83e",
  },
  {
    name: "Model_F_XT",
    includesNumpad: false,
    imageSrc: "",
    id: "model-fxt",
    vendor: {
      name: "IBM",
      logoSrc: <IBMLogo />,
    },
    color: "#adadad",
  },
  {
    name: "Topre Purple Hybrid - PBT keycaps",
    includesNumpad: false,
    imageSrc: "",
    id: "topre-purple-hybrid-pbt",
    vendor: {
      name: "Topre",
      logoSrc: <TopreLogo />,
    },
    color: "#4439c4",
  },
];
