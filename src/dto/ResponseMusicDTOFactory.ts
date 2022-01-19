import ResponseGenieMapper from './ResponseGenieMapper';
import ResponseMelonMapper from './ResponseMelonMapper';
import {Parser} from '../infra/core/Parser';
import {ResponseAlbumDetail, ResponseMusicDetail, ResponseMusicDto} from './RepositoryResponse.dto';

class ResponseMusicDTOFactory {
  createVibeResponseMusicList(rows: Record<string, any>): ResponseMusicDetail[] {
    return rows.data.response.result.chart.items.tracks.map((e) => ({
      name: e.trackTitle,
      album: e.album.albumTitle,
      albumId: e.album.albumId,
      singer: e.artists[0].artistName,
    } as ResponseMusicDetail));
  }

  createVibeResponseAlbumDetail(albumLists: Record<string, any>[]): ResponseAlbumDetail[] {
    return albumLists.map((e) => {
      const {
        agencyName,
        productionName,
      } = e.data.response.result.album;
      return {
        agency: agencyName,
        publisher: productionName,
      } as ResponseAlbumDetail;
    });
  }

  createGenieResponseMusicList(page1: string, page2: string): ResponseMusicDetail[] {
    const listToFifty = new Parser(page1).execute().cache;
    const listToHundred = new Parser(page2).execute().cache;
    const mappedListsToFifty = ResponseGenieMapper.generateMusicDetail(listToFifty);
    const mappedListsToHundred = ResponseGenieMapper.generateMusicDetail(listToHundred);
    return mappedListsToFifty.concat(mappedListsToHundred);
  }

  createGenieResponseAlbumDetail(html: string): ResponseAlbumDetail {
    const albumCache = new Parser(html, 'body').execute().cache;
    const result = albumCache.getByClassName('info-data');
    return {
      publisher: result[0].child[2].getLastChild().text,
      agency: result[0].child[3].getLastChild().text,
    } as ResponseAlbumDetail;
  }

  createResponseMusicDto(music: ResponseMusicDetail[], albumLists: ResponseAlbumDetail[]): ResponseMusicDto[] {
    return music.map((e, i) => ({
      ...e,
      ...albumLists[i],
    } as ResponseMusicDto));
  }

  createMelonResponseMusicList(html: string): ResponseMusicDetail[] {
    const listToHundred = new Parser(html).execute().cache;
    return ResponseMelonMapper.generateMusicDetail(listToHundred);
  }

  createMelonResponseAlbumDetail(html: string): ResponseAlbumDetail {
    const albumCache = new Parser(html, 'body').execute().cache;
    const result = albumCache.getByTagName('dd');
    return {
      publisher: result[2].text,
      agency: result[3].text,
    } as ResponseAlbumDetail;
  }
}

export default new ResponseMusicDTOFactory();
