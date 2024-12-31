import type { Actions } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { TOKEN, RECIPIENT } from "$env/static/private";

export const prerender = false;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const transport = nodemailer.createTransport(MailtrapTransport({
      token: TOKEN
    }));
    try {
      transport.sendMail({
        from: data.get("email") as string,
        to: RECIPIENT,
        subject: `Contact Form: ${data.get("name") as string}`,
        text: data.get("message") as string,
      });
    } catch (e) {
      console.error(e);
    }
  }
} satisfies Actions;