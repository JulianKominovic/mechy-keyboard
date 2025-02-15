import { Command, Database, Lightning, MusicNote } from "@phosphor-icons/react";
import { useContext } from "react";
import Button from "../../components/button";
import { Context } from "../../context";
import useShortcutsStore from "../../stores/shortcuts";

const ActionsPage = () => {
  const { clearCache, clearSoundpacks } = useContext(Context);
  const clearAllShortcuts = useShortcutsStore((s) => s.resetShortcuts);
  return (
    <>
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary-900">
        <Lightning
          weight="duotone"
          fill="currentColor"
          size={24}
          className="text-primary-900"
        />
        Actions
      </h2>
      <ul className="mb-16 ">
        <li>
          <Button
            variant="destructive"
            onClick={clearCache}
            className={"text-sm mb-1"}
          >
            <Database className="w-4 h-4" weight="duotone" size={18} />
            <span className="">Clear cache and soundpacks</span>
          </Button>
        </li>
        <li>
          <Button
            variant="destructive"
            onClick={clearSoundpacks}
            className={"text-sm mb-1"}
          >
            <MusicNote className="w-4 h-4" weight="duotone" size={18} />
            <span className="">Clear soundpacks</span>
          </Button>
        </li>
        <li>
          <Button
            variant="destructive"
            onClick={clearAllShortcuts}
            className={"text-sm mb-1"}
          >
            <Command className="w-4 h-4" weight="duotone" size={18} />
            <span className="">Reset shortcuts</span>
          </Button>
        </li>
      </ul>
    </>
  );
};

export default ActionsPage;
