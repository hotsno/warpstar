<script lang="ts">
</script>

<button on:click> <slot /> </button>

<style>
  button {
    border: 0;
    padding: 5px 10px;
    font-size: 1.2rem;
    text-align: center;
    color: #aaa;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.3s ease;
    cursor: pointer;
    font-family: 'Baloo Chettan 2';
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button:active {
    transform: scale(0.95);
  }
</style>
