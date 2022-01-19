class NonClosingTag {
  private readonly dict = {
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    link: true,
    meta: true,
    param: true,
    source: true,
  };

  check(tag: string): boolean {
    return tag in this.dict;
  }
}
export default new NonClosingTag();
