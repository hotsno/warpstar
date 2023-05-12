<script lang="ts">
  import { selectedBanner } from '../../stores';

  export let bannerName = '';
  function buttonClicked() {
    selectedBanner.set(bannerName);
  }
</script>

<li class="banner" on:click={buttonClicked} on:keypress={buttonClicked}>
  <button class={$selectedBanner == bannerName ? 'selected' : ''}> {bannerName} </button>
</li>

<style>
  .banner {
    display: inline-block;
    padding-left: 5px;
  }

  button {
    border: 0;
    padding: 10px 20px;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    background-color: #333;
  }

  button.selected {
    background-color: #3b9fd1;
  }

  button:hover {
    filter: brightness(0.9);
  }
</style>
