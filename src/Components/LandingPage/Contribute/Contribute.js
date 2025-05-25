import React, { useState, useEffect } from "react";
import {motion} from "framer-motion"
import image from "../../../Assets/contributeBook.png";
import api from "../../../api";
import useAuth from "../../../Hooks/UseAuth"
import LoginNotification from "../../LoginNotification/LoginNotification";

export default function Contribute() {
    const [formData, setFormData] = useState({
        bookName: "",
        authorName: "",
        reason: ""
    });
    const [loginFlag, setLoginFlag] = useState(false);
    const {auth, setAuth} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [showExisit, setShowExisit] = useState(false);
    const [showImage, setShowImage] = useState(false);
    
    // Handle responsive image display
    useEffect(() => {
        const checkScreenWidth = () => {
            setShowImage(window.innerWidth > 768);
        };
        
        checkScreenWidth();
        window.addEventListener('resize', checkScreenWidth);
        
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, []);
    
    const validate = () => {
        const newErrors = {};
        if (!formData.bookName.trim()) newErrors.bookName = "Book name is required";
        if (!formData.authorName.trim()) newErrors.authorName = "Author name is required";
        if (!formData.reason.trim()) newErrors.reason = "Please provide a reason for your suggestion";
        else if (formData.reason.trim().length < 10) newErrors.reason = "Reason should be at least 10 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };
    
    const closeLogin = () =>{
        setLoginFlag(false);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        if(!auth.id|| !auth.role){
            setLoginFlag(true);
            return;
        }
        
        
        setIsSubmitting(true);
        
        try {
            api.post("/user/contribute-book",{
                bookName: formData.bookName,
                authorName: formData.authorName,
                reason: formData.reason,
            }).then(res => {
                setFormData({ bookName: "", authorName: "", reason: "" });
                setShowSuccess(true);
            }).catch(err => {
                setShowExisit(true)
            }).finally(() => {
                setTimeout(() => {setShowSuccess(false); setShowExisit(false)}, 5000);
            })
           
        } catch (error) {
            console.error("Error submitting book suggestion:", error);
            alert("There was an error submitting your suggestion. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="suggest" className="w-full px-4 py-12 md:py-16 ">
            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-2xl font-bold text-primaryText mb-3 font-header">Suggest a New Book</h2>
                            <p className="text-secondary text-sm md:text-xl font-header ">
                                Help us grow our collection by suggesting books that have impacted you.
                                Your recommendations make our library better!
                            </p>
                        </div>
                        {
                            loginFlag && <LoginNotification closeFunction={closeLogin}/>
                        }
                        {showSuccess && (
                            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative font-header" role="alert">
                                <strong className="font-bold">Thank you! </strong>
                                <span className="block sm:inline">Your book suggestion has been submitted successfully.</span>
                            </div>
                        )}
                        {showExisit && (
                            <div className="mb-6 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative font-header" role="alert">
                                <span className="block sm:inline">Book Already Exist in your Library</span>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Book Name*
                                </label>
                                <input
                                    type="text"
                                    id="bookName"
                                    name="bookName"
                                    value={formData.bookName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-800 ${
                                        errors.bookName ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter the book title"
                                />
                                {errors.bookName && <p className="mt-1 text-sm text-red-600">{errors.bookName}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Author Name*
                                </label>
                                <input
                                    type="text"
                                    id="authorName"
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-800 ${
                                        errors.authorName ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Enter the author's name"
                                />
                                {errors.authorName && <p className="mt-1 text-sm text-red-600">{errors.authorName}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Why should we add this book?*
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-800 ${
                                        errors.reason ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder="Tell us why this book would be a valuable addition..."
                                ></textarea>
                                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                                <p className="mt-1 text-xs text-gray-500">Minimum 10 characters</p>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-6 bg-primary  hover:bg-bg hover:text-primary text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Suggestion"
                                )}
                            </button>
                        </form>
                    </motion.div>
                    
                    {showImage && (
                        <motion.div className="w-full md:w-1/2 flex justify-center"
                                    initial={{ x: 100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 1, type: "spring" }}
                                    viewport={{ once: true, amount: 0.05 }}>
                            <img
                                src={image}
                                alt="Suggest a book illustration"
                                className="max-w-full rounded-lg  transition-all duration-300 transform hover:-translate-y-2"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}