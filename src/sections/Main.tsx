import { useContext } from "react";
import { Context } from "../context";
import { StarFour } from "@phosphor-icons/react";
import Separator from "../components/separator";
import VolumeSlider from "../components/volume-slider";
import { GITHUB_REPO, VERSION } from "../init";
import LogoImage from "../assets/logo-transparent.png";

const Main = () => {
  const { currentSoundpack } = useContext(Context);

  return (
    <main className="relative w-full h-full px-2 py-2 col-[2/3] row-[1/3]">
      <div className="relative h-full px-8 py-8 pt-8 overflow-x-hidden overflow-y-auto rounded-lg shadow-lg border border-white/[0.05] bg-neutral-100 bg-gradient-to-tl from-[#d9ac92] to-[#dfb398]">
        <img
          className="absolute -right-32 z-10 -top-28 drop-shadow-[0px_6px_100px_#ff88008e] shadow-primary-950 select-none"
          src={LogoImage}
          alt=""
        />
        <header className="cursor-default select-none">
          <a
            target="_blank"
            href={GITHUB_REPO + "/releases/tag/" + VERSION}
            className="relative z-10 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded-full bg-primary-900 group text-primary-200 hover:bg-primary-900/80 transition-colors"
          >
            <StarFour className="inline-block" weight="fill" /> Version{" "}
            {VERSION} is here!
          </a>
          <p className="relative z-0 font-extrabold drop-shadow-sm text-primary-900 text-7xl">
            Mechy
          </p>
          <p className="relative z-20 font-extrabold drop-shadow-sm text-primary-900 text-7xl">
            Keyboard
          </p>

          <p className="mt-1 max-w-[26ch] text-primary-900 font-medium">
            Give your keyboard a voice.
          </p>
        </header>
        <Separator className="mb-8 mt-12 after:bg-primary-900/20 after:h-[2px]"></Separator>
        <VolumeSlider />
        <Separator className="my-8 after:bg-primary-900/20 after:h-[2px]"></Separator>
        {currentSoundpack && (
          <footer className="mt-10 text-primary-900">
            <div className="flex flex-wrap items-center gap-1 text-lg">
              Using{" "}
              <div className="inline-flex items-center h-6 gap-1 p-1 overflow-hidden text-base rounded-md bg-primary-300">
                <span
                  className="inline-block w-3 h-3 rounded-[4px]"
                  style={{
                    backgroundColor: currentSoundpack.color,
                  }}
                ></span>
                <b className="whitespace-pre">{currentSoundpack.name}</b>
              </div>
              by{" "}
              <div className="inline-flex items-center h-6 gap-1 p-1 overflow-hidden text-base rounded-md bg-primary-300">
                {
                  <currentSoundpack.vendor.logoSrc className="object-scale-down w-auto h-full rounded-[4px] max-w-7" />
                }
                <b className="">
                  {currentSoundpack.vendor.name}
                  {"™"}
                </b>
              </div>
            </div>
            <p className="mt-1 text-sm">
              Thanks to <b>{currentSoundpack.author}</b> for this soundpack!
            </p>
          </footer>
        )}
      </div>
    </main>
  );
};

export default Main;
