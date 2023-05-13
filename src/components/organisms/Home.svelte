<script>
  import Logo from '../atoms/Logo.svelte';
</script>

<div>
  <Logo />
  <a on:click class="sign-in">Sign in</a>
</div>

<style>
  .sign-in {
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
  }

  div {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
