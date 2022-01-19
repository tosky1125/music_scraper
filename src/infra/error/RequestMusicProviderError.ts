import CustomError from "./CustomError";
import {MusicServiceProvider} from "../../enum/MusicServiceProvider";

export class RequestMusicProviderError extends  CustomError {

  constructor(prvd: MusicServiceProvider) {
    super(`${prvd}에 요청하는 중에 에러가 발생했습니다. 서비스 사업자로 확인해보세요.`);
  }
}