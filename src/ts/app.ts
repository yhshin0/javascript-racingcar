import RacingGame from "./racingGame.js";

export default function App() {
  new RacingGame({ $app: document.querySelector("#app")! });
}

App();
