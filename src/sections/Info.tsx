import {
  GITHUB_REPO,
  VERSION,
  APP_LOG_DIR,
  APP_CONFIG_DIR,
  APP_CACHE_DIR,
  SOUNDPACKS_DIR,
  SOCIAL,
} from "../init";

const Info = () => {
  return (
    <footer className="text-xs text-neutral-500">
      <ul className="flex flex-col gap-1 mb-4">
        <li>
          <b>Version</b>:{" "}
          <a
            href={GITHUB_REPO + "/releases/tag/" + VERSION}
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer underline-offset-2"
          >
            {VERSION}
          </a>
        </li>
        <li className="flex overflow-x-hidden">
          <b className="flex-shrink-0">App log folder</b>:{" "}
          <button
            title={APP_LOG_DIR}
            onClick={() => {
              open("file://" + APP_LOG_DIR);
            }}
            className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
          >
            {APP_LOG_DIR}
          </button>
        </li>
        <li className="flex overflow-x-hidden">
          <b className="flex-shrink-0">App config folder</b>:{" "}
          <button
            title={APP_CONFIG_DIR}
            onClick={() => {
              open("file://" + APP_CONFIG_DIR);
            }}
            className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
          >
            {APP_CONFIG_DIR}
          </button>
        </li>
        <li className="flex overflow-x-hidden">
          <b className="flex-shrink-0">App cache folder</b>:{" "}
          <button
            title={APP_CACHE_DIR}
            onClick={() => {
              open("file://" + APP_CACHE_DIR);
            }}
            className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
          >
            {APP_CACHE_DIR}
          </button>
        </li>
        <li className="flex overflow-x-hidden">
          <b className="flex-shrink-0">Soundpacks folders</b>:{" "}
          <button
            title={SOUNDPACKS_DIR}
            onClick={() => {
              open("file://" + SOUNDPACKS_DIR);
            }}
            className="w-full underline truncate cursor-pointer text-ellipsis underline-offset-2"
          >
            {SOUNDPACKS_DIR}
          </button>
        </li>
      </ul>
      Created by{" "}
      <a
        href="https://twitter.com/juliankominovic"
        target="_blank"
        rel="noopener noreferrer"
        className="underline cursor-pointer underline-offset-2"
      >
        @Julian Kominvovic
      </a>{" "}
      <div className="flex mt-1">
        {SOCIAL.map((social) => (
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 gap-2 text-xs text-left truncate rounded-lg text-black/60 hover:bg-black/10 text-ellipsis"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Info;
