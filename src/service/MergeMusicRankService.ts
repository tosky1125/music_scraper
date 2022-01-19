import {MusicServiceProvider} from '../enum/MusicServiceProvider';
import {AbstractScrapRepository} from '../repository/AbstractScrapRepository';
import {GenieRepository} from '../repository/GenieRepository';
import {MelonRepository} from '../repository/MelonRepository';
import {VibeRepository} from '../repository/VibeRepository';
import {GetMusicRankDto} from '../dto/GetMusicRank.dto';
import {GetMusicRankService} from './GetMusicRankService';
import {AbstractLogger} from "../infra/AbstractLogger";
import Logger from "../infra/Logger";
import {TestLogger} from "../infra/TestLogger";

export class MergeMusicRankService {
  constructor(
    private readonly providerList: MusicServiceProvider[],
  ) {
  }

  async execute(): Promise<GetMusicRankDto> {
    const result = await Promise.all(this.providerList.map((e) => {
      const repo = this.convertProviderToRepository(e);
      const logger = this.getLogger('a')
      return new GetMusicRankService(repo, logger).execute();
    }));
    const dict = {};
    this.providerList.forEach((e, i) => {
      // @ts-ignore
      dict[e] = result[i];
    });
    return dict as GetMusicRankDto;
  }


  getLogger(flag: string): AbstractLogger {
    switch (flag) {
      case 'a':
        return new Logger();
      default :
        return new TestLogger()
    }
  }

  convertProviderToRepository(prvd: MusicServiceProvider): AbstractScrapRepository {
    switch (prvd) {
      case MusicServiceProvider.Genie:
        return new GenieRepository();
      case MusicServiceProvider.Melon:
        return new MelonRepository();
      case MusicServiceProvider.Vibe:
        return new VibeRepository();
      default:
        return new VibeRepository();
    }
  }
}
