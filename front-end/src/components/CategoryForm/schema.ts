import * as z from 'zod';

export const schema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type CategoryFormData = z.infer<typeof schema>;