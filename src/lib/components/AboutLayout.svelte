<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import Initials from "./Initials.svelte";

  let { children }: { children: Snippet } = $props();
</script>

<header id="name" in:fade={{ duration: 200 }}>
  <Initials />
</header>

<section id="about">
  <img src="/images/jason-1.jpg" class="portrait" alt="Portrait of Jason Feinberg: a smiling, young person with curly hair and a dark green jacket" />

  {@render children()}
</section>

<style>
  #name {
    display: grid;
    place-content: center;
    margin-bottom: 4rem;
  }

  .portrait {
    float: left;
    margin: 0 1.5rem 1rem;
    max-width: 25%;
    box-shadow: 0 2px 5px 0 var(--shadow);

    @media screen and (max-width: 48em) {
      display: block;
      float: unset;
      max-width: unset;
      width: 300px;
      height: 350px;
      object-fit: cover;
      object-position: bottom center;
      margin: 0 auto 1.5rem;
    }
  }
</style>