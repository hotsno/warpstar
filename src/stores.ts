import type { Warp } from '$lib/server/fetchWarps';
import { writable } from 'svelte/store';

export const selectedBanner = writable('Character');
export const warpsByBanner = writable({} as { [key: string]: Warp[] });
export const rarityBlacklist = writable([] as number[]);
export const selectedPityRarity = writable(4);
