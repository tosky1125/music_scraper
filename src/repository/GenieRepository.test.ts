import { GenieRepository } from './GenieRepository';

describe('지니 repo 테스트', () => {
  const repo = new GenieRepository();
  it('음원리스트와 음반정보를 가져올 수 있다.', async () => {
    const result = await repo.getMusicList();
    expect(result.length)
      .toEqual(100);
  });
});
