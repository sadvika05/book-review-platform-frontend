import { User } from 'lucide-react';
import { NavItems } from './NavItems';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../Hooks/UseAuth";
import { motion } from 'framer-motion';

export default function Sidebar({ closeSideBar, logoutUser, currentPage }) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    
    return (
        <motion.div
            className="fixed top-0 left-0 w-[50vw] h-[100vh] z-50 bg-[#F8F5F0] border-r border-[#8B4513]/40 shadow-lg flex flex-col"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <div className="flex justify-end p-4">
                <motion.button
                    onClick={closeSideBar}
                    className="text-[#8B4513] hover:text-[#5C4033] transition-colors duration-200"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    ✕
                </motion.button>
            </div>
            <motion.div
                className="flex flex-col gap-4 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex-col flex justify-center items-center gap-6 text-left w-full">
                    <NavItems currentPage={currentPage} />
                </div>
            </motion.div>
            <motion.div
                className="flex flex-col gap-4 p-6 mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {
                    !auth?.id ?
                        <div className="mt-6 pt-6 border-t border-[#8B4513]/20 flex flex-col gap-3">
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg bg-[#5C4033] text-[#F8F5F0] font-header hover:bg-[#F8F5F0] hover:text-[#5C4033] transition-colors duration-300 font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    navigate("/login");
                                    closeSideBar();
                                }}
                            >
                                Login
                            </motion.button>
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg text-[#5C4033] hover:bg-[#5C4033]/10 transition-colors duration-300 hover:bg-[#5C4033] hover:text-[#F8F5F0] font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    navigate("/signup");
                                    closeSideBar();
                                }}
                            >
                                SignUp
                            </motion.button>
                        </div>
                        :
                        <div className="flex items-center gap-4 justify-center flex-col">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    navigate('/profile');
                                    closeSideBar();
                                }}
                            >
                                <User className="w-6 h-6 cursor-pointer hover:text-[#D4A373] transition-colors duration-200 text-[#5C4033]" />
                            </motion.div>
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg text-[#5C4033] hover:bg-[#5C4033]/10 transition-colors duration-300 hover:bg-[#5C4033] hover:text-[#F8F5F0] font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    logoutUser();
                                    closeSideBar();
                                }}
                            >
                                Logout
                            </motion.button>
                        </div>
                }
            </motion.div>
        </motion.div>
    );
}