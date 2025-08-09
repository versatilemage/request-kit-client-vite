// Vite + React + TypeScript + request-kit-client Demo App

import { useEffect, useState } from "react";

import { catService, jokeService } from "./services";

function App() {
  const [joke, setJoke] = useState<string>("");
  const [catFact, setCatFact] = useState<string>("");

  useEffect(() => {
    jokeService.joke().then((res) => {
      setJoke(`${res.data.setup} - ${res.data.punchline}`);
    });

    catService.fact({}).then((res) => {
      setCatFact(res.data.fact);
    });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🌐 Vite + React + request-kit-client</h1>

      <section>
        <h2>😂 Random Joke</h2>
        <p>{joke || "Loading joke..."}</p>
      </section>

      <section>
        <h2>🐱 Cat Fact</h2>
        <p>{catFact || "Loading feline fact..."}</p>
      </section>
    </div>
  );
}

export default App;
