<script module>
  export const prerender = true;
</script>

<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { schema } from "$lib/data/schema";
  import { social } from "$lib/data/socials.json";

  let loading = $state(false);
  let { data } = $props();
  const { form, enhance, errors } = superForm(data.form, {
    validators: zodClient(schema),
    onSubmit: (input) => {
      const submit: SubmitFunction = () => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        }
      }
      submit(input);
      loading = false;
    }
  });
</script>

<!-- <svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head> -->

<h1>contact me</h1>

<section class="contact">
  <div class="half">
    <p>you can find me at my socials here:</p>
    <ul id="socials">
      {#each social as { name, url }}
        <li>
          <a href="{url}" target="_blank" rel="noreferrer">
            <img src="https://cdn.simpleicons.org/{(name === 'Twitter') ? 'X' : name}" height="32" width="32" alt="" />
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <div class="half">
    <p>... or you can directly send me a message here!</p>

    <form name="contact" method="post" action="/success" netlify-honeypot="honeypot" data-netlify="true" use:enhance>
      <label>
        <span>name</span>
        <input 
          type="text" 
          name="name" 
          id="name" 
          bind:value={$form.name} 
          aria-invalid={$errors.name ? "true" : undefined} 
          aria-describedby="name-error"
          disabled={loading}
        />
      </label>
      {#if $errors.name}
        <p id="name-error" class="error">{$errors.name}</p>
      {/if}

      <label>
        <span>email</span>
        <input 
          type="email" 
          name="email" 
          id="email" 
          bind:value={$form.email} 
          aria-invalid={$errors.email ? "true" : undefined}
          aria-describedby="email-error"
          disabled={loading}
        />
      </label>
      {#if $errors.email}
        <p id="email-error" class="error">{$errors.email}</p>
      {/if}

      <label>
        <span>website</span>
        <input 
          type="url" 
          name="$website" 
          id="website" 
          bind:value={$form.$website} 
          aria-invalid={$errors.$website ? "true" : undefined} 
          aria-describedby="website-error"
          disabled={loading}
        />
      </label>
      {#if $errors.$website}
        <p id="website-error" class="error">{$errors.$website}</p>
      {/if}

      <label>
        <span>message</span>
        <textarea 
          name="message" 
          rows="5" 
          bind:value={$form.message} 
          aria-invalid={$errors.message ? "true" : undefined}
          aria-describedby="message-error"
          disabled={loading}
        >
        </textarea>
      </label>
      {#if $errors.message}
        <p id="message-error" class="error">{$errors.message}</p>
      {/if}

      <!-- <div class="cf-turnstile" data-sitekey="0x4AAAAAAA4uvV2_RzfLGP6P"></div> -->
      <!-- <input type="hidden" name="replyTo" value="@" tabindex="-1" autocomplete="off" style="display:none" /> -->
      <input type="hidden" name="form-name" value="contact" tabindex="-1" autocomplete="off" />
      <input type="text" name="honeypot" tabindex="-1" autocomplete="off" style="display:none" />

      <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send mail"}</button>
    </form>
  </div>
</section>

<style>
  .contact {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 900px) {
      flex-flow: column wrap;
      gap: 2rem;
    }
  }

  form {
    display: flex;
    flex-flow: column wrap;
    gap: 0.5em;

    [aria-invalid="true"] {
      outline: 2px solid var(--error);
    }

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

    .error {
      margin: 0 0.25rem;
      font-size: 0.95rem;
    }
  }

  #socials {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 1rem;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
</style>