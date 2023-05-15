<script lang="ts">
  import { selectedBanner } from '../../stores';
  import type { Warp } from '$lib/server/fetchWarps';
  import { warpsByBanner } from '../../stores';

  let currentBannerWarps: Warp[] = [];

  // TODO: fix this ugliness
  let selectedBannerAlt = '';
  $: selectedBannerAlt = $selectedBanner.toLowerCase().replace(/ /g, '_');
  $: if ($warpsByBanner[selectedBannerAlt]) {
    currentBannerWarps = $warpsByBanner[selectedBannerAlt];
  } else {
    currentBannerWarps = [];
  }
</script>

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
              <span class="pity-text">{warp.four_star_pity}</span></td
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

<style>
  table {
    /* display: inline-block; */
    border-collapse: separate;
    border-spacing: 0;
    width: 600px;
    background-color: #151515;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 10px #0d0d0d88;
    table-layout: auto;
  }

  @media (min-width: 1200px) {
    table {
      width: min(600px, 40vw);
    }
  }

  th {
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

  .warp-table {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
</style>
