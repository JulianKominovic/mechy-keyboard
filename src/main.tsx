import { attachConsole, attachLogger, error } from "tauri-plugin-log-api";
await attachConsole();
await attachLogger((msg) => console.log(msg.message));
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
window.addEventListener("error", (event) => {
  error(event.error);
  console.log(event);
});
