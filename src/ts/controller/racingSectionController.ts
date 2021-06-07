import ResultSection from "../render/ResultSection.js";
import { $, $$ } from "../utils.js";

export default class RacingSectionController {
  cars: string[];
  carDistances: number[];
  carHTMLElements: NodeListOf<HTMLElement> | null;
  round: number;

  constructor() {
    this.cars = [];
    this.carDistances = [];
    this.carHTMLElements = null;
    this.round = 0;
    this.setRacingCars();
    this.startGame();
  }

  setRacingCars(): void {
    this.cars = localStorage.getItem("cars") ?.split(",")!;
    this.carDistances = Array.from({ length: this.cars.length }, () => 0);
    this.carHTMLElements = $$("div.car-player");
    this.round = Number(localStorage.getItem("round"));
  }

  async startGame(): Promise<void> {
    const result: number = await this.startRacing();
    clearInterval(<number>result);
    const winner: string = this.findWinner();
    this.removeSpinners();
    this.renderResult();
    setTimeout(() => {
      alert(`🏆 WINNER is ${winner} 🏆`);
      const $restartButton: HTMLButtonElement = <HTMLButtonElement>$$("button")[2];
      $restartButton.addEventListener("click", () => this.getBackToReadyState());
    }, 2000);
  }

  startRacing(): Promise<number> {
    return new Promise(resolve => {
      let intervalTimerId: number = setInterval(() => {
        this.rollDiceAndRenderArrow();
      }, 1000);
      setTimeout(() => {
        resolve(intervalTimerId);
      }, this.round * 1000);
    });
  }

  rollDiceAndRenderArrow(): void {
    this.cars ?.forEach((_, idx) => {
      if (Math.random() * 10 >= 4) {
        this.carDistances[idx]++;
        this.carHTMLElements![idx].insertAdjacentHTML(
          "afterend",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
      }
    });
  }

  findWinner(): string {
    const maxDist: number = Math.max(...this.carDistances);
    const winner: string[] = this.cars.filter(
      (_, idx) => this.carDistances[idx] == maxDist
    );
    localStorage.setItem("winner", winner.toString());
    return winner.toString();
  }

  removeSpinners(): void {
    const spinners: NodeListOf<HTMLElement> = $$("div.d-flex.justify-center.mt-3");
    for (let i = spinners.length - 1; i >= 0; i--) {
      spinners[i].remove();
    }
  }

  renderResult(): void {
    const resultSection = new ResultSection();
    $("#app") ?.insertAdjacentHTML("beforeend", <string>resultSection.render());
  }

  getBackToReadyState(): void {
    const $resultSection: HTMLElement = $$("section")[2];
    $resultSection.remove();
    const $racingSection: HTMLDivElement = <HTMLDivElement>$("div.mt-4")!;
    $racingSection.innerHTML = "";
    document.querySelectorAll("input").forEach(elem => {
      elem.disabled = false;
      elem.value = "";
    });
    $$("button").forEach(elem => (<HTMLButtonElement>elem).disabled = false);
    const $roundInputFieldset: HTMLElement = $$("fieldset")[1];
    $roundInputFieldset.hidden = true;
  }
}
