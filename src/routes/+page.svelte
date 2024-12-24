<script lang="ts">
  import videos from "$lib/data/videos.json";
  import Video from "$lib/components/Video.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<section class="grid">
  {#each videos as source}
    <article class="card">
      <Video {source} />
      <div class="card-content">
        <h1>test</h1>
        <p>description</p>
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
  }
</style>