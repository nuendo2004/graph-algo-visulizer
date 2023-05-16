import { IconType } from "react-icons";
class Cell {
  row: number;
  col: number;
  constructor(r: number, c: number) {
    this.row = r;
    this.col = c;
  }
  getGrid(mapColSize: number) {
    return this.row * mapColSize + this.col;
  }
}

class Map {
  row: number;
  col: number;
  gridSize: number;
  constructor(row: number = 30, col: number = 30, gridSize: number = 15) {
    this.row = row;
    this.col = col;
    this.gridSize = gridSize;
  }
}

enum Tools {
  DEFAULT = 1,
  PEN = 2,
  START = 3,
  END = 4,
  ERASE = 5,
}

abstract class Tool {
  toolType: Tools;
  isDrawing: boolean;
  Icon: IconType;
  draw: (cell: Cell) => void;
}

export { Cell, Map, Tool, Tools };
