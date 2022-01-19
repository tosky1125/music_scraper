import { MergeMusicRankService } from "./service/MergeMusicRankService";
import { MusicServiceProvider } from "./enum/MusicServiceProvider";

describe("Merge Test", () => {
  const service = new MergeMusicRankService([MusicServiceProvider.Vibe, MusicServiceProvider.Genie, MusicServiceProvider.Melon]);
  it("음원 사업자 별 top100이 조회 되어야 합니다.", async () => {
    const result = await service.execute();
    const keys = Object.keys(result);
    expect(keys.length).toBe(3);
    expect(result[MusicServiceProvider.Genie].length).toBe(100)
    expect(result[MusicServiceProvider.Vibe].length).toBe(100)
    expect(result[MusicServiceProvider.Melon].length).toBe(100)
  })
})