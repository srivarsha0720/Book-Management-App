import { useState } from 'react';
import { Book } from '@/shared/types';
import { Edit2, Eye, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onUpdateAuthor: (id: number, author: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onViewDetails: (book: Book) => void;
}

export default function BookCard({ book, onUpdateAuthor, onDelete, onViewDetails }: BookCardProps) {
  const [isUpdatingAuthor, setIsUpdatingAuthor] = useState(false);

  const handleUpdateAuthor = async () => {
    const newAuthor = prompt('Enter new author name:', book.author);
    if (newAuthor && newAuthor !== book.author) {
      setIsUpdatingAuthor(true);
      try {
        await onUpdateAuthor(book.id, newAuthor);
      } finally {
        setIsUpdatingAuthor(false);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      await onDelete(book.id);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <img
          src={book.cover_image_url}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 font-medium">
          by {book.author}
        </p>
        
        <p className="text-2xl font-bold text-purple-600">
          ${book.price.toFixed(2)}
        </p>
        
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleUpdateAuthor}
            disabled={isUpdatingAuthor}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Author
          </button>
          
          <button
            onClick={() => onViewDetails(book)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
          
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
