import { Cache } from '../entity/Cache';
import { ResponseMusicDetail } from './RepositoryResponse.dto';
import { ApplicationConfig } from '../infra/ApplicationConfig';
import { Element } from '../entity/Element';
import { TagError } from '../infra/error/TagError';
import { MusicServiceProvider } from '../enum/MusicServiceProvider';

class ResponseMelonMapper {
  generateMusicDetail(cache: Cache): ResponseMusicDetail[] {
    const {
      title,
      singer,
      album,
      albumNumberTag,
    } = ApplicationConfig.MelonInfo;
    const titleList = cache.getByClassName(title);
    const singerList = cache.getByClassName(singer);
    const albumList = cache.getByClassName(album);
    const albumNumbers = albumList.map((e) => this.getAlbumNumbers(e.getLastChild(), albumNumberTag));
    return titleList.map((e, i) => {
      const name = e.getLastChildNode().text;
      const singer = singerList[i].child.map((child) => child.text)
        .filter((e) => e)
        .join(',');
      const album = albumList[i].getLastChild()?.text;
      return {
        name,
        singer,
        album,
        albumId: albumNumbers[i],
      } as ResponseMusicDetail;
    });
  }

  getAlbumNumbers(elem: Element, key: string): number {
    const attr = elem.getAttributeValueByKey('href');
    if (!attr) {
      throw new TagError(MusicServiceProvider.Melon, key);
    }
    return Number(attr.replace(/[^0-9]/g, ''));
  }
}

export default new ResponseMelonMapper();
