import * as z from 'zod';

export const schema = z.object({
  content: z.string().min(5),
  category:z.string().min(1),
})

export type ToDoPostFormData=z.infer<typeof schema>