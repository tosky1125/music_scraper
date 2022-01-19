export interface ResponseMusicDto extends ResponseMusicDetail{
  publisher: string;
  agency: string;
}

export interface ResponseMusicDetail {
  name: string;
  singer: string;
  album: string;
  albumId: number;
}

export interface ResponseAlbumDetail {
  publisher: string;
  agency: string;
}