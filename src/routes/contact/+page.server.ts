import type { Actions } from "./$types";
import { SECRET_KEY } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const ip = request.headers.get("CF-Connecting-IP") as string;
    const token = form.get("cf-turnstile-response") as string;
    const message = form.get("message") as string;

    const checkProfanity = async () => {
      const response = await fetch("https://vector.profanity.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      if (result.isProfanity) {
        return fail(400, { invalid: true, message: "Please do not curse or swear." });
      }
    };

    const checkSpam = async () => {
      const form = new FormData();
      form.append("secret", SECRET_KEY);
      form.append("response", token);
      form.append("remoteip", ip);

      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: form,
      });

      const result = await response.json();
      if (!result.success) {
        return error(400, { message: "The provided Turnstile token was not valid! \n" + JSON.stringify(result) });
      }
    }

    const send = async () => {
      const response = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const result = await response.json();
      if (!result.success) {
        return error(400, { message: "There was a problem sending the email. \n" + JSON.stringify(result) });
      }

      return redirect(302, "/success");
    }

    const promises = [checkProfanity, checkSpam, send];

    for (const fn of promises) {
      await fn();
    }
  }
} satisfies Actions