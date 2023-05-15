<script lang="ts">
  import { getOverallAvgPity, getBannerAvgPity, getCurPity } from '../../routes/utils';
  import { selectedBanner, warpsByBanner } from '../../stores';
</script>

<div class="stats">
  <!-- TODO: stop using so many divs -->
  <div>
    <div class="overall-stats">
      <h2>Overall stats</h2>
      <div class="stats-list-wrapper">
        <ul>
          <li>
            <span>Avg 5 star pity</span> <span>{getOverallAvgPity(5, $warpsByBanner)}</span>
          </li>
          <li>
            <span>Avg 4 star pity</span> <span>{getOverallAvgPity(4, $warpsByBanner)}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner-stats">
      <h2>Banner stats</h2>
      <div class="stats-list-wrapper">
        <ul>
          <li>
            <span>5 star pity</span>
            <span>{getCurPity(5, $warpsByBanner, $selectedBanner)}</span>
          </li>
          <li>
            <span>4 star pity</span>
            <span>{getCurPity(4, $warpsByBanner, $selectedBanner)}</span>
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
</div>

<style>
  * {
    font-family: 'JetBrains Mono';
  }

  .stats {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  .stats-list-wrapper {
    padding: 20px;
    background-color: #151515;
    border-radius: 20px;
    font-family: 'JetBrains Mono';
    box-shadow: 0px 0px 10px 10px #0d0d0d88;
  }

  ul {
    overflow-x: hidden;
    list-style: none;
    width: min(450px, 80vw);
    margin: 0;
    padding: 0;
  }
  ul li:before {
    float: left;
    width: 0;
    white-space: nowrap;
    content: '..........................................................................';
  }
  ul span:first-child {
    padding-right: 0.4em;
    background: #151515;
  }
  ul span + span {
    float: right;
    padding-left: 0.33em;
    background: #151515;
  }

  li {
    color: #bbb;
  }
</style>
