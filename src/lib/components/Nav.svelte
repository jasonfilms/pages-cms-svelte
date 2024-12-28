<script lang="ts">
  let mobile = $state(false);
</script>

<nav>
  {#if mobile}
    <button aria-label="Toggle menu">Menu</button>
  {/if}
  <ul>
    <li><a href="/">index</a></li>
    <li><a href="/about">about</a></li>
    <li><a href="/contact">contact</a></li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    flex-wrap: wrap;
    font-family: var(--title-font);

    & > ul {
      display: flex;
      list-style: none;
      margin: 0;
      gap: 1rem;
    }
  }
</style>