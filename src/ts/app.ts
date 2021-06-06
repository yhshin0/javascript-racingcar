import RacingGame from "./RacingGame.js";

export default function App() {
  new RacingGame({ $app: document.querySelector("#app")! });
}

App();
