<script lang="ts">
  import { base } from "$app/paths";
  import { createForm } from "felte";
  import { validator } from "@felte/validator-zod";
  import { schema } from "$lib/data/schema";
  import { social } from "$lib/data/socials.json";

  const { form, errors, isSubmitting } = createForm({
    extend: validator({ schema }),
    onSubmit: async (values, context) => {
      context.setData({...values, accessKey: "0e9ccc53-360c-4363-b803-34f7b1b4d25c" });
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" }
      });
      return response.json();
    },
  });
</script>

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

    <form name="contact" method="post" action="https://api.staticforms.xyz/submit" use:form>
      <label>
        <span>name</span>
        <input 
          type="text" 
          name="name" 
          id="name" 
          aria-invalid={$errors.name ? "true" : undefined} 
          aria-describedby="name-error"
          disabled={$isSubmitting}
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
          aria-invalid={$errors.email ? "true" : undefined}
          aria-describedby="email-error"
          disabled={$isSubmitting}
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
          aria-invalid={$errors.$website ? "true" : undefined} 
          aria-describedby="website-error"
          disabled={$isSubmitting}
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
          aria-invalid={$errors.message ? "true" : undefined}
          aria-describedby="message-error"
          disabled={$isSubmitting}
        >
        </textarea>
      </label>
      {#if $errors.message}
        <p id="message-error" class="error">{$errors.message}</p>
      {/if}

      <input type="hidden" name="replyTo" value="@" tabindex="-1" autocomplete="off" style="display:none" />
      <input type="hidden" name="redirectTo" value="{base}/success" tabindex="-1" autocomplete="off" />
      <input type="text" name="honeypot" tabindex="-1" autocomplete="off" style="display:none" />

      <button type="submit" disabled={$isSubmitting}>{$isSubmitting ? "Sending..." : "Send mail"}</button>
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
