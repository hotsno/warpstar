<script lang="ts">
  import db from '../../routes/db';
  import BannerButton from '../atoms/BannerButton.svelte';
  import Modal from '../molecules/Modal.svelte';
  import WarpTable from '../molecules/WarpTable.svelte';
  import { getWarpsByBanner, getOverallAvgPity } from '../../routes/utils';
  import { warpsByBanner } from '../../stores';
  import NavbarButton from '../atoms/NavbarButton.svelte';
  import Stats from '../molecules/Stats.svelte';
  import FilterButton from '../atoms/FilterButton.svelte';

  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure'];
  const RARITIES = [3, 4, 5];

  async function signOutAndReload() {
    await db.signOut();
    window.location.reload();
  }

  if (!$warpsByBanner) {
    db.warps.getAllWarps().then((warps) => {
      warpsByBanner.set(getWarpsByBanner(warps));
    });
  }

  let showModal = false;
</script>

<nav>
  <div class="logo">
    <h1 on:click={() => window.location.reload()} class="logo">Warpstar</h1>
  </div>
  <div class="nav-buttons">
    <a href="https://discord.gg/dsHUpK2hK6" target="_blank" rel="noreferrer">
      <img src="/discord.svg" />
    </a>
    <!-- <img src="your-logo.png" alt="Logo" /> -->
    <NavbarButton on:click={() => (showModal = true)}>Import</NavbarButton>
    <NavbarButton on:click={signOutAndReload}>Sign out</NavbarButton>
    <!-- <div>
    </div> -->
  </div>
</nav>

<Modal bind:showModal />

<div class="container">
  <div class="stats-container">
    <Stats />
  </div>
  <div class="warp-table-container">
    <div class="banner-buttons">
      {#each BANNER_NAMES as bannerName}
        <BannerButton {bannerName} />
      {/each}
    </div>
    <div class="filter-buttons">
      {#each RARITIES as rarity}
        <FilterButton {rarity} />
      {/each}
    </div>
    <WarpTable />
  </div>
</div>

<style>
  h1 {
    margin-top: 0;
    text-transform: lowercase;
    cursor: default;
    user-select: none;
  }

  .container {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: auto;
    margin-inline: auto;
    padding-top: 40px;
  }

  @media (min-width: 1200px) {
    .container {
      grid-template-columns: 1fr 1fr;
      width: max(60%, 1200px);
    }
  }

  .banner-buttons {
    display: flex;
    justify-content: center;
  }

  .filter-buttons {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  .nav-buttons {
    display: flex;
    align-items: center;
  }

  .logo {
    cursor: pointer;
    margin: 0;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 20px;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
    filter: brightness(70%);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  img:hover {
    filter: brightness(90%);
  }
</style>
