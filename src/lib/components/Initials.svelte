<script lang="ts">
  import { onMount } from "svelte";
  import { draw } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { letters } from "./svg";
  
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 174.4 80.4">
  <title>jason</title>
  <defs>
    <g id="masks">
      {#each letters as { letter, mask, width }, i}
        {#if mounted}
          <mask id="mask-letter-{letter}">
            <path class="mask" id="mask-{letter}" stroke-width={width} d={mask} in:draw={{ delay: 400 * i + 500, duration: 800, easing: cubicOut }}
            />
          </mask>
        {/if}
      {/each}
    </g>
  </defs>
  <g id="base" fill-rule="evenodd">
    {#each letters as { letter, path }}
      <path mask="url(#mask-letter-{letter})" id="letter-{letter}" d={path} />
    {/each}
  </g>
</svg>

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  .mask {
    fill: none;
    stroke: var(--background);
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  #base { fill: #ddc6f0; }
  path { opacity: 1; }
</style>