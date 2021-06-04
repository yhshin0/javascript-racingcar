import ResultSection from "../render/resultSection.js";

export default class RacingSectionController {
  cars: string[];
  carDistances: number[];
  carHTMLElements: HTMLCollection | null;
  round: number;
  resultSection: ResultSection;
  constructor() {
    this.cars = [];
    this.carDistances = [];
    this.carHTMLElements = null;
    this.round = 0;
    this.resultSection = new ResultSection();
    this.setRacingCars();
    this.startGame();
  }
  setRacingCars() {
    this.cars = localStorage.getItem("cars")?.split(",")!;
    this.carDistances = Array.from({ length: this.cars.length }, () => 0);
    this.carHTMLElements = document.getElementsByClassName("car-player");
    this.round = Number(localStorage.getItem("round"));
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
    this.cars?.forEach((_, idx) => {
      if (Math.random() * 10 >= 4) {
        this.carDistances[idx]++;
        this.carHTMLElements![idx].insertAdjacentHTML(
          "afterend",
          `<div class="forward-icon mt-2">⬇️️</div>`
        );
      }
    });
  }
  async startGame() {
    const result = await this.startRacing();
    clearInterval(<number>result);
    const maxDist = Math.max(...this.carDistances);
    const winners = this.cars.filter(
      (_, idx) => this.carDistances[idx] == maxDist
    );
    localStorage.setItem("winner", winners.toString());
    this.removeSpinners();
    document
      .getElementsByTagName("body")[0]
      ?.insertAdjacentHTML("beforeend", <string>this.resultSection.render());
    setTimeout(() => {
      alert(`🏆 WINNER is ${winners} 🏆`);
      document
        .getElementsByTagName("button")[2]
        .addEventListener("click", () => alert("REMOVE ELEMENTS AND INIT!!!"));
    }, 2000);
  }
  removeSpinners() {
    const spinners: HTMLCollection = document.getElementsByClassName(
      "d-flex justify-center mt-3"
    );
    for (let i = spinners.length - 1; i >= 0; i--) {
      spinners[i].remove();
    }
  }
}
