<script lang="ts">
  let mobile = $state(false);

  function openMenu() {
    mobile = !mobile;
  }
</script>

<nav>
  <button class="toggle" aria-label="Toggle menu" onclick={openMenu}>Menu</button>
  <ul class={mobile ? 'menu' : ''}>
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

    .toggle {
      display: none;
    }

    & > ul {
      display: flex;
      list-style: none;
      margin: 0;
      gap: 1rem;
    }

    @media only screen and (max-width: 1180px) {
      .toggle {
        display: block;
      }

      ul {
        display: none;
      }

      .menu {
        display: block;
      }
    }
  }
</style>