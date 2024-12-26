<script lang="ts">
  import { onMount } from "svelte";
  import videos from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
  import BiggerPicture from "bigger-picture";
  import "bigger-picture/css";

  let bp: any;
  let root: HTMLElement;
  let links: NodeList;
  onMount(() => {
    bp = BiggerPicture({ target: document.body });
    links = root.querySelectorAll("a");
  });
</script>

<section class="grid" bind:this={root}>
  {#each videos as source}
    <article class="card">
      <Video {source} />
      <div class="card-content">
        <h2>
          <a 
            href="{source.src}"
            data-width="1920"
            data-height="1080"
            data-iframe="{source.src}"
            onclick={(e) => {
              e.preventDefault();
              bp.open({
                items: links,
                el: e.currentTarget,
                scale: 0.75
              });
            }} 
          >
            {source.name}
          </a>
        </h2>
        <p>{@html source.desc}</p>
      </div>
    </article>
  {/each}
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .card {
    display: flex;
    border: 2px solid black;
    padding: 0.25em;
    gap: 0.25em;

  }
</style>