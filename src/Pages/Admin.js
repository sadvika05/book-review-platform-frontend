import useAuth from "../Hooks/UseAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AddBook from "../Components/Admin/AddBook";
import DeleteBook from "../Components/Admin/DeleteBook";
import SuggestionBook from "../Components/Admin/SuggestionBook";

export default function Admin() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(0);
    
    const navItems = [
        { title: "Add Book", index: 1 },
        { title: "Delete Book", index: 2 },
        { title: "Suggestions", index: 3 },
    ];
    
    useEffect(() => {
        if (auth.role !== "admin") {
            return navigate("/unauthorized");
        }
        api.get("/admin/check").catch((error) => {
            if (error.response.status === 401) {
                return navigate("/unauthorized");
            }
        });
    }, [auth]);
    
    const handleLogout = () => {
        setAuth({});
        navigate("/login");
    };
    
    const goHome = () => {
        navigate("/");
    };
    
    return (
        <div className="w-screen h-screen flex bg-gray-100">
            
            <div className="w-[15vw] h-screen bg-white border-r-2 border-primary flex flex-col justify-between py-8 px-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-primary mb-8 font-header">Welcome Admin</h1>
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.index}
                                onClick={() => setOpenIndex(item.index)}
                                className={`text-left px-4 py-2 rounded-md font-medium transition font-body ${
                                    openIndex === item.index
                                        ? "bg-primary text-white"
                                        : "text-gray-700 hover:bg-primary hover:text-white"
                                }`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="flex flex-col gap-4">
                    <button
                        onClick={goHome}
                        className="w-full  text-primary border border-primary py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                    >
                        Home
                    </button>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            <div className="w-[85vw] h-screen p-8 overflow-y-auto">
                {openIndex === 0 && (
                    <div className="text-3xl font-semibold text-center text-gray-600 mt-20">
                        Select an Option
                    </div>
                )}
                {openIndex === 1 && <AddBook />}
                {openIndex === 2 && <DeleteBook />}
                {openIndex === 3 && <SuggestionBook />}
            </div>
        </div>
    );
}
