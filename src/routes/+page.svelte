<script lang="ts">
  import BannerButton from '../components/atoms/BannerButton.svelte';
  import db from './db';
  import { selectedBanner } from '../stores';
  import { getWarpsByBanner } from './utils';
  import type { Warp } from '$lib/server/fetchWarps';

  const BANNERS = ['Character', 'Light Cone', 'Stellar', 'Departure'];
  let warpsByBanner: { [key: string]: Warp[] } = {};
  let currentBannerWarps: Warp[] = [];

  db.checkIfSignedIn().then((value) => {
    if (!value) {
      db.signIn();
    }
  });

  db.warps.getAllWarps().then((warps) => {
    warpsByBanner = getWarpsByBanner(warps);
  });

  $: if (warpsByBanner[$selectedBanner.toLowerCase().replace(/ /g, '_')]) {
    currentBannerWarps = warpsByBanner[$selectedBanner.toLowerCase().replace(/ /g, '_')];
  }
</script>

<h1>warpstar</h1>

<p>Run the following in non-admin Powershell while the in-game warp history screen is open.</p>
<code>iwr -useb https://warpstar.vercel.app/warpurl | iex</code>

<ul>
  <li><p>Paste URL here:</p></li>
  <li>
    <input
      type="text"
      autocomplete="off"
      on:keydown={async (e) => {
        if (e.key === 'Enter') {
          const input = e.currentTarget;
          const url = input.value;
          input.value = '';

          const response = await fetch('/warps', {
            method: 'POST',
            body: JSON.stringify({ url }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          let warps = await response.json();
          warpsByBanner = getWarpsByBanner(warps);
          db.warps.add(warps);
        }
      }}
    />
  </li>
</ul>

<ul>
  {#each BANNERS as bannerName}
    <BannerButton {bannerName} />
  {/each}
</ul>

{#if $selectedBanner}
  <table>
    <thead>
      <tr>
        <th>roll</th>
        <th>item</th>
        <th>4* pity</th>
        <th>5* pity</th>
        <th>time</th>
      </tr>
    </thead>
    <tbody>
      {#each currentBannerWarps as warp}
        <tr>
          <td>{warp.pull_number}</td>
          <td>{warp.item_name}</td>
          <td>{warp.four_star_pity}</td>
          <td>{warp.five_star_pity}</td>
          <td>{warp.acquisition_time}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  li {
    display: inline-block;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
</style>
