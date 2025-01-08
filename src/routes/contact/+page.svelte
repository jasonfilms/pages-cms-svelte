<script lang="ts">
  import { enhance } from "$app/forms";
  import { social } from "$lib/data/socials.json";
  
  let loading = $state(false);
</script>

<h1>contact me</h1>

<p>you can find me at my socials here:</p>
<ul id="socials">
  {#each social as { name, url }}
    <li>
      <a href="{url}">
        <img src="https://cdn.simpleicons.org/{(name === 'Twitter') ? 'X' : name}" height="32" width="32" alt="" />
        {name}
      </a>
    </li>
  {/each}
</ul>

<p>... or you can directly send me a message here!</p>

<form 
  name="contact" 
  action="/success" 
  method="post" 
  netlify-honeypot="honeypot" 
  data-netlify="true" 
  use:enhance={() => {
    loading = true;
    return async ({ update }) => {
      await update();
      loading = false;
    }
  }}
>
  <input type="hidden" name="form-name" value="contact" tabindex="-1" autocomplete="off" style="display:none" />
  <label>
    <span>name</span>
    <input type="text" name="name" id="name" disabled={loading} required />
  </label>

  <label>
    <span>email</span>
    <input type="email" name="email" id="email" disabled={loading} required />
  </label>

  <label>
    <span>website</span>
    <input type="url" name="website" id="website" disabled={loading} />
  </label>

  <label>
    <span>message</span>
    <textarea name="message" rows="5" disabled={loading} required></textarea>
  </label>

  <div class="cf-turnstile" data-sitekey="0x4AAAAAAA4uvV2_RzfLGP6P"></div>
  <input type="text" name="honeypot" tabindex="-1" autocomplete="off" style="display:none" />

  <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send mail"}</button>
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

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
</style>