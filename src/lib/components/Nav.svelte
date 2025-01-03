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
      document.getElementById("main-menu")!.focus({ preventScroll: true });
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
    onclick={() => { if (mobile) mobile = false }} 
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
    font-size: 1.5rem;
    margin: 0 0.5rem 5rem;
    max-width: 100%;

    .toggle {
      font-size: 1.5rem;
    }

    .close {
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
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
      margin-bottom: 1rem;

      .toggle {
        display: block;
        margin: 0.5rem 0.25rem 0.5rem auto;
      }

      .show {
        display: grid;
        place-content: center;
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

        li {
          display: block;
          width: calc(100vw - 4rem);
          text-align: center;
        }

        a {
          display: block;
          font-size: 2rem;
          transition: 0.5s ease-in-out all;

          &:hover {
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>