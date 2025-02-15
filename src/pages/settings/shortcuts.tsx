import { useState } from "react";
import Button from "../../components/button";
import Shortcut from "../../components/shortcut";
import useShortcutsStore from "../../stores/shortcuts";
import { tauriOrJsKeyToString } from "../../utils/keymaps";
import {
  Command,
  SpeakerHigh,
  SpeakerLow,
  SpeakerX,
} from "@phosphor-icons/react";

type ShortcutEditProps = {
  name: string;
  description?: string;
  shortcut: {
    internal: string[];
    visual: string[];
  };
  icon: JSX.Element;
  setShortcut: (internalKeys: string[], visualKeys: string[]) => void;
  onReset: () => void;
};

/**
 * Test cases
 * 1. Single keys should not be accepted
 * 2. Modifier keys should be at least one
 * 3. Escape key should cancel the editing
 */

function ShortcutEdit({
  name,
  shortcut,
  setShortcut,
  onReset,
  description,
  icon,
}: ShortcutEditProps) {
  /**
   * Important:
   *  For tauri:
   *    - Modifier keys should come from e.key
   *    - The rest should come from e.code
   *    - Normal letters should not contain the "Key" prefix
   *  For the UI:
   *    - Modifier keys should come from e.key and parsed by OS
   */
  const [visualKeys, setVisualKeys] = useState<string[]>([]);
  const [interalKeys, setInternalKeys] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  return (
    <>
      {icon}
      <div className="flex-grow">
        <p className="font-medium">{name}</p>
        {description && (
          <small className="block mb-2 text-black/60">{description}</small>
        )}
      </div>
      <hgroup className="flex items-center justify-between gap-2 p-1 overflow-hidden rounded-xl w-fit h-fit">
        <Button
          onBlur={() => {
            setVisualKeys([]);
            setInternalKeys([]);
            setEditing(false);
          }}
          onClick={(e) => {
            e.currentTarget.focus();
            setEditing(true);
            setVisualKeys([]);
            setInternalKeys([]);
          }}
          onKeyUp={(e) => {
            if (!editing) return;
            e.preventDefault();
            setVisualKeys((prev) => prev.filter((k) => k !== e.key));
            setInternalKeys((prev) =>
              prev.filter((k) => k !== e.code && k !== e.key)
            );
          }}
          onKeyDown={(e) => {
            if (!editing) return;
            e.preventDefault();
            if (e.key === "Escape") return e.currentTarget.blur();
            const newInteralKeys = [...interalKeys];
            const newVisualKeys = [...visualKeys];
            switch (e.key) {
              case "Meta":
                newInteralKeys.push("Command");
                newVisualKeys.push("Meta");
                break;
              case "Control":
              case "Shift":
              case "Alt":
                newInteralKeys.push(e.key);
                newVisualKeys.push(e.key);
                break;
              default:
                if (newInteralKeys.length < 1) return;
                if (e.code.startsWith("Key")) {
                  newInteralKeys.push(e.code.slice(3));
                } else {
                  newInteralKeys.push(e.code);
                }
                newVisualKeys.push(e.key);
                setShortcut(
                  [...new Set(newInteralKeys)],
                  [...new Set(newVisualKeys)]
                );
                e.currentTarget.blur();
                break;
            }
            setInternalKeys([...new Set(newInteralKeys)]);
            setVisualKeys([...new Set(newVisualKeys)]);
          }}
          variant={"secondary"}
          className="text-base"
        >
          <Shortcut
            keys={
              visualKeys.length > 0 && editing
                ? visualKeys.map(tauriOrJsKeyToString)
                : shortcut.visual.map(tauriOrJsKeyToString)
            }
          />
        </Button>
        <Button
          className="text-base"
          onClick={() => {
            setEditing(false);
            setInternalKeys([]);
            setVisualKeys([]);
            onReset();
          }}
          variant="destructive"
        >
          Reset
        </Button>
      </hgroup>
    </>
  );
}

const ShortcutsPage = () => {
  const { shortcuts, setShortcut, resetShortcut } = useShortcutsStore((s) => s);
  const items: ShortcutEditProps[] = [
    {
      name: "Volume Up",
      description: "Increase volume by 5%",
      shortcut: shortcuts.volumeUp,
      setShortcut: (keys, visualKeys) =>
        setShortcut("volumeUp", keys, visualKeys),
      onReset: () => resetShortcut("volumeUp"),
      icon: <SpeakerHigh weight="duotone" size={16} className="mt-0.5" />,
    },
    {
      name: "Volume Down",
      description: "Decrease volume by 5%",
      shortcut: shortcuts.volumeDown,
      setShortcut: (keys, visualKeys) =>
        setShortcut("volumeDown", keys, visualKeys),
      onReset: () => resetShortcut("volumeDown"),
      icon: <SpeakerLow weight="duotone" size={16} className="mt-0.5" />,
    },
    {
      name: "Mute",
      description: "Toggle mute",
      shortcut: shortcuts.mute,
      setShortcut: (keys, visualKeys) => setShortcut("mute", keys, visualKeys),
      onReset: () => resetShortcut("mute"),
      icon: <SpeakerX weight="duotone" size={16} className="mt-0.5" />,
    },
  ];
  return (
    <>
      <h2 className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary-900">
        <Command
          weight="duotone"
          fill="currentColor"
          size={24}
          className="text-primary-900"
        />
        Shortcuts
      </h2>
      <ul className="mb-16">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex justify-between gap-2 mb-2 text-sm"
          >
            <ShortcutEdit {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShortcutsPage;
