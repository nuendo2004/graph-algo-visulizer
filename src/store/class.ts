class Cell {
  row: number;
  col: number;
  constructor(r: number, c: number) {
    this.row = r;
    this.col = c;
  }
  get getGrid() {
    return this.col * this.row;
  }
}

export { Cell };
