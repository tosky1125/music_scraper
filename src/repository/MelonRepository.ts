import axios from 'axios';
import { AbstractScrapRepository } from './AbstractScrapRepository';
import { ApplicationConfig } from '../infra/ApplicationConfig';
import ResponseMusicDTOFactory from '../dto/ResponseMusicDTOFactory';
import { ResponseAlbumDetail, ResponseMusicDetail, ResponseMusicDto } from '../dto/RepositoryResponse.dto';

export class MelonRepository extends AbstractScrapRepository {
  async getAlbumDetail(musics: ResponseMusicDetail[]): Promise<ResponseAlbumDetail[]> {
    return Promise.all(musics.map((e) => axios.get(`${ApplicationConfig.MelonInfo.albumUrl}${e.albumId}`)
      .then((res) => ResponseMusicDTOFactory.createMelonResponseAlbumDetail(res.data))));
  }

  async getTop100List(url?: string): Promise<ResponseMusicDetail[]> {
    const { data } = await axios.get(ApplicationConfig.MelonURL);
    return ResponseMusicDTOFactory.createMelonResponseMusicList(data);
  }

  async getMusicList(): Promise<ResponseMusicDto[]> {
    const musics = await this.getTop100List();
    const albums = await this.getAlbumDetail(musics);
    return ResponseMusicDTOFactory.createResponseMusicDto(musics, albums);
  }
}
