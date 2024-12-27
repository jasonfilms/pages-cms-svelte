<script lang="ts">
  import 'vidstack/player/styles/default/theme.css';
  import 'vidstack/player/styles/default/layouts/video.css';
  import 'vidstack/player';
  import 'vidstack/player/layouts';
  import 'vidstack/player/ui';

  let { src }: { src: string } = $props();
</script>

<media-player
  viewType="video"
  streamType="on-demand"
  crossorigin
  playsinline
  muted
  {src}
>
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>

<style>
</style>