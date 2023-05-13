<script lang="ts">
  import BannerButton from '../components/atoms/BannerButton.svelte';
  import db from './db';
  import { selectedBanner } from '../stores';
  import { getWarpsByBanner } from './utils';
  import type { Warp } from '$lib/server/fetchWarps';

  const BANNER_NAMES = ['Character', 'Light Cone', 'Stellar', 'Departure'];
  let warpsByBanner: { [key: string]: Warp[] } = {};
  let currentBannerWarps: Warp[] = [];
  let clickedSignIn = false;
  const user = db.user;

  if (window.location.hash.indexOf('#auth_token=') !== -1) {
    // close if redirected from oauth page
    window.close();
  }

  $: console.log($user);

  function loginOnClick() {
    if (!$user) {
      console.log('hi');
      console.log(db.signIn());
    }
    clickedSignIn = true;
  }

  $: if (clickedSignIn && $user) {
    db.warps.getAllWarps().then((warps) => {
      warpsByBanner = getWarpsByBanner(warps);
    });
  }

  $: if (warpsByBanner[$selectedBanner.toLowerCase().replace(/ /g, '_')]) {
    currentBannerWarps = warpsByBanner[$selectedBanner.toLowerCase().replace(/ /g, '_')];
  } else {
    currentBannerWarps = [];
  }
</script>

{#if !clickedSignIn || !$user}
  <p>not signed in</p>
  <button on:click={loginOnClick} class="sign-in">sign in</button>
{:else}
  <h1>warpstar</h1>

  <p>(Better UI and more coming soon)</p>

  <p>Run the following in a non-admin PowerShell while the in-game warp history screen is open.</p>
  <code>iwr -useb https://warpstar.hotsno.me/warpurl | iex</code>

  <ul>
    <li><p>Paste URL here:</p></li>
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

  <ul>
    {#each BANNER_NAMES as bannerName}
      <BannerButton {bannerName} />
    {/each}
  </ul>

  {#if $selectedBanner}
    <table>
      <thead>
        <tr>
          <th>roll</th>
          <th>item</th>
          <th>4 star pity</th>
          <th>5 star pity</th>
          <th>time</th>
        </tr>
      </thead>
      <tbody>
        {#each currentBannerWarps as warp}
          <tr>
            <td>{warp.pull_number}</td>
            <td>{warp.item_name}</td>
            <td>{warp.four_star_pity}</td>
            <td>{warp.five_star_pity}</td>
            <td>{warp.acquisition_time}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
{/if}

<style>
  li {
    display: inline-block;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }

  .sign-in {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
