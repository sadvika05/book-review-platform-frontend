import { CloudAlert, CircleX, CircleCheck } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

export default function Notification({statusCode = "200", message = "ashwin is a good boye"}){
    return (
        <AnimatePresence>
            <motion.div
                className={`fixed  bottom-4 right-4 md:bottom-6 md:right-6 rounded-lg shadow-lg p-3 flex items-center justify-between max-w-xs sm:max-w-sm md:max-w-md ${
                    statusCode >= 500 ? 'bg-error text-white' :
                        statusCode >= 400 ? 'bg-yellow-200 text-yellow-800' :
                            statusCode >= 200 ? 'bg-success text-white' :
                                'bg-blue-500 text-white'
                }`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="mr-3 text-sm sm:text-base flex-grow">
                    {message}
                </div>
                <div className="flex-shrink-0">
                    {
                        statusCode >= 500 ? <CloudAlert className="h-5 w-5 animate-pulse" />
                            : statusCode >= 400 ? <CircleX className="h-5 w-5 animate-pulse" />
                                : statusCode >= 200 ? <CircleCheck className="h-5 w-5 animate-pulse" />
                                    : <div className="w-5 h-5 relative">
                                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full opacity-75 animate-ping"></div>
                                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full"></div>
                                    </div>
                    }
                </div>
            </motion.div>
        </AnimatePresence>
    )
}