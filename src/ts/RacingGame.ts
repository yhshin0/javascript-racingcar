import SettingSectionController from "./controller/SettingSectionController.js";
import RacingSection from "./render/RacingSection.js";
import SettingSection from "./render/SettingSection.js";

export default class RacingGame {
  $app: HTMLDivElement;
  constructor({ $app }: { $app: HTMLDivElement }) {
    this.$app = $app;
    localStorage.clear();
    this.init();
  }

  render(): void {
    this.$app.insertAdjacentHTML("beforeend", new SettingSection().render());
    this.$app.insertAdjacentHTML("beforeend", new RacingSection().render());
  }

  handleEvent(): void {
    new SettingSectionController();
  }

  init(): void {
    this.render();
    this.handleEvent();
  }
}
