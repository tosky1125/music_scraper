import ElementBuilder from './ElementBuilder';

describe('elem builder test', () => {
  const builder = ElementBuilder;
  it('태그만 주어지는 경우에는 태그만 존재하는 element 객체가 리턴되어야 한다.', () => {
    const tag = '<div>';
    const result = builder.get(tag);
    expect(result.tagName).toEqual('div');
  });

  it('태그와 attribute가 같이 주어지는 경우에는 분리해서 파싱해야 한다.', () => {
    const tag = '<button type="button" title="다운로드" class="button_icons download">';
    const result = builder.get(tag);
    expect(result.tagName).toEqual('button');
    expect(result.getAttributeValueByKey('type')).toEqual('button');
    expect(result.getAttributeValueByKey('title')).toEqual('다운로드');
    expect(result.getAttributeValueByKey('class')).toEqual('button_icons download');
  });

  it('닫는 태그가 입력된 경우 생성되는 element는 닫기 용이어야 한다.', () => {
    const tag = '</div>';
    const result = builder.get(tag);
    expect(result.isForClosing).toBeTruthy();
  });

  it('nonClosing 태그의 경우에는 selfclosing 값이 참이어야 한다.', () => {
    const tag = '<br/>';
    const result = builder.get(tag);
    expect(result.isSelfClosing).toBeTruthy();
  });
});
