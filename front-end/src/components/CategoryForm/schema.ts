import * as z from "zod";

export const colorSchema = z.enum(["#f7d0cf", "#d5e4f5", "#d1cefb", "#dff1d8"]);

export type ColorType = z.infer<typeof colorSchema>;

export const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  color: colorSchema,
});

export type CategoryFormData = z.infer<typeof schema>;
