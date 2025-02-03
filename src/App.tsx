import { Toaster } from "sonner";
import Separator from "./components/separator";
import ContextProvider from "./context";
import Main from "./sections/Main";
import cn from "./utils/cn";
import Actions from "./sections/Actions";
import Info from "./sections/Info";
import KeyboardSelector from "./sections/KeyboardSelector";
import { PLATFORM } from "./init";
import MacosWarning from "./sections/MacosWarning";

function App() {
  return (
    <ContextProvider>
      <nav
        data-tauri-drag-region
        className="fixed flex items-center top-0 left-0 w-full h-[48px] z-50 px-20"
      >
        {PLATFORM === "darwin" || PLATFORM === "ios" ? <MacosWarning /> : null}
      </nav>
      <div
        className="w-full grid grid-rows-1 h-[100dvh] overflow-hidden transition-all ease-in-out duration-300"
        style={{
          gridTemplateColumns: "280px 1fr",
          gridTemplateRows: "48px 1fr",
        }}
      >
        <aside
          className={cn(
            "flex flex-col relative select-none pt-2 pl-4 pr-2 w-full overflow-y-auto transition-opacity duration-200 pb-4 h-full col-[1/2] row-[2/3]"
          )}
        >
          <KeyboardSelector />
          <Separator className="mt-4 mb-2">Actions</Separator>
          <Actions />
          <Separator className="mt-4 mb-2">Info</Separator>
          <Info />
        </aside>
        <Main />
      </div>
      <Toaster
        toastOptions={{
          className:
            "bg-primary-900 text-primary-100 [&__*.sonner-loading-bar]:bg-primary-100",
          descriptionClassName: "text-primary-300",
        }}
      />
    </ContextProvider>
  );
}

export default App;
