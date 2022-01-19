import { Element } from './Element';

export class Cache {
  public classes: Record<string, Element[]>;

  public ids: Record<string, Element[]>;

  public tagNames: Record<string, Element[]>;

  constructor() {
    this.classes = {};
    this.ids = {};
    this.tagNames = {};
  }

  set(elem: Element) {
    const className = elem.getClass();
    const id = elem.getId();
    const { tagName } = elem;
    if (className) {
      this.setToClass(className, elem);
    }
    if (id) {
      this.setToId(id, elem);
    }

    this.setToTagName(tagName, elem);
  }

  getByClassName(className: string): Element[] {
    return this.classes[className];
  }

  getById(id: string): Element[] {
    return this.ids[id];
  }

  getByTagName(tagName: string): Element[] {
    return this.tagNames[tagName];
  }

  private setToClass(className: string, elem: Element): void {
    if (!this.classes[className]) {
      this.classes[className] = [];
    }
    this.classes[className].push(elem);
  }

  private setToId(id: string, elem: Element): void {
    if (!this.ids[id]) {
      this.ids[id] = [];
    }
    this.ids[id].push(elem);
  }

  private setToTagName(tagName: string, elem: Element): void {
    if (!this.tagNames[tagName]) {
      this.tagNames[tagName] = [];
    }
    this.tagNames[tagName].push(elem);
  }
}
