<script lang="ts">
  import db from '../../routes/db';
  import BannerButton from '../atoms/BannerButton.svelte';
  import Modal from '../molecules/Modal.svelte';
  import WarpTable from '../molecules/WarpTable.svelte';
  import { getWarpsByBanner } from '../../routes/utils';
  import { warpsByBanner } from '../../stores';
  import NavbarButton from '../atoms/NavbarButton.svelte';

  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure'];

  if (!$warpsByBanner) {
    db.warps.getAllWarps().then((warps) => {
      warpsByBanner.set(getWarpsByBanner(warps));
    });
  }

  let showModal = false;
</script>

<h1 on:click={() => window.location.reload()} class="logo">Warpstar</h1>

<div class="import">
  <NavbarButton on:click={() => (showModal = true)}>Import</NavbarButton>
</div>

<p><i>Note: site still under construction</i></p>

<Modal bind:showModal>
  <p>Run the following in a non-admin PowerShell while the in-game warp history screen is open.</p>
  <code>iwr -useb https://warpstar.hotsno.me/getwarpurl | iex</code>
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
            warpsByBanner.set(getWarpsByBanner(warps));
            db.warps.add(warps);
          }
        }}
      />
    </li>
  </ul>
</Modal>

<div class="container">
  <div class="half" />
  <div class="half">
    <div class="banner-buttons">
      {#each BANNER_NAMES as bannerName}
        <BannerButton {bannerName} />
      {/each}
    </div>
    <WarpTable />
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

  .container {
    display: flex;
    height: 100%;
  }

  .half {
    flex: 1;
  }

  .banner-buttons {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }

  input {
    background-color: #333;
    border: 0;
    color: #ccc;
  }

  .import {
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
