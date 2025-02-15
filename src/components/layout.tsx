import React from "react";
import { PLATFORM } from "../init";
import cn from "../utils/cn";
import MacosWarning from "../sections/MacosWarning";
import { House, Gear } from "@phosphor-icons/react";
import { Link, useRoute } from "wouter";
import Button from "./button";

const Layout = ({
  main,
  side,
}: {
  main: React.ReactNode;
  side: React.ReactNode;
}) => {
  const [isHome] = useRoute("/");
  const [isSettings] = useRoute("/settings/:subsection?");

  return (
    <>
      <nav
        data-tauri-drag-region
        className={cn(
          "fixed flex items-center top-0 left-0 w-full h-[48px] z-50 px-20",
          PLATFORM === "darwin" ? "h-[48px]" : "h-0"
        )}
      >
        {PLATFORM === "darwin" || PLATFORM === "ios" ? <MacosWarning /> : null}
      </nav>
      <div
        className="w-full grid grid-rows-1 h-[100dvh] overflow-hidden transition-all ease-in-out duration-300"
        style={{
          gridTemplateColumns: "280px 1fr",
          gridTemplateRows: "48px 1fr 56px",
        }}
      >
        <aside
          className={cn(
            "flex flex-col relative select-none pt-2 pl-4 pr-2 w-full overflow-y-auto transition-opacity duration-200 pb-4 h-full col-[1/2]",
            PLATFORM === "darwin" ? "row-[2/3]" : "row-[1/3]"
          )}
        >
          {side}
        </aside>
        <footer className="flex gap-2 px-3 py-2 col-[1/2] row-[3/4]">
          <Button
            className={cn("px-4")}
            aria-selected={isHome}
            variant={"ghost"}
            asChild
          >
            <Link href="/">
              <House size={16} weight="duotone" />
            </Link>
          </Button>
          <Button
            className={cn("px-4")}
            aria-selected={isSettings}
            variant={"ghost"}
            asChild
          >
            <Link href="/settings">
              <Gear size={16} weight="duotone" />
            </Link>
          </Button>
        </footer>
        <main className="relative w-full h-full px-2 py-2 col-[2/3] row-[1/4]">
          <div className="relative z-0 h-full px-8 py-8 pt-8 overflow-x-hidden overflow-y-auto rounded-lg shadow-lg border border-white/[0.05] bg-neutral-100 bg-gradient-to-tl from-primary-300 to-primary-400">
            {main}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
