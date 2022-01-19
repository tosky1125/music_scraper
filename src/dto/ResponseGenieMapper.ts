import { Cache } from '../entity/Cache';
import { ResponseMusicDetail } from './RepositoryResponse.dto';
import { ApplicationConfig } from '../infra/ApplicationConfig';
import { Element } from '../entity/Element';
import { TagError } from '../infra/error/TagError';
import { MusicServiceProvider } from '../enum/MusicServiceProvider';

class ResponseGenieMapper {
  generateMusicDetail(cache: Cache): ResponseMusicDetail[] {
    const {
      title,
      singer,
      album,
      albumNumberTag,
    } = ApplicationConfig.GenieInfo;

    const titleList = cache.getByClassName(title);
    const singerList = cache.getByClassName(singer);
    const albumList = cache.getByClassName(album);
    const albumNumbers = albumList.map((e) => this.getAlbumNumbers(e, albumNumberTag));

    return titleList.map((e, i) => {
      const name = e.text;
      const singer = singerList[i].text;
      const album = albumList[i].text;
      return {
        name,
        singer,
        album,
        albumId: albumNumbers[i],
      } as ResponseMusicDetail;
    });
  }

  getAlbumNumbers(elem: Element, key: string): number {
    const attr = elem.getAttributeValueByKey(key);
    if (!attr) {
      throw new TagError(MusicServiceProvider.Genie, key);
    }
    return Number(attr.replace(/[^0-9]/g, ''));
  }
}

export default new ResponseGenieMapper();
