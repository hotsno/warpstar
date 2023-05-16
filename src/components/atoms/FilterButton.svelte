<script lang="ts">
  import { rarityBlacklist } from '../../stores';

  export let rarity: number;
  function buttonClicked() {
    if ($rarityBlacklist.includes(rarity)) {
      rarityBlacklist.set($rarityBlacklist.filter((item) => item !== rarity));
    } else {
      rarityBlacklist.set([...$rarityBlacklist, rarity]);
    }
  }
</script>

<div class="banner" on:click={buttonClicked} on:keypress={buttonClicked}>
  <button class={$rarityBlacklist.includes(rarity) ? '' : 'selected'}>
    {#if rarity === 3}
      <span class="circle circle-three-star" />
    {:else if rarity === 4}
      <span class="circle circle-four-star" />
    {:else}
      <span class="circle circle-five-star" />
    {/if}
  </button>
</div>

<style>
  .banner {
    display: inline-block;
    padding-right: 5px;
    padding-block: 5px;
  }

  button {
    border: 0;
    padding: 2px 10px;
    font-size: 1rem;
    text-align: center;
    border-radius: 5px;
    background-color: #22222200;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  button:hover {
    background-color: #222;
  }

  button:hover > span {
    filter: grayscale(0);
    -webkit-filter: grayscale(0);
  }

  :not(.selected) > span {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }

  button:active {
    transform: scale(0.95);
  }

  .circle {
    display: inline-block;
    vertical-align: middle;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0;
  }

  .circle-three-star {
    background-color: #40bdd6;
    box-shadow: 0 0 5px #40bdd6d9;
    opacity: 100%;
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
</style>
