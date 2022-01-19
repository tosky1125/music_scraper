class TagFixtureFactory {
  createClass(name: string, text?: string, className?: string) {
    const cn = className ? ` class="${className}"` : '';
    return `<${name}${cn}>${text}</${name}>`;
  }

  createId(name: string, text?:string, id?:string) {
    const tagId = id ? ` id="${id}"` : '';
    return `<${name}${tagId}>${text}</${name}>`;
  }

  createClassWithId(name: string, text:string, id: string, className: string) {
    return `<${name} id="${id}" class="${className}">${text}</${name}>`;
  }

  createClassWithOtherAttribute() :string {
    return `<body class="test" href="https://testlogic.com/user=12345678">test</body>`;
  }

  createNestedFixture(): string {
    return '<body><span></span></body>';
  }

  createSelfCloseTag(): string {
    return '<br id="test" class="test"/>';
  }

  createNestedFixtureWithId(): string {
    return '<body class="test">vavi<span class="logic">viva</span></body>';
  }

  createTripleNestedFixture() : string {
    return '<body class="test">vavi<span class="logic">viva<div class="test">hi</div></span></body>';
  }

  createMultipleChildFixture(): string {
    return '<body class="test">vavi<span class="logic">viva</span><div class="test">hi</div></body>';
  }
}
export default new TagFixtureFactory();
