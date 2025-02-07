import { attachConsole, attachLogger, error } from "tauri-plugin-log-api";
await attachConsole();
await attachLogger((msg) => console.log(msg.message));
import ReactDOM from "react-dom/client";
import App from "./App";
import "./fonts.css";
import "./index.css";
import { PLATFORM } from "./init";

if (PLATFORM !== "darwin") {
  document.body.style.background = "rgb(255,255,255)";
  document.body.style.fontSize = "16px";
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

window.addEventListener("error", (event) => {
  error(event.error);
  console.log(event);
});
