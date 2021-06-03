import RacingCarDiv from "../render/racingCarDiv.js";
import { ERROR_MSG } from "./SettingSectionControllerError.js";

export default class SettingSectionController {
  cars: string[];
  constructor() {
    this.cars = [];
    const carNameInputButton = document.querySelectorAll("button")[0];
    carNameInputButton.addEventListener("click", () => {
      this.splitCarNames();
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
}
