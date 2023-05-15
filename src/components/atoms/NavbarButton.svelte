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
    background-color: rgba(255, 255, 255, 0.03);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  button:active {
    transform: scale(0.95);
  }
</style>
