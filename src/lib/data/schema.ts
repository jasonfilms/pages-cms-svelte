import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, "You need a name."),
  email: z.string().email("This email is not in the right format."),
  "$website": z.union([z.string().url("This website is not in the right format.").nullish(), z.literal("")]),
  message: z.string().min(1, "You should say something."),
});