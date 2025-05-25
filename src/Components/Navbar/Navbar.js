import { useContext, useState } from 'react';
import { NavItems } from "./NavItems";
import {User, Menu, X, Home, ChevronRight} from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from "../../Hooks/UseAuth";
import api from "../../api";
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ currentPage = "Home" }) {
    const navigate = useNavigate();
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { auth, setAuth } = useAuth();
    
    const closeSideBar = () => {
        setSideBarOpen(false);
    }
    
    const logoutUser = () => {
        api.delete("/auth/logout").then((response) => {
            setAuth({
                id:null,
                role: null,
            })
            window.location.href="/"
        }).catch((error) => {
            console.log("something went wrong")
        })
    }
    
    return (
        <motion.nav
            className={` ${currentPage !== "loginPage" && currentPage !== "signupPage" ? "sticky" : "fixed" } flex py-4 px-6 w-full justify-between items-center bg-[#F8F5F0] border-b-2 border-b-[#8B4513]/40 shadow-md  top-0 z-40 font-header`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
            <motion.button
                className="font-header text-xl text-[#8B4513] italic font-bold cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => navigate("/#home")}
            >
                <a href="#home">BookCritic</a>
            </motion.button>
            {window.innerWidth > 762 ? (
                <>
                    <div className="flex justify-center items-center gap-6">
                        <NavItems currentPage={currentPage} />
                        {auth?.role === 'admin' && (
                            <motion.a
                                href="/admin"
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
                                
                                <span className="text-base tracking-wide">Admin Dashboard</span>
                                <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                                <motion.div
                                    className="h-[2px] w-0 bg-[#D4A373] mt-1 absolute bottom-[-4px] left-0"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        )}
                    </div>
                    {auth?.id ? (
                        <div className="flex items-center gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <User
                                    className="w-6 h-6 cursor-pointer text-[#5C4033] hover:text-[#D4A373] transition-colors duration-200"
                                    onClick={() => navigate('/profile')}
                                />
                            </motion.div>
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg text-[#5C4033] hover:bg-[#5C4033] hover:text-[#F8F5F0] transition-colors duration-300 font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => logoutUser()}
                            >
                                Logout
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg bg-[#5C4033] text-[#F8F5F0] font-header hover:bg-[#F8F5F0] hover:text-[#5C4033] transition-colors duration-300 font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </motion.button>
                            <motion.button
                                className="p-2 border border-[#5C4033] rounded-lg text-[#5C4033]  transition-colors duration-300 hover:border-[#5C4033]  hover:bg-[#5C4033] hover:text-[#F8F5F0] font-semibold tracking-wider"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/signup")}
                            >
                                SignUp
                            </motion.button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {!sideBarOpen ? (
                            <Menu
                                onClick={() => setSideBarOpen(true)}
                                className="cursor-pointer text-[#8B4513] hover:text-[#5C4033] transition-colors duration-200"
                            />
                        ) : (
                            <X
                                onClick={() => setSideBarOpen(false)}
                                className="cursor-pointer text-[#8B4513] hover:text-[#5C4033] transition-colors duration-200 z-50"
                            />
                        )}
                    </motion.div>
                    <AnimatePresence>
                        {sideBarOpen && (
                            <Sidebar
                                closeSideBar={closeSideBar}
                                logoutUser={logoutUser}
                                currentPage={currentPage}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </motion.nav>
    );
}
