import CustomError from './CustomError';

export class HTMLInputError extends CustomError {
  constructor() {
    super('HTML 태그는 필수로 전달되어야 합니다');
  }
}
