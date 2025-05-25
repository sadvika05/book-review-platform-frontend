import { useContext, useEffect, useState } from 'react';
import { Smile } from 'lucide-react';
import {Search, Star} from 'lucide-react';
import BookCard from './BookCard';
import api from "./../../../api"
import {motion} from "framer-motion"

export default function FeatureBooks() {
    const [categories, setCategories] = useState([
        'Fiction',
        'Non-Fiction',
        'Science Fiction',
        'Mystery',
        'Biography',
        'Romance',
        'Fantasy',
        'Adventure',
        'Philosophy',
    ]);
    const [showBooks, setShowBooks] = useState([]);
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchBookName, setSearchBookName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [lengthPagination, setLengthPagination] = useState(1);
    const [selectedPagination, setSelectedPagination] = useState(0);
    const [noBooks, setNoBooks] = useState(6);
    
    useEffect(() => {
        if(!books) return
        
        let filteredBooks = books;
        
        if (selectedCategory.length > 0) {
            filteredBooks = filteredBooks.filter(book =>
                book.category.some(cat => selectedCategory.includes(cat))
            );
        }
        
        if (searchBookName.length > 0) {
            filteredBooks = filteredBooks.filter(book =>
                book.name.toLowerCase().includes(searchBookName.toLowerCase())
            );
        }
        
        setShowBooks(filteredBooks);
        setSelectedPagination(0);
        setLengthPagination(Math.ceil(filteredBooks?.length / noBooks));
    }, [selectedCategory, searchBookName, books]);
    
    useEffect(() => {
        api.get("/book/all-book-details").then(res => {
            const response = res.data;
            setBooks(response.data);
            setLoading(false);
        })
    },[])
    
    return (
        <section
            id="review"
            className="relative overflow-hidden w-full px-4 py-8 md:py-12"
        >
            <motion.h2
                className="text-center font-header text-2xl md:text-4xl italic text-accent font-bold mb-6 md:mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, type: "easeIn" }}
                viewport={{ once: true, amount: 0.05 }}
            >
                Feature Books
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto">
                <motion.div
                    className="w-full md:w-1/3 order-1 md:order-2"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "easeIn" }}
                    viewport={{ once: true, amount: 0.05 }}
                >
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full p-3 pr-10 rounded-lg outline-none text-primaryText font-body bg-bg border border-accent/30 focus:border-accent transition-all duration-300"
                            value={searchBookName}
                            onChange={(e) => setSearchBookName(e.target.value)}
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent/60" />
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:w-2/3 order-2 md:order-1"
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "easeIn" }}
                    viewport={{ once: true, amount: 0.05 }}
                >
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map((category, index) => (
                            <button
                                className={`py-2 px-4 rounded-lg text-sm md:text-base transition-all duration-300 border font-[550] ${
                                    selectedCategory.includes(category)
                                        ? "bg-accent text-bg border-accent font-medium"
                                        : "border-accent/40 text-primaryText hover:bg-accent/10"
                                }`}
                                key={index}
                                onClick={() =>
                                    setSelectedCategory((prevState) => {
                                        if (prevState.includes(category)) {
                                            return prevState.filter(
                                                (currCategory) =>
                                                    currCategory !== category
                                            );
                                        } else {
                                            return [...prevState, category];
                                        }
                                    })
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="mt-8 w-full max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-center justify-center align-middle justify-items-center">
                {loading ? (
                    <>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                        <div className="w-full h-[100px] bg-gray-400 rounded  animate-pulse"></div>
                    </>
                ) : (
                    showBooks
                        ?.slice(
                            selectedPagination * noBooks,
                            selectedPagination * noBooks + noBooks
                        )
                        .map((book, index) => (
                            <BookCard Book={book} key={index} />
                        ))
                )}
                {!loading && showBooks?.length === 0 && (
                    <motion.div
                        className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 m-2 relative flex flex-col sm:h-56 md:h-64 col-span-2 md:col-span-3"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 font-body mb-3">
                                    You are Having A Unique Taste
                                </h3>
                                <div className="flex items-center my-3">
                                    <Smile className="w-6 h-6 text-yellow-500 mr-2" />
                                    <p className="text-gray-600 italic">
                                        We are not having Any Book
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                                    <p className="text-sm text-blue-700">
                                        Try searching for a different category
                                        or check back later for new additions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <div className="mt-4 flex justify-center items-center gap-3">
                {Array.from({ length: lengthPagination }).map((_, index) => (
                    <div
                        className={`cursor-pointer py-2 px-3 border border-accent border-solid text-sm rounded-xl text-semibold ${
                            selectedPagination === index
                                ? "bg-highlight text-bg"
                                : ""
                        }`}
                        onClick={() => setSelectedPagination(index)}
                        key={index}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </section>
    );
}