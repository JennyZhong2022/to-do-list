import * as z from 'zod';

export const schema = z.object({
  content: z.string().min(5, "Please enter at least 5 character(s)"),
  categoryId: z
  .number({
    invalid_type_error: "Please select a category"
  })
})

export type ToDoPostFormData=z.infer<typeof schema>