import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { greet } from "./bindings";

function App() {
  const [greeting, setGreeting] = useState("");
  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <h1>{greeting}</h1>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet(
            new FormData(e.target as HTMLFormElement).get("name") as string
          ).then((greeting) => {
            setGreeting(greeting);
          });
        }}
      >
        <input id="greet-input" name="name" placeholder="Enter a name..." />
        <button type="submit">Greet</button>
      </form>
    </div>
  );
}

export default App;
