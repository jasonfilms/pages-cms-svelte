<script lang="ts">
  import { onMount } from "svelte";
  import videos from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
  import BiggerPicture from "bigger-picture";
  import type { BiggerPictureInstance } from 'bigger-picture';
  import "bigger-picture/css";

  let bp: BiggerPictureInstance;
  let links: NodeListOf<HTMLAnchorElement>;
  onMount(() => {
    bp = BiggerPicture({ target: document.body });
    links = document.querySelectorAll("a.card-link");
  });
</script>

<section class="grid">
  {#each videos as source}
    <article class="card">
      <Video src={source.src} />
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
    
    &:nth-child(1n + 3) {
      border-image: url("/images/frame3.png") 10% / 20px / 1rem round stretch;
    }

    &:nth-child(2n + 3) {
      border-image: url("/images/frame1.png") 10% / 40px 20px / 1rem round stretch;
    }

    &:nth-child(3n + 2) {
      border-image: url("/images/frame2.png") 10% / 20px / 1rem round stretch;
    }

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