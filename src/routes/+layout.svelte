<script lang="ts">
  import type { Snippet } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';

  let { title = "Jason Feinberg", children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Nav />

<main>
  {@render children()}
</main>

<style>
  main {
    margin: 2rem auto;
    max-width: 80ch;
  }
</style>