<script lang="ts">
  import { trapFocus } from "trap-focus-svelte";
  import { X, Menu } from "lucide-svelte";

  let mobile = $state(false);
  let button: HTMLButtonElement;

  $effect(() => {
    if (mobile && button) {
      button.focus();
    }
  });
</script>

<nav>
  <button 
    class="toggle" 
    aria-expanded="{mobile}" 
    aria-controls="main-menu" 
    onclick={() => mobile = !mobile}
    onkeydown={(e) => { if (mobile && e.key === "Escape") mobile = false }} 
  >
    <Menu />
    <span class="visually-hidden">Toggle menu</span>
  </button>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <ul 
    id="main-menu" 
    class={mobile ? "menu" : ""} 
    tabindex="0" 
    onkeydown={(e) => { if (e.key === "Escape") mobile = false }}
    onclick={() => { if (mobile) mobile = false }} 
    use:trapFocus={mobile}
  >
    <button 
      class={["close", mobile ? "show" : ""]} 
      onclick={() => mobile = false}
      onkeydown={(e) => { if (e.key === "Space" || e.key === "Escape") mobile = false }}
      bind:this={button}
    >
      <X />
      <span class="visually-hidden">Close menu</span>
    </button>
    <li><a href="/">home</a></li>
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
    view-transition-name: mainmenu;

    .toggle {
      font-size: 1.5rem;
    }

    .close {
      position: fixed;
      top: 1rem;
      right: 1.25rem;
    }

    .toggle, .close {
      display: none;
      min-width: 44px;
      min-height: 44px;
    }

    & > ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1rem;
    }

    @media screen and (max-width: 1180px) {
      margin-bottom: 1.5rem;

      .toggle, .show {
        display: grid;
        place-content: center;
      }

      .toggle {
        margin: 0.5rem 0.25rem 0.5rem auto;
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