import ElementFixtureFactory from './ElementFixtureFactory';
import { Cache } from './Cache';

describe('캐시 테스트', () => {
  const factory = ElementFixtureFactory;

  it('캐시에 엘리먼트를 저장할 수 있다.', () => {
    const cache = new Cache();
    const elem = factory.createElement();
    cache.set(elem);
    expect(cache.getByClassName('test').length).toEqual(1);
  });

  it('캐시에 엘리먼트를 한개 이상 저장할 수 있다.', () => {
    const cache = new Cache();
    const elem = factory.createElement();
    cache.set(elem);
    cache.set(elem);
    cache.set(elem);
    cache.set(elem);
    cache.set(elem);
    cache.set(elem);
    expect(cache.getByClassName('test').length).toEqual(6);
  });

  it('캐시에 저장한 엘리먼트를 클래스명으로 조회할 수 있다.', () => {
    const cache = new Cache();
    const elem = factory.createElement();
    cache.set(elem);
    expect(cache.getByClassName('test')[0].text).toEqual('Hello, World');
  });

  it('캐시에 저장한 엘리먼트를 아이디로 조회할 수 있다.', () => {
    const cache = new Cache();
    const elem = factory.createElement();
    cache.set(elem);
    expect(cache.getById('logic')[0].text).toEqual('Hello, World');
  });

  it('캐시에 저장한 엘리먼트를 태그명으로 조회할 수 있다.', () => {
    const cache = new Cache();
    const elem = factory.createElement();
    cache.set(elem);
    expect(cache.getByTagName('div')[0].text).toEqual('Hello, World');
  });
});
