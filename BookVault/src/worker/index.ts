import { Hono } from "hono";
import { cors } from "hono/cors";
import { CreateBookSchema, UpdateBookAuthorSchema, UpdateBookPriceSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Get all books
app.get("/api/books", async (c) => {
  const db = c.env.DB;
  const result = await db.prepare("SELECT * FROM books ORDER BY created_at DESC").all();
  return c.json(result.results);
});

// Create a new book
app.post("/api/books", async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  
  const parsed = CreateBookSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.errors }, 400);
  }

  const { title, author, price, cover_image_url } = parsed.data;
  
  const result = await db
    .prepare("INSERT INTO books (title, author, price, cover_image_url) VALUES (?, ?, ?, ?)")
    .bind(title, author, price, cover_image_url)
    .run();

  const newBook = await db
    .prepare("SELECT * FROM books WHERE id = ?")
    .bind(result.meta.last_row_id)
    .first();

  return c.json(newBook, 201);
});

// Update book author
app.patch("/api/books/:id/author", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const body = await c.req.json();
  
  const parsed = UpdateBookAuthorSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.errors }, 400);
  }

  await db
    .prepare("UPDATE books SET author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(parsed.data.author, id)
    .run();

  const updatedBook = await db
    .prepare("SELECT * FROM books WHERE id = ?")
    .bind(id)
    .first();

  return c.json(updatedBook);
});

// Update book price
app.patch("/api/books/:id/price", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  const body = await c.req.json();
  
  const parsed = UpdateBookPriceSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.errors }, 400);
  }

  await db
    .prepare("UPDATE books SET price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(parsed.data.price, id)
    .run();

  const updatedBook = await db
    .prepare("SELECT * FROM books WHERE id = ?")
    .bind(id)
    .first();

  return c.json(updatedBook);
});

// Delete a book
app.delete("/api/books/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  
  await db
    .prepare("DELETE FROM books WHERE id = ?")
    .bind(id)
    .run();

  return c.json({ success: true });
});

export default app;
