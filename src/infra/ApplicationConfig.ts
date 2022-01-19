export class ApplicationConfig {
  private static _MelonURL = 'https://www.melon.com/chart/index.htm';

  private static _GenieURL = 'https://www.genie.co.kr/chart/top200?pg=';

  private static _VibeURL = 'https://apis.naver.com/vibeWeb/musicapiweb/vibe/v1/chart/track/total';

  private static VibeAlbumPrefix = 'https://apis.naver.com/vibeWeb/musicapiweb/album/';

  private static VibeAlbumPostfix = '?includeDesc=true&includeIntro=true';

  private static _MelonInfo = {
    title: 'ellipsis rank01',
    singer: 'ellipsis rank02',
    album: 'ellipsis rank03',
    albumUrl: 'https://www.melon.com/album/detail.htm?albumId=',
    albumNumberTag: 'href',
  };

  private static _GenieInfo = {
    title: 'title ellipsis',
    singer: 'artist ellipsis',
    album: 'albumtitle ellipsis',
    albumUrl: 'https://www.genie.co.kr/detail/albumInfo?axnm=',
    albumNumberTag: 'onclick',
  };

  static getVibeAlbumUrl(alNo: number): string {
    return `${this.VibeAlbumPrefix}${alNo}${this.VibeAlbumPostfix}`;
  }

  static get MelonInfo(): { albumUrl: string; singer: string; albumNumberTag: string; album: string; title: string } {
    return this._MelonInfo;
  }

  static get GenieInfo(): { albumUrl: string; singer: string; albumNumberTag: string; album: string; title: string } {
    return this._GenieInfo;
  }

  static get MelonURL(): string {
    return this._MelonURL;
  }

  static get GenieURL(): string {
    return this._GenieURL;
  }

  static get VibeURL(): string {
    return this._VibeURL;
  }
}
