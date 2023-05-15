<script lang="ts">
  import { getOverallAvgPity, getBannerAvgPity, getCurPity } from '../../routes/utils';
  import { selectedBanner, warpsByBanner } from '../../stores';

  $: if ($warpsByBanner) {
  }
</script>

{#if Object.keys($warpsByBanner).length !== 0}
  <!-- TODO: fix this ugliness ^ -->
  <div class="stats">
    <!-- TODO: stop using so many divs -->
    <div>
      <div class="overall-stats">
        <h2>Overall stats</h2>
        <ul>
          <li><span>Avg 5 star pity</span> <span>{getOverallAvgPity(5, $warpsByBanner)}</span></li>
          <li><span>Avg 4 star pity</span> <span>{getOverallAvgPity(4, $warpsByBanner)}</span></li>
        </ul>
      </div>
      <div class="banner-stats">
        <h2>Banner stats</h2>
        <ul>
          <li>
            <span>5 star pity</span>
            <span>{getCurPity(5, $warpsByBanner, $selectedBanner)}/90</span>
          </li>
          <li>
            <span>4 star pity</span>
            <span>{getCurPity(4, $warpsByBanner, $selectedBanner)}/10</span>
          </li>
          <li>
            <span>Avg 5 star pity</span>
            <span>{getBannerAvgPity(5, $warpsByBanner, $selectedBanner)}</span>
          </li>
          <li>
            <span>Avg 4 star pity</span>
            <span>{getBannerAvgPity(4, $warpsByBanner, $selectedBanner)}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
{/if}

<style>
  * {
    font-family: 'JetBrains Mono';
  }

  .stats {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  ul {
    padding: 0;
    overflow-x: hidden;
    list-style: none;
    width: min(450px, 80vw);
    font-family: 'JetBrains Mono';
  }
  ul li:before {
    float: left;
    width: 0;
    white-space: nowrap;
    content: '..........................................................................';
  }
  ul span:first-child {
    padding-right: 0.4em;
    background: #111;
  }
  ul span + span {
    float: right;
    padding-left: 0.33em;
    background: #111;
  }
</style>
