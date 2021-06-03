interface ICar {
  name: string;
  num: number;
}
export default class Car implements ICar {
  name: string;
  num: number;
  constructor() {
    this.name = "";
    this.num = 0;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getNum(): number {
    return this.num;
  }
  setNum(num: number) {
    this.num = num;
  }
}
