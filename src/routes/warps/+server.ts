import { json } from '@sveltejs/kit';
import * as utils from '$lib/server/fetchWarps.js';
import type { DBWarp } from '$lib/server/fetchWarps.js';

export async function POST({ request }) {
  const { url } = await request.json();

  const warps: DBWarp[] = await utils.getAllWarps(url);
  return json(warps, { status: 201 });
}
