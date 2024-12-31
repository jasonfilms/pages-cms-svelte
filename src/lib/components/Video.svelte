<script lang="ts">
  import 'vidstack/player/styles/default/theme.css';
  import 'vidstack/player/styles/default/layouts/video.css';
  import 'vidstack/player';
  import 'vidstack/player/layouts';
  import 'vidstack/player/ui';
  import type { MediaPlayerElement } from 'vidstack/elements';
  import { onDestroy } from 'svelte';

  let player: MediaPlayerElement;
  let { src }: { src: string } = $props();

  onDestroy(() => {
    player.destroy();
  });
</script>

<media-player
  viewType="video"
  streamType="on-demand"
  crossorigin
  playsinline
  muted
  keep-alive
  {src}
  bind:this={player}
> 
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>

<style>
</style>