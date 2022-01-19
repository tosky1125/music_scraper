import ElementBuilder from './ElementBuilder';
import { Element } from '../../entity/Element';
import { Stack } from '../../entity/Stack';
import { Cache } from '../../entity/Cache';
import { TrimOption } from '../../enum/TrimOption';
import { HTMLInputError } from '../error/HTMLInputError';
import { HTMLParsingError } from '../error/HTMLParsingError';

export class Parser {
  private readonly html: string[] | null;

  private readonly TAG_REGEXP = /(<\/?[a-z][a-z0-9]*(?::[a-z][a-z0-9]*)?\s*(?:\s+[a-z0-9-_]+=(?:(?:'[\s\S]*?')|(?:"[\s\S]*?")))*\s*\/?>)|([^<]|<(?![a-z\/]))*/gi;

  constructor(html: string, from: string = TrimOption.TBODY) {
    this.html = this.isolationPipe(html, from);
  }

  isolationPipe(html: string, from: string): string[] {
    if (from === TrimOption.NO_TRIM) {
      return html.match(this.TAG_REGEXP)
        .filter((e) => e);
    }
    const trim1 = this.trimFrom(html, from);
    const trim2 = this.trim(trim1);
    // @ts-ignore
    return trim2.match(this.TAG_REGEXP)
      .filter((e) => e);
  }

  trimFrom(html: string, tag: string) {
    const startTag = `<${tag}`;
    const endTag = `</${tag}`;
    const front = html.slice(html.indexOf(startTag));
    const result = front.slice(0, front.indexOf(endTag) + endTag.length);

    return result;
  }

  private trim(string: string): string {
    return string.trim()
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/" >/g, '">')
      .replace(/\n/g, '');
  }

  execute() {
    if (!this.html) {
      throw new HTMLInputError();
    }
    const tags = this.strToElement(this.html);
    return this.arrToDom(tags);
  }

  private strToElement = (str: string[]) => str.map((e) => {
    if (this.validateTextString(e)) {
      return e;
    }

    return ElementBuilder.get(e);
  });

  private validateTextString(str: string): boolean {
    return str[0] !== '<';
  }

  private arrToDom = (elements: (Element | string)[]) => {
    const cache = new Cache();
    const stack = new Stack(cache);
    const root: Element = <Element>elements[0];
    elements.forEach((e, i) => {
      if (typeof e === 'string') {
        stack.get().text = e;
      } else if (e.isSelfClosing) {
        const parent = stack.get();
        e.parent = parent;
        stack.addChild(e);
      } else if (!e.isForClosing) {
        stack.push(e);
      } else if (e.isForClosing) {
        if (e.tagName === stack.get().tagName) {
          const child = stack.pop();
          if (!child) {
            throw new HTMLParsingError();
          }
          const parent = stack.get() || null;
          child.parent = parent;
          stack.addChild(child);
        }
      }
    });
    return {
      cache,
      root,
    };
  };
}
