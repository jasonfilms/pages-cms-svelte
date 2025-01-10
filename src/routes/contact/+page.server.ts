import type { Actions } from "./$types";
import { SECRET_KEY, ACCESS_KEY } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import { superValidate, message as serverMessage, setError } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "$lib/data/schema";

export const prerender = false;

async function checkProfanity(message: string) {
  const response = await fetch("https://vector.profanity.dev", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const result = await response.json();
  if (result.isProfanity) {
    return true;
  }
  return false;
};

async function checkSpam(token: string, ip: string) {
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
    return true;
  }
  return false;
}

async function send(form: FormData) {
  form.append("accessKey", ACCESS_KEY);
  const object = Object.fromEntries(form.entries());
  const response = await fetch("https://api.staticforms.xyz/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  });

  const result = await response.json();
  if (!result.success) {
    return true;
  }
  return false;
}

export const load = async () => {
  const form = await superValidate(zod(schema));
  return { form };
}

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const ip = request.headers.get("CF-Connecting-IP") as string;
    const token = form.get("cf-turnstile-response") as string;
    const message = form.get("message");

    const data = await superValidate(request, zod(schema));

    if (!data.valid) {
      return serverMessage(data, "invalid form");
    }

    const filter = await checkProfanity(message as string);
    if (filter) {
      return setError(data, "message", "Please do not curse or swear.");
    }

    const spam = await checkSpam(token, ip);
    if (spam) {
      return error(400, { message: "The provided Turnstile token was not valid!" });
    }

    const sendError = await send(form);
    if (sendError) {
      return error(400, { message: "There was a problem sending the email." });
    }

    return redirect(302, "/success");
  }
} satisfies Actions;