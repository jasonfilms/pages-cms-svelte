<script lang="ts">

  let { source }: { source: { src: string; type: string; } } = $props();
</script>

<video controls>
  <source src="{source.src}" type="video/object">
  <track kind="captions" />
</video>

<style>
  .player {
    --video-border-radius: 2px;

    &[data-view-type='video'] { aspect-ratio: 16 / 9; }
  }
</style>