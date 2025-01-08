import type { Actions } from "./$types";
import { RECIPIENT, SECRET_KEY } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get('cf-turnstile-response') as string;
    const ip = request.headers.get('CF-Connecting-IP') as string;
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const website = form.get("website") as string;
    const message = form.get("message") as string;

    const checkProfanity = await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const json = await checkProfanity.json();
    if (json.isProfanity) {
      return fail(400, { message, error: "Please do not curse or swear." });
    }

    const formData = new FormData();
    formData.append("secret", SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome = await result.json();
    if (!outcome.success) {
      return error(400, { message: "The provided Turnstile token was not valid! \n" + JSON.stringify(outcome), });
    }

    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        website,
        message,
      }),
    });

    if (!response.ok) {
      return error(400, { message: "There was a problem sending the email." });
    }
    
    return redirect(302, "/success");
  }
} satisfies Actions