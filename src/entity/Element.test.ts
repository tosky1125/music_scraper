import ElementFixtureFactory from './ElementFixtureFactory';

describe('엘리먼트 엔티티 테스트', () => {
  const factory = ElementFixtureFactory;
  it('엘리먼트를 생성하고 태그명을 부여할 수 있다.', () => {
    const ele = factory.createElement();
    ele.tagName = 'div';
    expect(ele.tagName).toEqual('div');
  });

  it('엘리먼트를 생성하고 텍스트를 부여할 수 있다.', () => {
    const ele = factory.createElement();
    ele.text = 'test';
    expect(ele.text).toEqual('test');
  });

  it('엘리먼트를 생성하고 attribute를 부여할 수 있다.', () => {
    const ele = factory.createElement();
    ele.attribute = { class: 'test', id: 'logic' };
    expect(ele.getClass()).toEqual('test');
    expect(ele.getId()).toEqual('logic');
  });

  it('엘리먼트를 생성하고 closing용도로 전환할 수 있다.', () => {
    const ele = factory.createElement();
    ele.setForClosing();
    expect(ele.isForClosing).toEqual(true);
  });

  it('엘리먼트를 생성하고 self closing용도로 전환할 수 있다.', () => {
    const ele = factory.createElement();
    ele.setSelfClosing();
    expect(ele.isSelfClosing).toEqual(true);
  });

  it('엘리먼트를 생성하고 부모 노드를 설정할 수 있다. ', () => {
    const parent = factory.createElement();
    parent.tagName = 'span';
    parent.text = 'fighting';
    const child = factory.createElement();
    child.parent = parent;
    expect(child.parent.text).toEqual('fighting');
  });

  it('엘리먼트를 생성하고 자식 노드를 추가할 수 있다.', () => {
    const ele = factory.createElement();
    const child1 = factory.createElement();
    const child2 = factory.createElement();
    child1.text = 'test1';
    child2.text = 'test2';
    ele.addChild(child1);
    ele.addChild(child2);
    expect(ele.child.length).toEqual(2);
    expect(ele.getLastChild().text).toEqual('test2');
    expect(ele.child[0].text).toEqual('test1');
  });
  it('가장 아래의 마지막 자녀 노드를 가지고 올 수 있다.', () => {
    const ele = factory.createElement();
    const child1 = factory.createElement();
    const child2 = factory.createElement();
    child1.text = 'test1';
    child2.text = 'test2';
    child1.addChild(child2);
    ele.addChild(child1);
    expect(ele.getLastChildNode().text).toEqual('test2');
  });
  it('selfclosing 태그를 추가하면 자동으로 selfclosing 상태로 변환되어야 한다.', () => {
    const ele = factory.createElement();
    ele.tagName = 'br';
    expect(ele.isSelfClosing).toBeTruthy();
  });
});
