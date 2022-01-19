import { Element } from '../../entity/Element';

class ElementBuilder {
  get(str: string): Element {
    return this.build(str);
  }

  private build(str: string): Element {
    const arr = this.sliceTagName(str);
    switch (arr.length) {
      case 1:
        return this.tagOnly(arr);
      default:
        return this.tagWithAttr(arr);
    }
  }

  isForClosing(str: string): boolean {
    return str[0] === '/';
  }

  createForClosing(str: string): Element {
    const elem = new Element();
    const tagName = str.slice(1);
    elem.tagName = tagName;
    elem.setForClosing();
    return elem;
  }

  sliceTagName(str: string): string[] {
    const string = str.replace('/>', '')
      .replace(/[<>]/gi, '');
    const result = [];
    for (let i = 0; i < string.length; i++) {
      if (str[i] === ' ') {
        result.push(string.slice(0, i - 1));
        result.push(string.slice(i));
        break;
      }
    }
    if (!result.length) result.push(string);
    return result;
  }

  tagOnly(input: string[]): Element {
    const [str] = input;
    if (this.isForClosing(str)) {
      return this.createForClosing(str);
    }
    const elem = new Element();
    elem.tagName = str;
    return elem;
  }

  tagWithAttr(input: string[]): Element {
    const [head, tail] = input;
    const elem = new Element();
    const attr = this.parseAttribute(tail);
    elem.tagName = head;
    elem.attribute = attr;
    return elem;
  }

  parseAttribute(string: string): Record<string, string> {
    const arr = string.slice(0, string.length - 1)
      .replace('=', '')
      .split('"');
    const dict: Record<string, string> = {};
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i].trim()
        .replace('=', '');
      const value = arr[i + 1];
      if (this.isOdd(i)) {
        dict[key] = value;
      }
    }
    return dict;
  }

  private isOdd(num: number): boolean {
    return (num + 1) % 2 !== 0;
  }
}

export default new ElementBuilder();
