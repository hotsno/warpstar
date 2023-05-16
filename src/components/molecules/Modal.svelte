<script lang="ts">
  export let showModal = false;
  import { warpsByBanner } from '../../stores';
  import db from '../../routes/db';
  import { getWarpsByBanner } from '../../routes/utils';

  let dialog: HTMLDialogElement;

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:close={() => (showModal = false)}
  on:click|self={() => dialog.close()}
>
  <div on:click|stopPropagation>
    <p>
      Run the following in a non-admin PowerShell while the in-game warp history screen is open.
      It'll copy a URL to your clipboard.
    </p>
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
  </div>
</dialog>

<style>
  dialog {
    max-width: 36em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
    background-color: #111;
    color: #ccc;
    border-radius: 10px;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.8);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  input {
    background-color: #333;
    border: 0;
    color: #ccc;
  }

  li {
    display: inline-block;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  code {
    background-color: #222;
    padding-block: 2px;
    padding-inline: 8px;
    border-radius: 10px;
  }
</style>
