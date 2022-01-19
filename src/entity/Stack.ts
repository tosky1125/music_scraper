import { Element } from './Element';
import { Cache } from './Cache';

export class Stack {
  storage: Element[];

  private cache: Cache;

  constructor(cache: Cache) {
    this.cache = cache;
    this.storage = [];
  }

  push(node: Element) {
    this.cache.set(node);
    this.storage.push(node);
  }

  pop(): Element | null {
    return this.storage.pop() || null;
  }

  get(): Element {
    return this.storage[this.storage.length - 1];
  }

  addChild(node: Element): void {
    if (this.storage.length) {
      this.get()
        .addChild(node);
    }
  }
}
