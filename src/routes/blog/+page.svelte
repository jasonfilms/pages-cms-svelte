<script lang="ts">
  import type { LayoutData } from "./$types";

  let { data }: { data: LayoutData } = $props();
</script>

<h1>blog</h1>

<ul>
  {#each data.data as { slug, title }}
    <li><a href="/blog/{slug}">{title}</a></li> 
  {/each}
</ul>