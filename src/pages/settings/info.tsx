import { Info } from "@phosphor-icons/react";
import {
  GITHUB_REPO,
  VERSION,
  APP_LOG_DIR,
  APP_CONFIG_DIR,
  APP_CACHE_DIR,
  SOUNDPACKS_DIR,
} from "../../init";

const folders = [
  {
    name: "App log folder",
    path: APP_LOG_DIR,
  },
  {
    name: "App config folder",
    path: APP_CONFIG_DIR,
  },
  {
    name: "App cache folder",
    path: APP_CACHE_DIR,
  },
  {
    name: "Soundpacks folders",
    path: SOUNDPACKS_DIR,
  },
];
const InfoPage = () => {
  return (
    <>
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary-900">
        <Info
          weight="duotone"
          fill="currentColor"
          size={24}
          className="text-primary-900"
        />
        Information
      </h2>
      <ul className="mb-16 text-sm">
        <li className="mb-2">
          <p className="font-medium">Version</p>
          <a
            href={GITHUB_REPO + "/releases/tag/" + VERSION}
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer underline-offset-2 text-black/60"
          >
            {VERSION}
          </a>
        </li>
        {folders.map((folder) => (
          <li className="mb-2" key={"info" + folder.name}>
            <p className="font-medium">{folder.name}</p>
            <button
              title={folder.name}
              onClick={() => {
                open("file://" + folder.path);
              }}
              className="text-left underline cursor-pointer underline-offset-2 text-black/60"
            >
              {folder.path}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfoPage;
