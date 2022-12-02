import Node from "./Node";

class Queue {
  constructor() {
    this.head = null;
    this.tail = this.head;
  }

  isEmpty() {
    if (this.head == null) return true;
    return false;
  }

  enqueue(val) {
    const newHead = new Node(val);
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

  dequeue() {
    if (!this.tail) return null;
    if (this.tail === this.head) {
      const res = this.tail.value;
      this.head = null;
      this.tail = null;
      return res;
    }
    const temp = this.tail;
    const res = temp.value;
    this.tail = temp.prev;
    this.tail.next = null;
    return res;
  }

  peek() {
    return this.tail.value;
  }

  print() {
    let res = [];
    let cur = this.head;
    while (cur != null) {
      res.push(cur.value);
      cur = cur.next;
    }
    return res.reverse();
  }
}

export default Queue;
