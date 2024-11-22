<script lang="ts">
  import type { Snippet } from 'svelte';
  import Nav from '$lib/components/Nav.svelte';

  let { title = "hey", children }: { title: string; children: Snippet } = $props();
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Nav />

{@render children()}