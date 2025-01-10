import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  email: z.string().email("This email is not in the right format!"),
  "$website": z.string().url("This website is not in the right format!").optional(),
  message: z.string(),
});