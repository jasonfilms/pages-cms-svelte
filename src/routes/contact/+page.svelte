<script lang="ts">
  import socials from "$lib/data/socials.json";
</script>

<h1>contact me</h1>

<p>you can find me at my socials here:</p>
<ul id="socials">
  {#each socials as {name, url}}
    <li><a href="{url}">{name}</a></li>
  {/each}
</ul>

<p>... or you can directly send me a message here!</p>

<form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
  <label>
    <span>name</span>
    <input type="text" name="name" id="name" required />
  </label>

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
    <textarea rows="5" required></textarea>
  </label>

  <input type="hidden" name="bot-field" tabindex="-1" autocomplete="off" style="display:none" />

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
    list-style: none;
    gap: 1rem;
  }
</style>