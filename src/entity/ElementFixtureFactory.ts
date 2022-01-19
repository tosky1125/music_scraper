import { Element } from './Element';

class ElementFixtureFactory {
  createElement(): Element {
    const elem = new Element();
    elem.tagName = 'div';
    elem.attribute = { class: 'test', id: 'logic' };
    elem.text = 'Hello, World';
    return elem;
  }
}
export default new ElementFixtureFactory();
