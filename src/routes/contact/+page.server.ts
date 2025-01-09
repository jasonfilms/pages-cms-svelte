import type { Actions } from "./$types";
import { SECRET_KEY } from "$env/static/private";
import { error, fail, redirect } from "@sveltejs/kit";
import { isEmailValid } from "@hapi/address";

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const ip = request.headers.get("CF-Connecting-IP") as string;
    const token = form.get("cf-turnstile-response") as string;

    const name = form.get("name");
    const email = form.get("email");
    const website = form.get("website");
    const message = form.get("message");

    const isEmail = (email: string) => {
      return isEmailValid(email, { allowUnderscore: true });
    }

    const validate = () => {
      if (!name) {
        return fail(400, { invalid: true, message: "Please have a name!" });
      }

      if (!email) {
        return fail(400, { invalid: true, message: "Please have an email!" });
      } else if (email && !isEmail(email as string)) {
        return fail(400, { invalid: true, message: "Your email must be in the proper format." });
      }

      if (typeof website !== "string") {
        return fail(400, { invalid: true, message: "If you have a website, it must be in the proper format." });
      } else if (website && !URL.canParse(website)) {
        return fail(400, { invalid: true, message: "Your website must be in the proper format." });
      }

      if (typeof message !== "string" || !message) {
        return fail(400, { invalid: true, message: "Message should be in the proper format" });
      }
    }

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
      console.log("body being sent: " + JSON.stringify(form));
      console.log("actual body " + response.body);
      const result = await response.json();
      if (!result.success) {
        return error(400, { message: "There was a problem sending the email. \n" + JSON.stringify(result) });
      }
    }

    const promises = [validate, checkProfanity, checkSpam, send];

    for (const fn of promises) {
      await fn();
    }

    return redirect(302, "/success");
  }
} satisfies Actions;