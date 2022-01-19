import axios from 'axios';
import { ApplicationConfig } from '../infra/ApplicationConfig';
import { ResponseAlbumDetail, ResponseMusicDetail, ResponseMusicDto } from '../dto/RepositoryResponse.dto';
import ResponseMusicDTOFactory from '../dto/ResponseMusicDTOFactory';
import {ScrapRepository} from "./AbstractScrapRepository";

export class GenieRepository implements ScrapRepository {
  async getAlbumDetail(musics: ResponseMusicDetail[]): Promise<ResponseAlbumDetail[]> {
    return this.getGenieAlbumHtml(musics);
  }

  async getTop100List(url?: string): Promise<ResponseMusicDetail[]> {
    const result = await this.getGenieHtml();
    return ResponseMusicDTOFactory.createGenieResponseMusicList(result[0], result[1]);
  }

  async getMusicList(musics : ResponseMusicDetail[], albums: ResponseAlbumDetail[]): Promise<ResponseMusicDto[]> {
    return ResponseMusicDTOFactory.createResponseMusicDto(musics, albums);
  }

  private getGenieHtml(): Promise<string[]> {
    return Promise.all([axios.get(`${ApplicationConfig.GenieURL}1`)
      .then((res) => res.data), axios.get(`${ApplicationConfig.GenieURL}2`)
      .then((res) => res.data),
    ]);
  }

  private getGenieAlbumHtml(musics: ResponseMusicDetail[]): Promise<ResponseAlbumDetail[]> {
    return Promise.all(musics.map((e) => axios.get(`${ApplicationConfig.GenieInfo.albumUrl}${e.albumId}`)
      .then((res) => ResponseMusicDTOFactory.createGenieResponseAlbumDetail(res.data))));
  }
}
