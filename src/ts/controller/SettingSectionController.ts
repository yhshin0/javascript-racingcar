import RacingCarDiv from "../render/RacingCarDiv.js";
import RacingSectionController from "./RacingSectionController.js";
import { ERROR_MSG } from "./SettingSectionControllerError.js";

export default class SettingSectionController {
  cars: string[];
  constructor() {
    this.cars = [];
    const carNameInputButton = document.querySelectorAll("button")[0];
    carNameInputButton.addEventListener("click", () => {
      this.splitCarNames();
    });
    const numberInputButton = document.querySelectorAll("button")[1];
    numberInputButton.addEventListener("click", () => {
      this.setRacingRound();
      if (localStorage.getItem("round")) {
        new RacingSectionController();
      }
    });
  }
  splitCarNames() {
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
    this.displayNumField();
    this.renderCars();
    localStorage.setItem("cars", this.cars.toString());
  }
  displayNumField() {
    const $carNamesInputBox = document.querySelector(
      "input[type='text']"
    ) as HTMLInputElement;
    $carNamesInputBox.disabled = true;
    document.querySelectorAll("button")[0].disabled = true;
    document.querySelectorAll("fieldset")[1].hidden = false;
  }
  isValidCarName(): string {
    if (this.cars.length === 0) {
      return ERROR_MSG.NO_CAR;
    }
    this.cars.forEach(car => {
      if (car.length > 5) {
        return ERROR_MSG.OVER_CHARACTERS;
      }
    });
    return ERROR_MSG.SUCCESS;
  }
  renderCars() {
    this.cars.forEach(car => {
      document
        .querySelector("section>div")
        ?.insertAdjacentHTML("beforeend", new RacingCarDiv().render(car));
    });
  }
  setRacingRound() {
    const $numberInputBox = document.querySelector(
      "input[type='number']"
    ) as HTMLInputElement;
    const racingRound: number = Number($numberInputBox?.value);
    if (racingRound <= 0 || isNaN(racingRound)) {
      alert(ERROR_MSG.WRONG_RACING_ROUND);
      $numberInputBox.value = "0";
      return;
    }
    localStorage.setItem("round", racingRound.toString());
    $numberInputBox.disabled = true;
    document.querySelectorAll("button")[1].disabled = true;
  }
}
