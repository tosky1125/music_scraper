import { MergeMusicRankService } from './MergeMusicRankService';
import { MusicServiceProvider } from '../enum/MusicServiceProvider';

describe('음원 순위 통합 조회 테스트', () => {
  const service = new MergeMusicRankService([MusicServiceProvider.Melon, MusicServiceProvider.Genie, MusicServiceProvider.Vibe]);
  it('통합 순위 조회 시 각각 10개의 결과가 존재해야 한다.', async () => {
    const result = await service.execute();
    expect(result.genie.length).toBe(100);
    expect(result.vibe.length).toBe(100);
    expect(result.melon.length).toBe(100);
  });
});
