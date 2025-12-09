import { useState, useEffect, useCallback } from 'react';
import { Book, CreateBook } from '@/shared/types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async (book: CreateBook) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error('Failed to add book');
      await fetchBooks();
    } catch (err) {
      throw err;
    }
  };

  const updateAuthor = async (id: number, author: string) => {
    try {
      const response = await fetch(`/api/books/${id}/author`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author }),
      });
      if (!response.ok) throw new Error('Failed to update author');
      await fetchBooks();
    } catch (err) {
      throw err;
    }
  };

  const updatePrice = async (id: number, price: number) => {
    try {
      const response = await fetch(`/api/books/${id}/price`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }),
      });
      if (!response.ok) throw new Error('Failed to update price');
      await fetchBooks();
    } catch (err) {
      throw err;
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete book');
      await fetchBooks();
    } catch (err) {
      throw err;
    }
  };

  return {
    books,
    loading,
    error,
    addBook,
    updateAuthor,
    updatePrice,
    deleteBook,
    refetch: fetchBooks,
  };
}
