import { Star } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {motion} from "framer-motion"

export default function BookCard({ Book }) {
    const navigate = useNavigate();
    
    return (
        <motion.div
            className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300 m-2 relative flex flex-col  sm:h-56 md:h-64 capitalize"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            viewport={{ once: true, amount: 0.05 }}
        >
            <div className="p-4 sm:p-6 flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 font-body">
                    {Book?.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1 font-body">
                    By {Book?.author}
                </p>
            </div>

            <div className="p-3 sm:p-4 flex flex-col lg:flex-row justify-between items-center bg-gray-50 w-full mt-auto">
                <div className="flex items-center gap-1">
                    <Star
                        fill="#D4A373"
                        color="#D4A373"
                        size={18}
                        className="sm:w-5 sm:h-5"
                    />
                    {Book?.stars === -1 ? (
                        <p className="font-medium text-gray-700 text-sm sm:text-base">
                            No Reviews
                        </p>
                    ) : (
                        <p className="font-medium text-gray-700 text-sm sm:text-base">
                            {Book?.stars}
                        </p>
                    )}
                </div>
                <div>
                    <button
                        className="px-3 py-1 mt-2 lg:mt-0 sm:px-4 sm:py-2 bg-primary text-white text-sm sm:text-base font-medium rounded hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        onClick={() => navigate(`book/${Book?._id}`)}
                    >
                        Reviews
                    </button>
                </div>
            </div>
        </motion.div>
    );
}