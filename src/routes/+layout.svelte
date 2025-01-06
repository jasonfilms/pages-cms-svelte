<script lang="ts">
  import type { Snippet } from 'svelte';
  import { prefersReducedMotion } from 'svelte/motion';
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { onNavigate } from '$app/navigation';
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

  // animations + view transitions
  const duration = 300;
  const delay = duration + 100;
  const y = 10;

  const transitionIn = { easing: cubicOut, y: prefersReducedMotion.current ? 0 : y, duration, delay };
  const transitionOut = { easing: cubicIn, y: prefersReducedMotion.current ? 0 : -y, duration };

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
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

  @keyframes fade-out {
    from {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    to {
      opacity: 0;
    }
  }

  @keyframes slide-from-down {
    from {
      transform: translateY(10px);
    }
  }

  @keyframes slide-to-up {
    to {
      transform: translateY(-10px);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    :root::view-transition-old(root) {
      animation: 90ms ease-in-out both fade-out, 300ms ease-in-out both slide-to-up;
    }

    :root::view-transition-new(root) {
      animation: 210ms ease-out 90ms both fade-in, 300ms ease-in both slide-from-down;
    }
  }
</style>