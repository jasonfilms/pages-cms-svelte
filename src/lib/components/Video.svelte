<script lang="ts">
  import 'vidstack/bundle';
  import type { MediaPlayerElement } from 'vidstack/elements';
  import { onDestroy, onMount } from 'svelte';

  let player = $state() as MediaPlayerElement;
  let mounted = $state(false);
  let { src, image, desc }: { src: string, image: string , desc?: string } = $props();

  onMount(() => {
    mounted = true;
  });

  onDestroy(() => {
    if (player !== undefined) {
      player.destroy();
    }
  });
</script>

{#key mounted}
  <media-player
    viewType="video"
    streamType="on-demand"
    crossorigin
    playsinline
    muted
    class="player"
    {src}
    bind:this={player}
  > 
    <media-provider>
      <media-poster src={image} alt={desc}></media-poster>
    </media-provider>
    <media-video-layout></media-video-layout>
  </media-player>
{/key}

<style>
  .player {
    aspect-ratio: 16 / 9;
    --video-font-family: var(--mono-font);
  }
</style>