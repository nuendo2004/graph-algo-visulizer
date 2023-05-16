import { Cell, Map } from "../store/Class";

interface INode<T> {
  value: T;
  next: INode<T> | null;
  prev: INode<T> | null;
}

class NumNode implements INode<number> {
  value: number;
  next: INode<number> | null = null;
  prev: INode<number> | null = null;
  constructor(val: number) {
    this.value = val;
  }
}

class GridNode implements INode<number[]> {
  value: number[];
  next: INode<number[]> | null = null;
  prev: INode<number[]> | null = null;
  constructor(val: number[]) {
    this.value = val;
  }
}

class CellNode implements INode<Cell> {
  value: Cell;
  next: INode<Cell> | null = null;
  prev: INode<Cell> | null = null;
  constructor(val: Cell) {
    this.value = val;
  }
}

export { CellNode, NumNode, GridNode };

export default INode;
