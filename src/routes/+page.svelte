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
      <article class="card" in:fly={{ delay: (200 * i + duration), ...flyIn }} out:fade={{ easing: quintIn, duration }}>
        <div class="card-frame">
          <Video src={source.src} image={source.image} />
        </div>
        <h1 in:fly={{ delay: (200 * i + duration + 200), ...flyIn }}>{source.name}</h1>
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
    gap: 6rem;
    margin: 3rem auto 6rem;
  }

  .card {
    display: flex;
    flex-flow: column wrap;
    gap: 3.5rem;

    .card-frame {
      display: flex;
      padding: 0.25em;
      width: 100%;
      border-image: url("/images/frame1.png") 12.5% / 38px 60px / 2.5rem stretch;

      @media only screen and (max-width: 700px) {
        align-items: center;
        flex-flow: column wrap;
      }
    }

    h1 {
      justify-self: center;
      font-variant: small-caps;
      letter-spacing: 2px;
      word-spacing: 4px;
      text-align: center;
      background: var(--border);
      padding: 0.5rem 0.25rem;
      box-shadow: 0 2px 5px 0 var(--shadow);
    }
  }

  @media only screen and (max-width: 1180px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .card {
      justify-content: center;
      margin: 0 1rem;
    }
  }
</style>