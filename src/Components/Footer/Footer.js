import { Heart, Github, Linkedin } from 'lucide-react';
import {motion} from 'framer-motion';

export default function Footer({isloading = false}) {
    return (
        <footer className={`w-full bg-bg border-t-2 border-t-accent/40 text-primaryText overflow-hidden ${isloading ? 'bottom-0 absolute' : ''}`}
                       >
            <motion.div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
                initial={{  opacity: 0 }}
                whileInView={{opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
                viewport={{ once: true, amount: 0.05 }}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="flex justify-evenly items-center w-full">
                        <p className="text-md lg:text-xl mb-2 font-header font-bold text-accent">For All the Book Lovers</p>
                    </div>
                    
                    <div className="flex space-x-4">
                        <p className="text-sm lg:text-lg flex items-center gap-1 font-header text-semibold">
                            Made With <Heart className="text-red-700" size={18} fill="currentColor" /> by Ashwin SI
                        </p>
                        <a href="https://github.com/sadvika05" target="_blank" className="text-accent hover:text-highlight transition-colors duration-200">
                            <Github size={22} />
                        </a>
                        <a href="https://www.linkedin.com/in/sadvika-chitteti-788479270/" target="_blank" className="text-accent hover:text-highlight transition-colors duration-200">
                            <Linkedin size={22} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}