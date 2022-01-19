import { VibeRepository } from './VibeRepository';

describe('Vibe repo 테스트', () => {
  const repo = new VibeRepository();
  it('음원리스트와 음반정보를 가져올 수 있다.', async () => {
    const result = await repo.getMusicList();
    expect(result.length)
      .toEqual(100);
  });
});
