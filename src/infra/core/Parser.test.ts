import { Parser } from './Parser';
import ElementFixtureFactory from '../../entity/TagFixtureFactory';
import { TrimOption } from '../../enum/TrimOption';

describe('엘리먼트 파싱 테스트', () => {
  const factory = ElementFixtureFactory;
  it('<body>hi</body>가 입력되면 body라는 tag를 가지고 텍스트는 hi를 가진 노드가 출력되어야 한다.', async () => {
    const fixture = factory.createClass('body', 'hi');
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.text)
      .toEqual('hi');
    expect(result.attribute)
      .toBeNull();
    expect(result.tagName)
      .toEqual('body');
  });

  it('<body class="test">hi</body>가 입력되면 body라는 tag를 가지고 텍스트는 hi, class는 test를 가진 노드가 출력되어야 한다.', async () => {
    const fixture = factory.createClass('body', 'hi', 'test');
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.text)
      .toEqual('hi');
    expect(result.getAttributeValueByKey('class'))
      .toEqual('test');
    expect(result.tagName)
      .toEqual('body');
  });

  it('<body id="test">hi</body>가 입력되면 body라는 tag를 가지고 텍스트는 hi, id는 test를 가진 노드가 출력되어야 한다.', async () => {
    const fixture = factory.createId('body', 'hi', 'test');
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.text)
      .toEqual('hi');
    expect(result.getAttributeValueByKey('id'))
      .toEqual('test');
    expect(result.tagName)
      .toEqual('body');
  });

  it('<body id="test" class="test2">hi</body>가 입력되면 body라는 tag를 가지고 텍스트는 hi, id는 test, 클래스는 test2를 가진 노드가 출력되어야 한다.', async () => {
    const fixture = factory.createClassWithId('body', 'hi', 'test', 'test2');
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.text)
      .toEqual('hi');
    expect(result.getAttributeValueByKey('id'))
      .toEqual('test');
    expect(result.getAttributeValueByKey('class'))
      .toEqual('test2');
    expect(result.tagName)
      .toEqual('body');
  });

  it('href attributes를 가진 태그 테스트', () => {
    const fixture = factory.createClassWithOtherAttribute();
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.getAttributeValueByKey('href'))
      .toEqual('https://testlogic.com/user=12345678');
  });

  it('self Closed 태그의 경우에도 attribute를 정상적으로 파싱할 수 있다.', () => {
    const fixture = factory.createSelfCloseTag();
    const result = new Parser(fixture, TrimOption.NO_TRIM).execute().root;
    expect(result.getAttributeValueByKey('id'))
      .toEqual('test');
    expect(result.getAttributeValueByKey('class'))
      .toEqual('test');
  });

  it('html이 전달되지 않으면 에러가 발생해야 한다.', () => {
    expect(() => new Parser().execute().root).toThrowError();
  });
});
