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

  let { title = "Jason Films", children, data }: Props = $props();

  // animations + view transitions
  const duration = 300;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y: prefersReducedMotion.current ? 0 : y, duration, delay };
  const transitionOut = { easing: cubicIn, y: prefersReducedMotion.current ? 0 : -y, duration };
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png">
  <title>{title}</title>
</svelte:head>

<Nav />

{#key data.pathname}
  <main in:fly={transitionIn} out:fly={transitionOut} class={data.pathname === "/" || data.pathname === "/about" ? "full-width" : "default-width"}>
    {@render children()}
  </main>
{/key}

<style>
  main {
    margin: 2rem auto;
    font-family: var(--body-font);
    font-size: 1.15rem;

    &.default-width { max-width: 80ch; }
    &.full-width { max-width: 80vw; }
    
    @media screen and (max-width: 900px) {
      max-width: 100% !important;
      margin: 0 2rem;
    }
  }
</style>