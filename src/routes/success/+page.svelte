<script lang="ts">
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";

  let count = $state(5);

  const countdown = setInterval(() => {
    count -= 1;
    if (browser && count === 0) {
      clearInterval(countdown);
      goto("/contact");
    }
  }, 1000);
</script>

<h1>Successfully sent!</h1>

<p>Thanks a bunch for sending me a message.</p>
<p>You will be redirected in {count} second{count === 1 ? "" : "s"}.</p>