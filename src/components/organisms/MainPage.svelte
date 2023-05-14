<script lang="ts">
  import db from '../../routes/db';
  import BannerButton from '../atoms/BannerButton.svelte';
  import { selectedBanner } from '../../stores';
  import { getWarpsByBanner } from '../../routes/utils';
  import type { Warp } from '$lib/server/fetchWarps';

  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure'];

  let warpsByBanner: { [key: string]: Warp[] } = {};
  let currentBannerWarps: Warp[] = [];

  db.warps.getAllWarps().then((warps) => {
    console.log(warps);
    // console.log('hi');
    warpsByBanner = getWarpsByBanner(warps);
  });

  // TODO: fix this ugliness
  let selectedBannerAlt = '';
  $: selectedBannerAlt = $selectedBanner.toLowerCase().replace(/ /g, '_');
  $: if (warpsByBanner[selectedBannerAlt]) {
    currentBannerWarps = warpsByBanner[selectedBannerAlt];
  } else {
    currentBannerWarps = [];
  }
</script>

<h1>warpstar</h1>

<p>(Better UI and more coming soon)</p>

<p>Run the following in a non-admin PowerShell while the in-game warp history screen is open.</p>
<code>iwr -useb https://warpstar.hotsno.me/warpurl | iex</code>

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
  {#each BANNER_NAMES as bannerName}
    <BannerButton {bannerName} />
  {/each}
</ul>

{#if $selectedBanner}
  <table>
    <thead>
      <tr>
        <th>Pity</th>
        <th>Item</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {#each currentBannerWarps as warp}
        <tr>
          <td>{warp.five_star_pity}</td>
          <td>{warp.item_name}</td>
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

  h1 {
    margin-top: 0;
  }

  th {
    text-align: start;
  }

  td,
  th {
    padding-inline: 5px;
  }

  /* table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    max-width: 600px;
    background-color: #111;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #000;
  }

  td,
  th {
    padding: 8px;
    color: #fff;
    text-align: left;
  }

  tbody tr {
    position: relative;
  }

  tbody tr:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 2%;
    right: 2%;
    bottom: -1px;
    width: 96%;
    height: 2px;
    background-color: #222;
    border-radius: 1px;
  } */
</style>
