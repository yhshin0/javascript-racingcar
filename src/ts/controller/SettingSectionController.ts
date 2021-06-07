import RacingCarDiv from "../render/RacingCarDiv.js";
import RacingSectionController from "./RacingSectionController.js";
import { ERROR_MSG } from "./SettingSectionControllerError.js";

export default class SettingSectionController {
  cars: string[];

  constructor() {
    this.cars = [];
    this.addEventToButtons();
  }

  addEventToButtons(): void {
    const $carNameConfirmButton = document.getElementsByTagName("button")[0];
    $carNameConfirmButton.addEventListener("click", () => {
      this.splitCarNames();
    });
    const $roundConfirmButton = document.getElementsByTagName("button")[1];
    $roundConfirmButton.addEventListener("click", () => {
      this.setRacingRound();
      if (localStorage.getItem("round")) {
        new RacingSectionController();
      }
    });
  }

  splitCarNames(): void {
    const $carNamesInputBox = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement;
    this.cars = $carNamesInputBox.value
      .split(",")
      .map(car => car.trim())
      .filter(car => car != "");
    const errorMsg = this.isValidCarName();
    if (errorMsg !== ERROR_MSG.SUCCESS) {
      alert(errorMsg);
      $carNamesInputBox.value = "";
      return;
    }
    this.displayRoundFieldset();
    this.renderCars();
    localStorage.setItem("cars", this.cars.toString());
  }

  isValidCarName(): string {
    let ret = ERROR_MSG.SUCCESS;
    if (this.cars.length === 0) {
      return ERROR_MSG.NO_CAR;
    }
    this.cars.forEach(car => {
      if (car.length > 5) {
        ret = ERROR_MSG.OVER_CHARACTERS;
      }
    });
    return ret;
  }

  displayRoundFieldset(): void {
    const $carNamesInputBox = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement;
    $carNamesInputBox.disabled = true;
    const $carNamesConfirmButton: HTMLButtonElement =
      document.getElementsByTagName("button")[0];
    $carNamesConfirmButton.disabled = true;
    const $roundConfirmFieldset: HTMLElement =
      document.getElementsByTagName("fieldset")[1];
    $roundConfirmFieldset.hidden = false;
  }

  renderCars(): void {
    this.cars.forEach(car => {
      document
        .querySelector("section>div")
        ?.insertAdjacentHTML("beforeend", new RacingCarDiv().render(car));
    });
  }

  setRacingRound(): void {
    const $numberInputBox: HTMLInputElement = document.querySelector(
      "input[type='number']"
    )!;
    const racingRound: number = Number($numberInputBox ?.value);
    if (racingRound <= 0 || isNaN(racingRound)) {
      alert(ERROR_MSG.WRONG_RACING_ROUND);
      $numberInputBox.value = "0";
      return;
    }
    localStorage.setItem("round", racingRound.toString());
    $numberInputBox.disabled = true;
    const $roundConfirmButton: HTMLButtonElement =
      document.querySelectorAll("button")[1];
    $roundConfirmButton.disabled = true;
  }
}
