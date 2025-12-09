
CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price REAL NOT NULL,
  cover_image_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, price, cover_image_url) VALUES
  ('The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
  ('To Kill a Mockingbird', 'Harper Lee', 14.99, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
  ('1984', 'George Orwell', 13.99, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'),
  ('Pride and Prejudice', 'Jane Austen', 11.99, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'),
  ('The Catcher in the Rye', 'J.D. Salinger', 13.49, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400'),
  ('Brave New World', 'Aldous Huxley', 12.49, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400');
