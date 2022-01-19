import axios from 'axios';
import { AbstractScrapRepository } from './AbstractScrapRepository';
import { ApplicationConfig } from '../infra/ApplicationConfig';
import ResponseMusicDTOFactory from '../dto/ResponseMusicDTOFactory';
import { ResponseAlbumDetail, ResponseMusicDetail, ResponseMusicDto } from '../dto/RepositoryResponse.dto';

export class VibeRepository extends AbstractScrapRepository {
  async getMusicList(): Promise<ResponseMusicDto[]> {
    const musics = await this.getTop100List();
    const albums = await this.getAlbumDetail(musics);
    return ResponseMusicDTOFactory.createResponseMusicDto(musics, albums);
  }

  async getTop100List(): Promise<ResponseMusicDetail[]> {
    const result = await axios.get(ApplicationConfig.VibeURL);
    return ResponseMusicDTOFactory.createVibeResponseMusicList(result);
  }

  async getAlbumDetail(musics: ResponseMusicDetail[]): Promise<ResponseAlbumDetail[]> {
    const result = await Promise.all(musics.map((e) => axios.get(ApplicationConfig.getVibeAlbumUrl(e.albumId))));
    return ResponseMusicDTOFactory.createVibeResponseAlbumDetail(result);
  }
}
