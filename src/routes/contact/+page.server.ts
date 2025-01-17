import type { Actions } from "./$types";
import { error, redirect, fail } from "@sveltejs/kit";
import { superValidate, setError, actionResult } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "$lib/data/schema";
// import { ACCESS_KEY, SECRET_KEY } from "$env/static/private";

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
  form.append("secret", import.meta.env["SECRET_KEY"]);
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
  form.append("accessKey", import.meta.env["ACCESS_KEY"]);
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
  return { form: await superValidate(zod(schema), { errors: false }) };
}

export const actions = {
  default: async (event) => {
    const form = await event.request.formData();
    const ip = event.request.headers.get("CF-Connecting-IP") as string;
    const token = form.get("cf-turnstile-response") as string;
    const message = form.get("message");

    const body = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      "$website": form.get("$website") as string,
      message: message as string,
    };
    const data = await superValidate(body, zod(schema));

    if (!data.valid) {
      return fail(400, { message: "Invalid form." });
    }

    const filter = await checkProfanity(message as string);
    if (filter) {
      return setError(data, "message", "Please do not curse or swear.");
    }

    // const spam = await checkSpam(token, ip);
    // if (spam) {
    //   return error(400, { message: "The provided Turnstile token was not valid!" });
    // }

    // const sendError = await send(form);
    // if (sendError) {
    //   return error(400, { message: "There was a problem sending the email." });
    // }

    // const response = await event.fetch("/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   body: new URLSearchParams(form).toString(),
    // });

    // const result = await response.text();
    // console.log(result);
    // return redirect(302, "/success");
    return actionResult("success", body, 200);
  }
} satisfies Actions;