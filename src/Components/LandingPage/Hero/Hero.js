import bgImage from '../../../Assets/bgImage.png';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section
            id="home"
            className="relative z-10 h-[60vh] w-full flex justify-center items-center"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <motion.div
                className="absolute inset-0 bg-black/40 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            ></motion.div>
            
            <div className="relative z-20 px-4 max-w-4xl">
                <motion.h1
                    className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white font-header mb-2 md:mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                        delay: 0.2
                    }}
                >
                    Discover Your Next Favorite Book
                </motion.h1>
                
                <motion.p
                    className="text-center text-base sm:text-xl md:text-2xl font-medium text-white font-header max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 50,
                        delay: 0.5
                    }}
                >
                    Join our community of book lovers to find great books, share your thoughts, and connect with fellow readers.
                </motion.p>
                
                <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.button
                        className="px-6 py-3 bg-[#5C4033] text-[#F8F5F0] rounded-lg font-semibold shadow-lg hover:bg-[#8B4513] transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a href="#review">Explore Books</a>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}