import CustomError from './CustomError';

export class HTMLParsingError extends CustomError {
  constructor() {
    super('태그를 파싱하는데 문제가 발생했습니다. 태그 여닫기가 올바른지 확인해주세요.');
  }
}
