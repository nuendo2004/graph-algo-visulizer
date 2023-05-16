import INode from "./Node";

class Queue<T> {
  head: INode<T> | null;
  tail: INode<T> | null;
  constructor() {
    this.head = null;
    this.tail = this.head;
  }

  get isEmpty(): boolean {
    if (this.head === null && this.tail === null) return true;
    return false;
  }

  enqueue(val: INode<T>) {
    const newHead = val;
    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      const temp = this.head;
      this.head = newHead;
      this.head.next = temp;
      this.head.next.prev = this.head;
    }
  }

  dequeue(): INode<T> | null {
    if (!this.tail) return null;
    if (this.tail === this.head) {
      const res = this.tail;
      this.head = null;
      this.tail = null;
      return res;
    }
    const temp = this.tail;
    const res = temp;
    this.tail = temp.prev;
    this.tail!.next = null;
    return res;
  }

  peek() {
    if (!this.tail) return null;
    return this.tail.value;
  }

  print() {
    let res: T[] = [];
    let cur = this.head;
    while (cur != null) {
      res.push(cur.value);
      cur = cur.next;
    }
    return res.reverse();
  }
}

export default Queue;
