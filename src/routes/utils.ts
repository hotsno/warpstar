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
      fourStarPity++;
      fiveStarPity++;
      pullNumber++;
      warp.pull_number = pullNumber;
      warp.four_star_pity = fourStarPity;
      warp.five_star_pity = fiveStarPity;
      if (warp.rank_type === 4) {
        fourStarPity = 0;
      } else if (warp.rank_type === 5) {
        fiveStarPity = 0;
      }
    });
  }
  return warpsByBanner;
}

export function getOverallAvgPity(stars: number, warpsByBanner: { [key: string]: Warp[] }): string {
  const pities = [];
  if (!warpsByBanner || Object.keys(warpsByBanner).length === 0) {
    return 'N/A';
  }
  for (const banner in warpsByBanner) {
    for (const [i, warp] of warpsByBanner[banner].entries()) {
      if (stars == 5 && warp.rank_type === 5) {
        if (banner === 'departure' && i === 0) {
          continue; // Not counting beginner banner guaranteed 5 star
        }
        pities.push(warp.five_star_pity);
      }
      if (stars == 4 && warp.rank_type === 4) {
        pities.push(warp.four_star_pity);
      }
    }
  }
  if (pities.length != 0) {
    return (Math.round((pities.reduce((a, b) => a + b) / pities.length) * 10) / 10).toString();
  }
  return 'N/A';
}

export function getBannerAvgPity(
  stars: number,
  warpsByBanner: { [key: string]: Warp[] },
  banner: string
) {
  const pities = [];
  const bannerAlt = banner.toLowerCase().replace(/ /g, '_');
  if (!warpsByBanner || !warpsByBanner[bannerAlt] || warpsByBanner[bannerAlt].length === 0) {
    return 'N/A';
  }
  for (const [i, warp] of warpsByBanner[bannerAlt].entries()) {
    if (stars == 5 && warp.rank_type === 5) {
      if (bannerAlt === 'departure' && i === 0) {
        continue; // Not counting beginner banner guaranteed 5 star
      }
      pities.push(warp.five_star_pity);
    }
    if (stars == 4 && warp.rank_type === 4) {
      pities.push(warp.four_star_pity);
    }
  }
  if (pities.length != 0) {
    return (Math.round((pities.reduce((a, b) => a + b) / pities.length) * 10) / 10).toString();
  }
  return 'N/A';
}

export function getCurPity(
  stars: number,
  warpsByBanner: { [key: string]: Warp[] },
  banner: string
): string {
  const bannerAlt = banner.toLowerCase().replace(/ /g, '_');
  if (!warpsByBanner || !warpsByBanner[bannerAlt] || warpsByBanner[bannerAlt].length === 0) {
    return 'N/A';
  }
  let res = '';
  if (warpsByBanner[bannerAlt][0].rank_type === stars) {
    res = '0';
  }
  if (stars == 4) {
    if (res.length === 0) {
      res += warpsByBanner[bannerAlt][0].four_star_pity.toString();
    }
    res += '/10';
  } else if (stars == 5) {
    if (res.length === 0) {
      res += warpsByBanner[bannerAlt][0].five_star_pity.toString();
    }
    if (bannerAlt === 'departure') {
      res += '/50';
    } else if (bannerAlt === 'light_cone') {
      res += '/80';
    } else {
      res += '/90';
    }
  }
  return res;
}

export function getBannerRarityCount(
  stars: number,
  warpsByBanner: { [key: string]: Warp[] },
  banner: string
): number {
  const bannerAlt = banner.toLowerCase().replace(/ /g, '_');
  if (!warpsByBanner || !warpsByBanner[bannerAlt] || warpsByBanner[bannerAlt].length === 0) {
    return 0;
  }
  let res = 0;
  for (const warp of warpsByBanner[bannerAlt]) {
    res = warp.rank_type === stars ? res + 1 : res;
  }
  return res;
}

export function getTotalRarityCount(
  stars: number,
  warpsByBanner: { [key: string]: Warp[] }
): number {
  if (!warpsByBanner) {
    return 0;
  }
  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure']; // TODO: reuse
  let res = 0;
  for (const bannerName of BANNER_NAMES) {
    res += getBannerRarityCount(stars, warpsByBanner, bannerName);
  }
  return res;
}
