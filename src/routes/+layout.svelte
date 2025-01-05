<script lang="ts">
  import type { Snippet } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import Nav from '$lib/components/Nav.svelte';
  import "../style.css";

  interface Props {
    title: string;
    children: Snippet;
    data: {
      pathname: string,
    };
  }

  let { title = "Jason Feinberg", children, data }: Props = $props();
  const duration = 300;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y: prefersReducedMotion.current ? 0 : y, duration, delay };
  const transitionOut = { easing: cubicIn, y: prefersReducedMotion.current ? 0 : -y, duration };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Nav />

{#key data.pathname}
  <main in:fly={transitionIn} out:fly={transitionOut}>
    {@render children()}
  </main>
{/key}

<style>
  main {
    margin: 2rem auto;
    max-width: 80ch;
    font-family: var(--body-font);
    font-size: 1.15rem;

    @media screen and (max-width: 900px) {
      margin: 0 2rem;
    }
  }
</style>