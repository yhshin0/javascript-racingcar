var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ResultSection from "../render/ResultSection.js";
import { $, $$ } from "../utils.js";
export default class RacingSectionController {
    constructor() {
        this.cars = [];
        this.carDistances = [];
        this.carHTMLElements = null;
        this.round = 0;
        this.setRacingCars();
        this.startGame();
    }
    setRacingCars() {
        var _a;
        this.cars = (_a = localStorage.getItem("cars")) === null || _a === void 0 ? void 0 : _a.split(",");
        this.carDistances = Array.from({ length: this.cars.length }, () => 0);
        this.carHTMLElements = $$("div.car-player");
        this.round = Number(localStorage.getItem("round"));
    }
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.startRacing();
            clearInterval(result);
            const winner = this.findWinner();
            this.removeSpinners();
            this.renderResult();
            setTimeout(() => {
                alert(`🏆 WINNER is ${winner} 🏆`);
                const $restartButton = ($$("button")[2]);
                $restartButton.addEventListener("click", () => this.getBackToReadyState());
            }, 2000);
        });
    }
    startRacing() {
        return new Promise(resolve => {
            let intervalTimerId = setInterval(() => {
                this.rollDiceAndRenderArrow();
            }, 1000);
            setTimeout(() => {
                resolve(intervalTimerId);
            }, this.round * 1000);
        });
    }
    rollDiceAndRenderArrow() {
        var _a;
        (_a = this.cars) === null || _a === void 0 ? void 0 : _a.forEach((_, idx) => {
            if (Math.random() * 10 >= 4) {
                this.carDistances[idx]++;
                this.carHTMLElements[idx].insertAdjacentHTML("afterend", `<div class="forward-icon mt-2">⬇️️</div>`);
            }
        });
    }
    findWinner() {
        const maxDist = Math.max(...this.carDistances);
        const winner = this.cars.filter((_, idx) => this.carDistances[idx] == maxDist);
        localStorage.setItem("winner", winner.toString());
        return winner.toString();
    }
    removeSpinners() {
        const spinners = $$("div.d-flex.justify-center.mt-3");
        for (let i = spinners.length - 1; i >= 0; i--) {
            spinners[i].remove();
        }
    }
    renderResult() {
        var _a;
        const resultSection = new ResultSection();
        (_a = $("#app")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", resultSection.render());
    }
    getBackToReadyState() {
        const $resultSection = $$("section")[2];
        $resultSection.remove();
        const $racingSection = $("div.mt-4");
        $racingSection.innerHTML = "";
        $$("input").forEach(elem => {
            elem.disabled = false;
            elem.value = "";
        });
        $$("button").forEach(elem => (elem.disabled = false));
        const $roundInputFieldset = $$("fieldset")[1];
        $roundInputFieldset.hidden = true;
    }
}
