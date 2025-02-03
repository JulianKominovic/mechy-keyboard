import { Database, MusicNote } from "@phosphor-icons/react";
import { useContext } from "react";
import cn from "../utils/cn";
import { Context } from "../context";

const Actions = () => {
  const { clearCache, clearSoundpacks } = useContext(Context);
  return (
    <>
      <button
        onClick={clearCache}
        className={cn(
          "flex flex-shrink-0 items-center text-left w-full h-8 gap-2 text-red-500 hover:bg-red-500/10 text-xs rounded-lg px-2 text-ellipsis truncate"
        )}
      >
        <Database className="w-4 h-4" weight="duotone" size={18} />
        <span className="">Clear cache and soundpacks</span>
      </button>
      <button
        onClick={clearSoundpacks}
        className={cn(
          "flex flex-shrink-0 items-center text-left w-full h-8 gap-2 text-red-500 hover:bg-red-500/10 text-xs rounded-lg px-2 text-ellipsis truncate"
        )}
      >
        <MusicNote className="w-4 h-4" weight="duotone" size={18} />
        <span className="">Clear soundpacks</span>
      </button>
    </>
  );
};

export default Actions;
