import NonClosingTag from '../infra/core/NonClosingTag';

export class Element {
  private _tagName: string;

  private _text: string | null;

  private _attribute: Record<string, string>;

  private _parent: null | Element;

  private _child: Element[];

  private _isForClosing: boolean;

  private _isSelfClosing: boolean;

  constructor() {
    this._tagName = '';
    this._text = null;
    this._attribute = {};
    this._parent = null;
    this._child = [];
    this._isForClosing = false;
    this._isSelfClosing = false;
  }

  getClass(): string | null {
    return this.attribute?.class || null;
  }

  getId(): string | null {
    return this.attribute?.id || null;
  }

  get isForClosing(): boolean {
    return this._isForClosing;
  }

  setForClosing(): void {
    this._isForClosing = true;
  }

  // @ts-ignore
  get parent(): Element | null {
    return this._parent;
  }

  get child(): Element[] {
    return this._child;
  }

  getLastChild(): Element {
    return this.child[this.child.length - 1];
  }

  getLastChildNode(): Element {
    let child = this.getLastChild();
    while (child) {
      if (!child.getLastChild()) {
        return child;
      }
      child = child.getLastChild();
    }
  }

  addChild(value: Element) {
    this._child.push(value);
  }

  set parent(value: Element) {
    this._parent = value;
  }

  get isSelfClosing(): boolean {
    return this._isSelfClosing;
  }

  setSelfClosing(): void {
    this._isSelfClosing = true;
  }

  set tagName(value: string) {
    if (NonClosingTag.check(value)) {
      this.setSelfClosing();
    }
    this._tagName = value;
  }

  set attribute(value: Record<string, string>) {
    this._attribute = value;
  }

  // @ts-ignore
  get attribute(): Record<string, string> | null {
    if (!Object.keys(this._attribute).length) return null;
    return this._attribute;
  }

  get tagName(): string {
    return this._tagName;
  }

  get text(): string {
    if (!this._text) return '';
    return this._text;
  }

  set text(value: string | null) {
    this._text = value;
  }

  getAttributeValueByKey(key: string): string | null {
    return this._attribute[key] || null;
  }
}
