import { useState } from 'react';
import { useBooks } from '@/react-app/hooks/useBooks';
import BookCard from '@/react-app/components/BookCard';
import AddBookSidebar from '@/react-app/components/AddBookSidebar';
import BookDetailsModal from '@/react-app/components/BookDetailsModal';
import { Loader2, BookOpen, PlusCircle } from 'lucide-react';
import { Book } from '@/shared/types';

export default function Home() {
  const { books, loading, error, addBook, updateAuthor, deleteBook } = useBooks();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="animate-spin">
          <Loader2 className="w-12 h-12 text-purple-600" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-red-600 font-semibold text-lg">Error loading books</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BookVault
                </h1>
                <p className="text-sm text-gray-600 font-medium">Manage your collection</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <PlusCircle className="w-5 h-5" />
              Add Book
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {books.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No books yet</h2>
              <p className="text-gray-600 mb-6">Start building your collection by adding a book</p>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Add Your First Book
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onUpdateAuthor={updateAuthor}
                onDelete={deleteBook}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sidebar */}
      <AddBookSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAddBook={addBook}
      />

      {/* Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
