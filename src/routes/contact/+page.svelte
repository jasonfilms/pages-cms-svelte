<script lang="ts">
  import socials from "$lib/data/socials.json";
</script>

<h1>contact me</h1>

<p>you can find me at my socials here:</p>
<ul>
  {#each socials as {name, url}}
    <li><a href="{url}">{name}</a></li>
  {/each}
</ul>

<p>... or you can directly send me a message here!</p>

<form method="post">
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
  }
</style>