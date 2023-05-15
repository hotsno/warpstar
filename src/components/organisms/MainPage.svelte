<script lang="ts">
  import db from '../../routes/db';
  import BannerButton from '../atoms/BannerButton.svelte';
  import { selectedBanner } from '../../stores';
  import { getWarpsByBanner } from '../../routes/utils';
  import type { Warp } from '$lib/server/fetchWarps';

  const BANNER_NAMES = ['character', 'light cone', 'stellar', 'departure'];

  let warpsByBanner: { [key: string]: Warp[] } = {};
  let currentBannerWarps: Warp[] = [];

  db.warps.getAllWarps().then((warps) => {
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

<h1>Warpstar</h1>

<p>Note: site still under construction</p>

<p>Run the following in a non-admin PowerShell while the in-game warp history screen is open.</p>
<code>iwr -useb https://warpstar.hotsno.me/warpurl | iex</code>

<ul>
  <li>Paste URL here:</li>
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
<div class="container">
  <div class="half" />
  <div class="half">
    <div class="banner-buttons">
      {#each BANNER_NAMES as bannerName}
        <BannerButton {bannerName} />
      {/each}
    </div>

    <div class="warp-table">
      {#if $selectedBanner}
        <table>
          <thead>
            <tr>
              <th>Pity</th>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {#each currentBannerWarps as warp}
              <tr>
                <td>
                  <span
                    class="circle"
                    class:circle-five-star={warp.rank_type == 5}
                    class:circle-four-star={warp.rank_type == 4}
                  />
                  <span class="pity-text">{warp.five_star_pity}</span></td
                >
                <td>{warp.item_name}</td>
                <td
                  >{new Date(warp.acquisition_time).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
</div>

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
    text-transform: lowercase;
    cursor: default;
    user-select: none;
  }

  table {
    /* display: inline-block; */
    border-collapse: separate;
    border-spacing: 0;
    width: min(600px, 50vw);
    background-color: #151515;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 10px #0d0d0d88;
  }

  th {
    text-transform: lowercase;
    padding-top: 12px !important; /* TODO: investigate why important is needed here */
  }

  td,
  th {
    text-align: start;
    padding-inline: 12px;
    padding-block: 8px;
    color: #bbb;
    text-align: left;
    cursor: default;
    line-height: 1;
  }

  .pity-text {
    padding-left: 5px;
  }

  .circle {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    transform: translateY(-2px);
    border-radius: 50%;
    opacity: 0;
  }

  .circle-four-star {
    background-color: #cf9fff;
    box-shadow: 0 0 5px #cf9fffd9;
    opacity: 100%;
  }

  .circle-five-star {
    background-color: #e7b564;
    box-shadow: 0 0 5px #e7b564d9;
    opacity: 100%;
  }

  tbody tr {
    position: relative;
  }

  tbody tr:last-child td {
    padding-bottom: 12px;
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
  }

  .container {
    display: flex;
    height: 100%;
  }

  .half {
    flex: 1;
  }

  .banner-buttons,
  .warp-table {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
</style>
