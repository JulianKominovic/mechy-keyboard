import { Popover, PopoverContent, PopoverTrigger } from "../components/popover";
import { useState } from "react";
import cn from "../utils/cn";
import { open as openShell } from "@tauri-apps/api/shell";

const MacosWarning = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "px-2 py-1 text-xs hover:bg-black/[0.05] hover:text-black/50  text-black/20 rounded-md",
          open && "text-black/50 bg-black/[0.05]"
        )}
      >
        App is not working?
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-4 border shadow-xl rounded-xl text-black/50"
        style={
          {
            "--bg": "#eaeaea",
          } as any
        }
      >
        Please follow these instructions.
        <ol className="mt-2 list-decimal list-inside">
          <li>
            <button
              className="underline cursor-pointer focus:border-none focus:outline-none underline-offset-2"
              onClick={() => {
                openShell(
                  "x-apple.systempreferences:com.apple.preference.security?Input_Monitoring"
                );
              }}
            >
              Click here.
            </button>
          </li>
          <li>
            Click on <i>"Input Monitoring"</i> option.
          </li>
          <li>
            If <span className="text-primary-700">Mechy Keyboard</span> is on
            the list, delete it and add it again.
          </li>
          <li>
            Make sure <span className="text-primary-700">Mechy Keyboard</span>{" "}
            is checked.
          </li>
          <li>Restart the app.</li>
        </ol>
        <span className="inline-block mt-2 text-black/30">
          You must follow these instructions after every update. Input
          Monitoring is very buggy on macOS.
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default MacosWarning;
