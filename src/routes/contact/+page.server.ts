import type { Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const token = form.get("cf-turnstile-response") as string;
    const ip = request.headers.get("CF-Connecting-IP") as string;
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const website = form.get("website") as string;
    const message = form.get("message") as string;

    const checkProfanity = await fetch("https://vector.profanity.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const result = await checkProfanity.json();
    if (result.isProfanity) {
      return fail(400, { message: "Please do not curse or swear." });
    }

    const formData = new FormData();
    formData.append("secret", process.env.SECRET_KEY as string);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const checkSpam = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome = await checkSpam.json();
    if (!outcome.success) {
      return error(400, { message: "The provided Turnstile token was not valid! \n" + JSON.stringify(outcome) });
    }

    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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