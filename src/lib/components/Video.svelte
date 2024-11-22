<script lang="ts">
  import 'vidstack/player/styles/default/theme.css';
  import 'vidstack/player/styles/default/layouts/video.css';

  import 'vidstack/player';
  import 'vidstack/player/layouts';
  import 'vidstack/player/ui';

  let { url }: { url: string } = $props();
</script>

<media-player
  class="player" 
  viewType="video"
  src={url}
  crossOrigin
  playsInline
  hideControlsOnMouseLeave
>
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>

<style>
  .player {
    --video-border-radius: 2px;
    width: 40rem;

    &[data-view-type='video'] { aspect-ratio: 16 / 9; }
  }
</style>