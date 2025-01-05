<script lang="ts">
  import { onMount } from "svelte";
  import { quintIn, quintOut } from "svelte/easing";
  import { prefersReducedMotion } from "svelte/motion";
  import { fade, fly } from "svelte/transition";
  import { video } from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
  
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });

  const duration = 300;
  const flyIn = { duration, y: prefersReducedMotion.current ? 0 : 10, easing: quintOut };
</script>

<section class="grid">
  {#each video as source, i}
    {#key mounted}
      <article class="card" in:fly={{ delay: (200 * i), ...flyIn }} out:fade={{ easing: quintIn, duration }}>
        <Video src={source.src} image={source.image} />
      </article>
    {/key}
  {/each}
</section>

<style>
  .grid {
    display: grid;
    place-content: center;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 3rem;
  }

  .card {
    display: flex;
    padding: 0.25em;
    border-image: url("/images/frame3.png") 10% / 20px / 1rem round stretch;

    @media only screen and (max-width: 700px) {
      align-items: center;
      flex-flow: column wrap;
    }
  }

  @media only screen and (max-width: 1180px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .card {
      justify-content: center;
    }
  }
</style>