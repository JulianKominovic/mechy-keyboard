import { attachConsole, attachLogger, error } from "tauri-plugin-log-api";
await attachConsole();
await attachLogger((msg) => console.log(msg.message));
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
window.addEventListener("error", (event) => {
  error(event.error);
  console.log(event);
});
