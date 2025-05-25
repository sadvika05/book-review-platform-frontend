import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';

export default function LoginNotification({ closeFunction }) {
    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-primary font-header">Authentication Required</h3>
                    <button
                        onClick={() => closeFunction()}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-150 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="Close"
                    >
                        
                        <CircleX className="w-5 h-5" color="red"/>
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="rounded-md bg-slate-100  p-4 mb-6">
                        <p className="text-center text-primary font-semibold">
                            Kindly Login or Sign Up to continue using all features
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 items-center">
                        <Link
                            to="/login"
                            className="w-full sm:w-1/2 py-2.5 px-4 bg-primary hover:bg-bg hover:text-primaryText text-white hover:border-primary border font-medium rounded-lg text-center transition-all duration-200 shadow-sm"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="w-full sm:w-1/2 py-2.5 px-4 border border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-lg text-center transition-all duration-200 focus:outline-none"
                        >
                            Sign Up
                        </Link>
                    </div>
                    
                    <button
                        onClick={() => closeFunction()}
                        className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 text-center py-2"
                    >
                        Continue browsing
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}