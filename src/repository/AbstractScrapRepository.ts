import { ResponseAlbumDetail, ResponseMusicDetail, ResponseMusicDto } from '../dto/RepositoryResponse.dto';

export interface ScrapRepository {
  getTop100List(url?: string) : Promise<ResponseMusicDetail[]>,
  getAlbumDetail(musics: ResponseMusicDetail[]) : Promise<ResponseAlbumDetail[]>,
  getMusicList(): Promise<ResponseMusicDto[]>
}



// interface abstract class 차이
//1. 하나의 규격