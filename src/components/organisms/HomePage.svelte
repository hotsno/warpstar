<script>
  import Logo from '../atoms/Logo.svelte';
  import NavbarButton from '../atoms/NavbarButton.svelte';
  import { onMount } from 'svelte';

  const QUOTES = ['March 7th cute and funny', "I don't even play this game", 'Ran out of quotes'];
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  // let randomQuote = '';
  // onMount(() => {
  //   console.log('mounted');
  // });
</script>

<nav>
  <span />
  <div class="nav-buttons">
    <NavbarButton on:click>Sign in</NavbarButton>
  </div>
</nav>
<div class="logo-wrapper">
  <Logo />
</div>
<div class="quote">
  <p>{randomQuote}</p>
</div>

<style>
  .sign-in {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    user-select: none;
    display: block;
  }

  .logo-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wrapper {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .quote {
    font-style: italic;
    color: #444;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    cursor: default;
    display: block;
  }
</style>
