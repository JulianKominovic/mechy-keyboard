import { useContext } from "react";
import Separator from "../components/separator";
import { KEYBOARD_MODELS } from "../init";
import cn from "../utils/cn";
import { Context } from "../context";
import Button from "../components/button";

function KeyboardItems({
  soundpack,
  isInstalled,
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
  isInstalled: boolean;
  soundpack: (typeof KEYBOARD_MODELS)[0];
}) {
  return (
    <Button
      variant="ghost"
      size={"sm"}
      onClick={onClick}
      key={soundpack.id + soundpack.name}
      aria-selected={isSelected}
      className={cn(
        "mb-1 px-3 w-full",
        isInstalled ? "opacity-100" : "opacity-35 hover:opacity-100"
      )}
    >
      <div
        style={{
          backgroundColor: soundpack.color,
        }}
        className="rounded-[50%] w-2 h-2 flex-shrink-0"
      ></div>
      <span className="font-bold">{soundpack.vendor.name} •</span>

      <span className="truncate">{soundpack.name}</span>
    </Button>
  );
}

const KeyboardSelector = () => {
  const {
    alreadyInstalled,
    currentSoundpack,
    handleChangeSoundpackClick,
    notInstalled,
  } = useContext(Context);
  const selectedSoundpackId = currentSoundpack?.id;
  return (
    <div className="flex-grow">
      {alreadyInstalled.length > 0 && (
        <Separator className="mb-2">
          Installed ({alreadyInstalled.length})
        </Separator>
      )}
      {alreadyInstalled.map((soundpack) => {
        const isSelected = selectedSoundpackId === soundpack.id;
        const isInstalled = true;
        return (
          <KeyboardItems
            soundpack={soundpack}
            isSelected={isSelected}
            isInstalled={isInstalled}
            onClick={handleChangeSoundpackClick(soundpack)}
          />
        );
      })}
      <Separator className="mt-4 mb-2">
        Available ({notInstalled.length})
      </Separator>

      {notInstalled.map((soundpack) => {
        const isSelected = selectedSoundpackId === soundpack.id;
        const isInstalled = false;
        return (
          <KeyboardItems
            soundpack={soundpack}
            isSelected={isSelected}
            isInstalled={isInstalled}
            onClick={handleChangeSoundpackClick(soundpack)}
          />
        );
      })}
    </div>
  );
};

export default KeyboardSelector;
