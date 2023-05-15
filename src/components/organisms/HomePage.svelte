<script>
  import Logo from '../atoms/Logo.svelte';
  import NavbarButton from '../atoms/NavbarButton.svelte';
</script>

<div>
  <Logo />
  <div class="sign-in">
    <NavbarButton on:click>Sign in</NavbarButton>
  </div>
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

  div {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* tr:nth-child(even) {
    background-color: #333;
  } */
</style>
