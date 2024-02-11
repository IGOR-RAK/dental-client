import { makeAutoObservable } from "mobx";

export default class This {
  screen: number;
  title: string | null;
  constructor() {
    makeAutoObservable(this);
    this.screen = 1;
    this.title = "Przychodnia Dentestyczna";
  }
  setPage(value:number) {
    this.screen = value;
  }
}
