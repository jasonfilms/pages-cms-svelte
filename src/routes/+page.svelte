<script lang="ts">
  import { source } from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
</script>

<section class="grid">
  {#each source as video}
    <article class="card">
      <Video src={video.src} />
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