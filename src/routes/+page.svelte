<script lang="ts">
  import { fly } from "svelte/transition";
  import { video } from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
</script>

<section class="grid">
  {#each video as source, i}
    <article class="card" in:fly={{ delay: (0.2 * i), y: 200, duration: 200 }}>
      <Video src={source.src} image={source.image} />
    </article>
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