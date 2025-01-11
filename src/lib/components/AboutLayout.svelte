<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import Initials from "./Initials.svelte";

  let { children }: { children: Snippet } = $props();
</script>

<div id="name" in:fade={{ duration: 200 }}>
  <Initials />
</div>

<img src="/images/jason-1.jpg" class="portrait" alt="Portrait of Jason Feinberg: a smiling, young person with curly hair and a dark green jacket" />

{@render children()}

<style>
  #name {
    display: grid;
    place-content: center;
    margin-bottom: 4rem;
  }

  .portrait {
    display: block;
    margin: 1rem auto;
    max-width: 100%;
    box-shadow: 0 2px 5px 0 var(--shadow);
  }
</style>