import { useState, useEffect } from "react";
import api from "../../api";
import Notification from "../Notification";
import { Trash2, Book, AlertCircle } from "lucide-react";
import {useNavigate} from  "react-router-dom";

export default function DeleteBook() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [toaster, setToaster] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    const fetchBooks = async () => {
        setIsLoading(true);
        api.get("/book/all-book-details")
            .then((response) => {
                setBooks(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setToaster({ statusCode: 500, message: "Failed to fetch books" });
                setIsLoading(false);
            });
    };
    
    useEffect(() => {
        fetchBooks();
    }, []);
    
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    
    const handleDelete = (bookId, bookName) => {
        setBookToDelete({ id: bookId, name: bookName });
        setConfirmDelete(true);
    };
    
    const confirmDeletion = () => {
        setToaster({ statusCode: 100, message: "Deleting book..." });
        api.delete(`/book/delete-book?id=${bookToDelete.id}`)
            .then((response) => {
                setToaster({ statusCode: 200, message: "Book deleted successfully!" });
                setConfirmDelete(false);
                setBooks(books.filter((book) => book._id !== bookToDelete.id));
                fetchBooks();
            })
            .catch((error) => {
                if(error.status === 401){
                    return navigate("/login");
                }
                setToaster({ statusCode: 500, message: "Failed to delete book." });
                setConfirmDelete(false);
            });
    };
    
    const cancelDeletion = () => {
        setConfirmDelete(false);
    };
    
    const totalPages = Math.ceil(books.length / booksPerPage);
    
    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-8">
                <Book className="text-primaryText mr-3" size={28} />
                <h2 className="text-3xl font-bold text-primaryText">Manage Books</h2>
            </div>
            
            {toaster && <Notification message={toaster.message} statusCode={toaster.statusCode} />}
            
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            ) : (
                <>
                    {currentBooks.length > 0 ? (
                        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-gray-900">Book Title</th>
                                    <th className="px-6 py-4 font-medium text-gray-900">Author</th>
                                    <th className="px-6 py-4 font-medium text-gray-900 text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {currentBooks.map((book) => (
                                    <tr key={book._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{book.name}</td>
                                        <td className="px-6 py-4 text-gray-700">{book.author}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(book._id, book.name)}
                                                className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-red-700 transition hover:bg-red-200"
                                            >
                                                <Trash2 size={16} />
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                            <AlertCircle size={48} className="text-gray-400 mb-4" />
                            <p className="text-lg text-gray-600">No books available in the library.</p>
                            <p className="text-sm text-gray-500 mt-2">Books you add will appear here</p>
                        </div>
                    )}
                    
                    {books.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium">{indexOfFirstBook + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(indexOfLastBook, books.length)}
                                </span>{" "}
                                of <span className="font-medium">{books.length}</span> books
                            </p>
                            
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {confirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-2">Are you sure you want to delete:</p>
                        <p className="font-medium text-gray-900 mb-6 bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                            {bookToDelete.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
                        <div className="flex gap-4 justify-end">
                            <button
                                onClick={cancelDeletion}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeletion}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center"
                            >
                                <Trash2 size={16} className="mr-2" />
                                Delete Book
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}