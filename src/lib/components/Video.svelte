<script lang="ts">
  import 'vidstack/player/styles/default/theme.css';
  import 'vidstack/player/styles/default/layouts/video.css';
  import 'vidstack/player';
  import 'vidstack/player/layouts';
  import 'vidstack/player/ui';

  let { source }: { source: { name: string; desc: string; src: string; type: string; } } = $props();
</script>

<media-player
  class="player" 
  viewType="video"
  crossOrigin
  playsInline
  hideControlsOnMouseLeave
>
  <media-provider>
    <source src="{source.src}" type="{source.type}" />
  </media-provider>
  <media-video-layout></media-video-layout>
</media-player>

<style>
  .player {
    --video-border-radius: 2px;

    &[data-view-type='video'] { aspect-ratio: 16 / 9; }
  }
</style>