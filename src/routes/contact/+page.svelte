<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { social } from "$lib/data/socials.json";

  let { form }: { form: ActionData } = $props();
</script>

<h1>contact me</h1>

<p>you can find me at my socials here:</p>
<ul id="socials">
  {#each social as { name, url }}
    <li>
      <a href="{url}">
        {name}
      </a>
    </li>
  {/each}
</ul>

<p>... or you can directly send me a message here!</p>

<form name="contact" method="post" use:enhance>
  <label>
    <span>name</span>
    <input type="text" name="name" id="name" required />
  </label>
  {#if form?.error}
    <p>This is required!</p>
  {/if}

  <label>
    <span>email</span>
    <input type="email" name="email" id="email" required />
  </label>

  <label>
    <span>website</span>
    <input type="url" name="website" id="website" />
  </label>

  <label>
    <span>message</span>
    <textarea name="message" rows="5" required></textarea>
  </label>

  <input type="hidden" name="_honey" tabindex="-1" autocomplete="off" style="display:none" />

  <button type="submit">Send mail</button>
</form>

<style>
  form {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5em;

    label {
      display: flex;
      flex-flow: column wrap;
      gap: 0.25em;
    }

    button {
      cursor: pointer;
      margin-top: 1rem;
      font-size: 1.25rem;
    }
  }

  #socials {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 1rem;
  }
</style>