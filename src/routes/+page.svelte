<script lang="ts">
  import { videos } from "$lib/data/videos";
  import Video from "$lib/components/Video.svelte";
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<section>
  {#each videos as url}
    <Video {url} />
  {/each}
</section>