import RacingCarDiv from "../render/RacingCarDiv.js";
import RacingSectionController from "./RacingSectionController.js";
import { ERROR_MSG } from "./SettingSectionControllerError.js";
import { $, $$ } from "../utils.js";
export default class SettingSectionController {
    constructor() {
        this.cars = [];
        this.addEventToButtons();
    }
    addEventToButtons() {
        const $carNameConfirmButton = ($$("button")[0]);
        $carNameConfirmButton.addEventListener("click", () => {
            this.splitCarNames();
        });
        const $roundConfirmButton = ($$("button")[1]);
        $roundConfirmButton.addEventListener("click", () => {
            this.setRacingRound();
            if (localStorage.getItem("round")) {
                new RacingSectionController();
            }
        });
    }
    splitCarNames() {
        const $carNamesInputBox = ($("input[type='text']"));
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
    isValidCarName() {
        let ret = ERROR_MSG.SUCCESS;
        if (this.cars.length === 0) {
            return ERROR_MSG.NO_CAR;
        }
        if (new Set(this.cars).size !== this.cars.length) {
            return ERROR_MSG.DUPLICATE_CAR_NAME;
        }
        this.cars.forEach(car => {
            if (car.length > 5) {
                ret = ERROR_MSG.OVER_CHARACTERS;
                return;
            }
        });
        return ret;
    }
    displayRoundFieldset() {
        const $carNamesInputBox = ($("input[type='text']"));
        $carNamesInputBox.disabled = true;
        const $carNamesConfirmButton = ($$("button")[0]);
        $carNamesConfirmButton.disabled = true;
        const $roundConfirmFieldset = $$("fieldset")[1];
        $roundConfirmFieldset.hidden = false;
    }
    renderCars() {
        this.cars.forEach(car => {
            var _a;
            (_a = $("section>div")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", new RacingCarDiv().render(car));
        });
    }
    setRacingRound() {
        const $numberInputBox = ($("input[type='number']"));
        const racingRound = Number($numberInputBox === null || $numberInputBox === void 0 ? void 0 : $numberInputBox.value);
        if (racingRound <= 0 || isNaN(racingRound)) {
            alert(ERROR_MSG.WRONG_RACING_ROUND);
            $numberInputBox.value = "0";
            return;
        }
        localStorage.setItem("round", racingRound.toString());
        $numberInputBox.disabled = true;
        const $roundConfirmButton = ($$("button")[1]);
        $roundConfirmButton.disabled = true;
    }
}
