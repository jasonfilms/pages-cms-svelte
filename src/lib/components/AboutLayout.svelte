<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<h1>about me</h1>

<div>
  placeholder for svg
</div>

<img src="/images/jason-1.jpg" class="portrait" alt="Portrait of Jason Feinberg: a smiling, young person with curly hair and a dark green jacket" />

{@render children()}

<style>
  .portrait {
    display: block;
    margin: 1rem auto;
    max-width: 100%;
  }
</style>