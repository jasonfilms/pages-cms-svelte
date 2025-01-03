<script lang="ts">
  let mobile = $state(false);

  function trapFocus(node: HTMLElement) {
    const previous = document.activeElement as HTMLElement;

    function focusable() {
      return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    }

    function handleKeyDown(e: KeyboardEvent) {
      const current = document.activeElement;
      const elements = focusable();
      const first = elements.at(0) as HTMLElement;
      const last = elements.at(-1) as HTMLElement;

      if (e.shiftKey && current === first) {
        last.focus();
        e.preventDefault();
      }

      if (!e.shiftKey && current === last) {
        first.focus();
        e.preventDefault();
      }
    }

    $effect(() => {
      let firstNode = focusable()[0] as HTMLElement;
      firstNode.focus();
      node.addEventListener('keydown', handleKeyDown);

      return () => {
        node.removeEventListener('keydown', handleKeyDown);
        previous.focus();
      };
    });
  }

  function openMenu() {
    mobile = !mobile;
    if (mobile) {
      document.getElementById("main-menu")!.focus();
    }
  }
</script>

<nav>
  <button 
    class="toggle" 
    aria-expanded="{mobile}" 
    aria-controls="main-menu" 
    aria-label="Toggle menu" 
    onclick={openMenu}
    onkeydown={(e) => { if (mobile && e.key === "Escape") mobile = false }} 
  >
    Menu
  </button>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul 
    id="main-menu" 
    class={mobile ? "menu" : ""} 
    tabindex="0" 
    onkeydown={(e) => { if (e.key === "Escape") mobile = false }}
    use:trapFocus
  >
    <button 
      class={["close", mobile ? "show" : ""]} 
      aria-label="Close menu" 
      onclick={() => mobile = false}
      onkeydown={(e) => { if (e.key === "Space" || e.key === "Escape") mobile = false }}
    >
      x
    </button>
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
    margin: 0 1rem 5rem;
    max-width: 100%;

    .toggle {
      margin-left: auto;
    }

    .close {
      position: fixed;
      top: 1rem;
      right: 1rem;
    }

    .toggle, .close {
      display: none;
    }

    & > ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
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
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--background);

        &:focus-visible {
          border: 1px solid black;
        }

        a {
          font-size: 2rem;
        }
      }
    }
  }
</style>