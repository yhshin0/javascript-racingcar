import RacingGame from "./RacingGame.js";
import { $ } from "./utils.js";
export default function App() {
    new RacingGame({ $app: $("#app") });
}
App();
