import { makeAutoObservable } from "mobx";

export default class This {
  page: number;
  constructor() {
    makeAutoObservable(this);
    this.page = 1;
  }
  setPage(value:number) {
    this.page = value;
  }
}
