const SLEEP_TIME = 100;
const BANNERS: [number, string][] = [
  [1, 'stellar'],
  [2, 'departure'],
  [11, 'character'],
  [12, 'light_cone']
];

export type Warp = {
  item_name: string;
  item_id: number;
  pull_id: number;
  banner_name: string;
  acquisition_time: string;
  rank_type: number;
  pull_number: number;
  four_star_pity: number;
  five_star_pity: number;
};

export type DBWarp = {
  item_name: string;
  item_id: number;
  pull_id: number;
  banner_name: string;
  acquisition_time: string;
  rank_type: number;
};

type APIWarp = {
  name: string;
  item_id: number;
  id: number;
  time: string;
  rank_type: number;
};

export async function getAllWarps(url: string) {
  const warps: DBWarp[] = [];

  for (let i = 0; i < BANNERS.length; i++) {
    const bannerId: number = BANNERS[i][0];
    const bannerName: string = BANNERS[i][1];
    let endPullId;

    let noMoreWarps = false;
    while (!noMoreWarps) {
      const curWarps: DBWarp[] = [];

      await fetch(
        `${url}/&gacha_type=${bannerId}&size=20${endPullId ? '&end_id=' + endPullId : ''}`
      )
        .then((response) => response.json())
        .then((json) => {
          json.data.list.forEach((warp: APIWarp) => {
            curWarps.push({
              item_name: warp.name,
              item_id: warp.item_id,
              pull_id: warp.id,
              acquisition_time: warp.time,
              rank_type: warp.rank_type,
              banner_name: bannerName
            });
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });

      if (curWarps.length === 0) {
        if (i < BANNERS.length - 1) {
          await sleep(SLEEP_TIME);
        }
        noMoreWarps = true;
      } else {
        endPullId = curWarps[curWarps.length - 1].pull_id;
        warps.push(...curWarps);
        await sleep(SLEEP_TIME);
      }
    }
  }
  return warps;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
