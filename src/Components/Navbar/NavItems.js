import { useState } from "react";
import { motion } from 'framer-motion';
import { Home, Library, MessageSquareHeart, ChevronRight } from 'lucide-react';

export function NavItems({ currentPage }) {
    const [items] = useState([
        {
            title: "Home",
            destination: "#home",
            icon: Home
        },
        {
            title: "Our Library",
            destination: "#review",
            icon: Library
        },
        {
            title: "User Reviews",
            destination: "#testimonials",
            icon: MessageSquareHeart
        }
    ]);
    
    return (
        <>
            {currentPage === "Home" ? (
                <>
                    {items.map((item, index) => (
                        <motion.a
                            href={item.destination}
                            key={index}
                            className="font-header text-[#2D2420] hover:text-[#D4A373] transition-colors duration-300 font-semibold mx-4 text-left flex items-center group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                        >
                            <item.icon
                                className="w-5 h-5 mr-2 group-hover:text-[#D4A373] transition-colors duration-300"
                                strokeWidth={2}
                            />
                            <span className="text-base tracking-wide">{item.title}</span>
                            <motion.div
                                className="h-[2px] w-0 bg-[#D4A373] mt-1 absolute bottom-[-4px] left-0"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}
                </>
            ) : (
                <motion.a
                    href="/"
                    className="font-header text-[#2D2420] hover:text-[#D4A373] transition-colors duration-300 font-semibold mx-4 text-left flex items-center group relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                    }}
                >
                    <Home
                        className="w-5 h-5 mr-2 group-hover:text-[#D4A373] transition-colors duration-300"
                        strokeWidth={2}
                    />
                    <span className="text-base tracking-wide">Back to Home</span>
                    <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                    <motion.div
                        className="h-[2px] w-0 bg-[#D4A373] mt-1 absolute bottom-[-4px] left-0"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.a>
            )}
        </>
    );
}