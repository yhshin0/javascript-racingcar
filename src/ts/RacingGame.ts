import RacingSection from "./render/racingSection.js";
import SettingSection from "./render/settingSection.js";

export default class RacingGame {
  $app: HTMLDivElement;
  constructor({ $app }: { $app: HTMLDivElement }) {
    this.$app = $app;
    this.init();
  }

  render() {
    this.$app.insertAdjacentHTML("beforeend", new SettingSection().render());
    this.$app.insertAdjacentHTML("beforeend", new RacingSection().render());
  }

  init() {
    this.render();
  }
}
