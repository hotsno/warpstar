<script lang="ts">
  import db from './db';
  import { onMount } from 'svelte';
  import HomePage from '../components/organisms/HomePage.svelte';
  import MainPage from '../components/organisms/MainPage.svelte';

  const user = db.user;
  let clickedSignIn = false;

  onMount(() => {
    if (window.location.hash.includes('signed-in')) {
      clickedSignIn = true;
    }
  });

  function signInHandler() {
    if (!$user) {
      db.signIn();
    } else {
      clickedSignIn = true;
    }
  }
</script>

<MainPage />

<!-- {#if !clickedSignIn || !$user}
  <HomePage on:click={signInHandler} />
{:else}
  <MainPage />
{/if} -->
