<script lang="ts">
  let mobile = $state(false);

  function openMenu() {
    mobile = !mobile;
  }
</script>

<nav>
  <button 
    class="toggle" 
    aria-expanded="{mobile}" 
    aria-controls="main-menu" 
    aria-label="Toggle menu" 
    onclick={openMenu}
  >
    Menu
  </button>
  <ul id="main-menu" class={mobile ? "menu" : ""}>
    <button class={["close", mobile ? "show" : ""]} aria-label="Close menu" onclick={() => mobile = false}>x</button>
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

    .toggle, .close {
      display: none;
    }

    & > ul {
      display: flex;
      list-style: none;
      margin: 0;
      gap: 1rem;
    }

    @media screen and (max-width: 1180px) {
      .toggle, .show {
        display: block;
      }

      ul {
        display: none;
      }

      .menu {
        position: fixed;
        z-index: 99;
        display: block;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--background);
      }
    }
  }
</style>