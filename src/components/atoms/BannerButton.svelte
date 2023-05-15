<script lang="ts">
  import { selectedBanner } from '../../stores';

  export let bannerName = '';
  function buttonClicked() {
    selectedBanner.set(bannerName);
  }
</script>

<div class="banner" on:click={buttonClicked} on:keypress={buttonClicked}>
  <button class={$selectedBanner == bannerName ? 'selected' : ''}> {bannerName} </button>
</div>

<style>
  .banner {
    display: inline-block;
    padding-right: 5px;
    padding-block: 5px;
  }

  button {
    border: 0;
    padding: 7px 12px;
    font-size: 1rem;
    text-align: center;
    color: #ddd;
    border-radius: 5px;
    background-color: #22222200;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  button:hover,
  button.selected {
    background-color: #222;
    color: #eee;
  }

  button:active {
    transform: scale(0.95);
  }

  /* button:hover {
    filter: brightness(0.9);
  } */
</style>
