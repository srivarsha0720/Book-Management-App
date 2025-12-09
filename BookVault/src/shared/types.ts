import z from "zod";

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  price: z.number(),
  cover_image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Book = z.infer<typeof BookSchema>;

export const CreateBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().positive("Price must be positive"),
  cover_image_url: z.string().url("Must be a valid URL"),
});

export type CreateBook = z.infer<typeof CreateBookSchema>;

export const UpdateBookAuthorSchema = z.object({
  author: z.string().min(1, "Author is required"),
});

export const UpdateBookPriceSchema = z.object({
  price: z.number().positive("Price must be positive"),
});
