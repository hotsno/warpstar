<script lang="ts">
  import db from '../../routes/db';
  import BannerButton from '../atoms/BannerButton.svelte';
  import Modal from '../molecules/Modal.svelte';
  import WarpTable from '../molecules/WarpTable.svelte';
  import { getWarpsByBanner, getOverallAvgPity } from '../../routes/utils';
  import { warpsByBanner } from '../../stores';
  import NavbarButton from '../atoms/NavbarButton.svelte';
  import Stats from '../molecules/Stats.svelte';

  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure'];

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

<h1 on:click={() => window.location.reload()} class="logo">Warpstar</h1>

<div class="import-button">
  <NavbarButton on:click={() => (showModal = true)}>Import</NavbarButton>
</div>
<div class="sign-out-button">
  <NavbarButton on:click={signOutAndReload}>Sign out</NavbarButton>
</div>

<p><i>Note: site still under construction</i></p>

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
  }

  @media (min-width: 1200px) {
    .container {
      grid-template-columns: 1fr 1fr;
    }
  }

  .banner-buttons {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  /* TODO: fix this ugliness */
  .import-button {
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 120px;
    user-select: none;
  }
  .sign-out-button {
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    user-select: none;
  }

  .logo {
    cursor: pointer;
  }
</style>
