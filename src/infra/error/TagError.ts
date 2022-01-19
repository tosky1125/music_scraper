import CustomError from './CustomError';
import { MusicServiceProvider } from '../../enum/MusicServiceProvider';

export class TagError extends CustomError {
  constructor(prvd: MusicServiceProvider, tag:string) {
    super(`${prvd} 대상 ${tag} 스크래핑 도중에러가 발생했습니다. 페이지에 변화가 있는지 확인하세요.`);
  }
}
