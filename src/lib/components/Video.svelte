<script lang="ts">
  import 'vidstack/bundle';
  import type { MediaPlayerElement } from 'vidstack/elements';
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  let player = $state() as MediaPlayerElement;
  let { name, src, image, desc = "" }: { name: string, src: string, image?: string , desc?: string } = $props();

  onDestroy(() => {
    if (player !== undefined) {
      player.destroy();
    }
  });
</script>

<media-player
  viewType="video"
  streamType="on-demand"
  crossorigin
  playsinline
  muted
  class="player"
  {src}
  bind:this={player}
  transition:fade
> 
  <media-provider>
    {#if image}
      <media-poster class="vds-poster" src={image} alt={!desc ? name : desc}></media-poster>
    {/if}
  </media-provider>
  <media-video-layout></media-video-layout>
</media-player>

<style>
  .player {
    aspect-ratio: 16 / 9;
    --video-font-family: var(--mono-font);
  }
</style>