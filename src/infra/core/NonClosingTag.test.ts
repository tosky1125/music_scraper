import NonClosingTag from './NonClosingTag';

describe('nonClosingTag test', () => {
  test.each(
    [
      ['area', true],
      ['base', true],
      ['br', true],
      ['col', true],
      ['command', true],
      ['embed', true],
      ['hr', true],
      ['img', true],
      ['input', true],
      ['link', true],
      ['meta', true],
      ['param', true],
      ['source', true],
      ['div', false],
      ['body', false],
    ],
  )('%s가 페어가 아닌 혼자서도 closing이 가능한 태그인지에 태스트 결과는 %s이어야 한다.', (input, expected) => {
    expect(NonClosingTag.check(input)).toEqual(expected);
  });
});
