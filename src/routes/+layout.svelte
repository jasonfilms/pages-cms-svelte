<script lang="ts">
  import type { Snippet } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';
  import "../style.css";

  let { title = "Jason Feinberg", children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=ibm-plex-serif:400,400i,700,700i|azeret-mono:100,200,300,400,500,600,700,800,900|dm-mono:300,400,500" rel="stylesheet" />
</svelte:head>

<Nav />

<main>
  {@render children()}
</main>

<style>
  main {
    margin: 2rem auto;
    max-width: 80ch;
    font-family: var(--body-font);
    font-size: 1.15rem;
  }
</style>