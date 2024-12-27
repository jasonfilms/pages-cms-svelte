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
      <div class="card-image">
        <Video src={source.src} />
      </div>
      <div class="card-content">
        <h2>
          <a 
            class="card-link" 
            href="{source.src}"
            data-width="1920"
            data-height="1080"
            data-iframe="https://youtube.com/embed/{source.src.slice(-11)}"
            onclick={(e) => {
              e.preventDefault();
              bp.open({
                items: links,
                el: e.currentTarget,
              });
            }} 
          >
            {source.name}
          </a>
        </h2>
        <div class="card-text">{@html source.desc}</div>
      </div>
    </article>
  {/each}
</section>

<style>
  .grid {
    display: grid;
    place-content: center;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: dense;
    gap: 1rem;
  }

  .card {
    display: flex;
    border: 2px solid black;
    padding: 0.25em;
    gap: 0.25em;

    .card-image {
      width: 10em;
      height: 10em;
      overflow: hidden;
    }

    .card-content {
      width: 30ch;
      padding: 1rem;

      .card-text {
        min-height: 10rem;
        margin-top: 1em;
        background-image: repeating-linear-gradient(#0000 0 calc(1lh - 1px), var(--border) 0 1lh)
      }
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