<script lang="ts">
  import db from './db';
  import { onMount } from 'svelte';
  import HomePage from '../components/organisms/HomePage.svelte';
  import MainPage from '../components/organisms/MainPage.svelte';
  import { warpsByBanner } from '../stores';
  import { getWarpsByBanner } from './utils';

  const user = db.user;
  let clickedSignIn = false;
  let originURL: string;

  onMount(() => {
    if (window.location.hash.includes('signed-in')) {
      clickedSignIn = true;
    }
    originURL = window.location.origin;
  });

  $: if ($user) {
    db.warps.getAllWarps().then((warps) => {
      warpsByBanner.set(getWarpsByBanner(warps));
    });
  }

  async function signInHandler() {
    if (!$user) {
      await db.signIn(originURL);
    } else {
      clickedSignIn = true;
    }
  }
</script>

<!-- <MainPage /> -->

{#if !clickedSignIn || !$user}
  <HomePage on:click={signInHandler} />
{:else}
  <MainPage />
{/if}
