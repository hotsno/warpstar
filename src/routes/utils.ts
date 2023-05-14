import type { DBWarp, Warp } from '$lib/server/fetchWarps';

function dbWarpsToWarps(dbWarps: DBWarp[]) {
  const warps: Warp[] = [];
  for (const dbWarp of dbWarps) {
    warps.push({
      ...dbWarp,
      pull_number: -1,
      four_star_pity: -1,
      five_star_pity: -1
    });
  }
  return warps;
}

export function getWarpsByBanner(dbWarps: DBWarp[]) {
  const warps = dbWarpsToWarps(dbWarps);
  warps.sort((a, b) => b.pull_id - a.pull_id); // most recent to oldest

  const warpsByBanner: { [key: string]: Warp[] } = {};
  for (const warp of warps) {
    if (warpsByBanner[warp.banner_name]) {
      warpsByBanner[warp.banner_name].push(warp);
    } else {
      warpsByBanner[warp.banner_name] = [warp];
    }
  }

  for (const bannerName in warpsByBanner) {
    const warps = warpsByBanner[bannerName];
    let pullNumber = 0;
    let fourStarPity = 0;
    let fiveStarPity = 0;
    [...warps].reverse().forEach((warp) => {
      if (warp.rank_type === 4) {
        fourStarPity = 0;
        fiveStarPity++;
      } else if (warp.rank_type === 5) {
        fiveStarPity = 0;
      } else {
        fourStarPity++;
        fiveStarPity++;
      }
      pullNumber++;
      warp.pull_number = pullNumber;
      warp.four_star_pity = fourStarPity;
      warp.five_star_pity = fiveStarPity;
    });
  }
  return warpsByBanner;
}
