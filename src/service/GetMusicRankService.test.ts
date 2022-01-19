import { GetMusicRankService } from './GetMusicRankService';
import { VibeRepository } from '../repository/VibeRepository';
import { GenieRepository } from '../repository/GenieRepository';
import { MelonRepository } from '../repository/MelonRepository';

describe('음원차트 스크래핑 테스트', () => {
  it('멜론 top100을 가져 올 수 있다. ', async () => {
    const result = await new GetMusicRankService(new MelonRepository()).execute();
    expect(result.length)
      .toEqual(100);
  });

  it('지니 top100을 가져 올 수 있다. ', async () => {
    const result = await new GetMusicRankService(new GenieRepository()).execute();
    expect(result.length)
      .toEqual(100);
  });

  it('바이브 top100을 가져올 수 있다.', async () => {
    const result = await new GetMusicRankService(new VibeRepository()).execute();
    expect(result.length)
      .toEqual(100);
  });
});
