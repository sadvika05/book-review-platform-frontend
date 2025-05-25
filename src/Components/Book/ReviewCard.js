import { Star, User, Mail, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewCard({ name ="..loading", email ="..loading", stars ="5", review = "=..loading" }) {
    const rating = parseFloat(stars);
    
    return (
        <motion.div
            className="w-full bg-zinc-50 rounded-lg p-5 shadow-sm hover:shadow-md border border-gray-100 transition-shadow duration-300 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
        >
            <div className="relative">
                <Quote className="absolute text-gray-200 w-8 h-8 sm:w-10 sm:h-10 -top-2 -left-2 opacity-40" />
                
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-3">
                    <motion.div
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="bg-[#D4A373] bg-opacity-10 p-2 rounded-full">
                            <User size={18} className="text-[#D4A373]" />
                        </div>
                        <p className="text-base font-semibold text-gray-800">{name}</p>
                    </motion.div>
                    
                    <motion.div
                        className="flex items-center gap-2 text-gray-500 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                    >
                        <Mail size={14} className="text-gray-400" />
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">{email}</span>
                    </motion.div>
                    
                    <motion.div
                        className="flex gap-1 items-center ml-auto mt-2 sm:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={`transition-all duration-200 ${i < Math.floor(rating)
                                    ? "fill-[#D4A373] text-[#D4A373]"
                                    : i < Math.ceil(rating) && rating % 1 !== 0
                                        ? "fill-[#D4A373] text-[#D4A373] opacity-50"
                                        : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-sm font-medium text-gray-600 ml-1">{rating.toFixed(1)}</span>
                    </motion.div>
                </div>
                
                <motion.div
                    className="mt-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#D4A373] before:bg-opacity-30 before:rounded-full">
                        {review}
                    </p>
                </motion.div>
            </div>
            
            <motion.div
                className="w-full h-1 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent mt-4 opacity-30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
            />
        </motion.div>
    );
}