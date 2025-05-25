import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SquareX, ArrowRightCircle, Star } from 'lucide-react';

export default function AddReviewCard({ changePageStatus, handleAddReview }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    
    const handleRating = star => {
        setRating(star);
    };
    
    const handleReviewChange = e => {
        setReview(e.target.value);
    };
    
    const onSubmit = e => {
        e.preventDefault();
        handleAddReview(review, rating);
    };
    
    return (
        <motion.div
            className="fixed inset-0 bg-bg z-50 flex justify-center items-center p-2 sm:p-4 bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.form
                className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-[90%] sm:max-w-[450px] md:max-w-[500px] relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                onSubmit={onSubmit}
            >
                <div className="relative mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-header font-semibold text-primary-text text-center text-accent pr-6">
                        Add Your Review
                    </h2>
                    <SquareX
                        className="text-red-600 absolute top-0 right-0 cursor-pointer hover:bg-red-600 hover:text-white hover:rounded-md transition-all duration-300 w-5 h-5 sm:w-6 sm:h-6"
                        onClick={() => changePageStatus()}
                    />
                </div>
                
                <div className="mb-3 sm:mb-4">
                    <textarea
                        placeholder="Share your thoughts about this book..."
                        className="w-full h-24 sm:h-32 p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base"
                        value={review}
                        onChange={handleReviewChange}
                        required
                        autoFocus
                    />
                </div>
                
                <div className="mb-3 sm:mb-4 flex w-full justify-between items-center">
                    <p className="font-semibold font-header text-accent text-sm sm:text-base">
                        Rating
                    </p>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                className={`cursor-pointer transition-all ${star <= rating ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`}
                                fill={star <= rating ? 'currentColor' : 'none'}
                                onClick={() => handleRating(star)}
                            />
                        ))}
                    </div>
                </div>
                
                <div className="flex gap-2 sm:gap-3 justify-end">
                    <button
                        className="flex justify-center items-center gap-1 sm:gap-2 bg-hilight bg-accent duration-200 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all text-sm sm:text-base"
                        type="submit"
                    >
                        <span className="font-body">Add Review</span>
                        <ArrowRightCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
}