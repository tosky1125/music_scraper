import { MelonRepository } from './MelonRepository';

describe('멜론 repo 테스트', () => {
  const repo = new MelonRepository();

  it('음원리스트와 음반정보를 가져올 수 있다.', async () => {
    const result = await repo.getMusicList();
    expect(result.length)
      .toEqual(100);
  });
});
