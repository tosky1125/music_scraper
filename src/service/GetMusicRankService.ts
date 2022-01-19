import {Music} from '../interface/Music';
import {AbstractScrapRepository} from '../repository/AbstractScrapRepository';
import {RequestMusicProviderError} from "../infra/error/RequestMusicProviderError";
import {MusicServiceProvider} from "../enum/MusicServiceProvider";
import {MelonRepository} from "../repository/MelonRepository";
import {GenieRepository} from "../repository/GenieRepository";
import {VibeRepository} from "../repository/VibeRepository";
import {HTMLInputError} from "../infra/error/HTMLInputError";
import Logger from "../infra/Logger";
import {HTMLParsingError} from "../infra/error/HTMLParsingError";
import {TagError} from "../infra/error/TagError";
import {AbstractLogger} from "../infra/AbstractLogger";

export class GetMusicRankService {
  constructor(
    private readonly repo: AbstractScrapRepository,
  logger: AbstractLogger
  ) {
  }

  async execute(): Promise<Music[]> {
    let musics;
    try {
      const [list, albums] = await Promise.all([this.repo.getTop200, this.repo])
      musics = await this.repo.getMusicList();
      Logger.log(`${this.getPrvd()}의 음원 순위 정보 조회가 완료되었습니다.`)
    } catch (e) {
      Logger.err(e)
      if(e instanceof HTMLInputError || e instanceof HTMLParsingError || e instanceof TagError){
        throw e;
      } else {
        throw new RequestMusicProviderError(this.getPrvd())
      }
    }
    return musics.map((e) => {
      const {
        albumId,
        ...dto
      } = e;
      return dto as Music;
    });
  }

  private getPrvd(): MusicServiceProvider {
    if (this.repo instanceof MelonRepository) {
      return MusicServiceProvider.Melon;
    }
    if (this.repo instanceof GenieRepository) {
      return MusicServiceProvider.Genie;
    }
    if (this.repo instanceof VibeRepository) {
      return MusicServiceProvider.Vibe
    }
  }
}
