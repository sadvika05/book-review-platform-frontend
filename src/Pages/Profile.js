// Profile.jsx
import Header from "./../Components/Profile/Header";
import { useState, useEffect } from "react";
import image from "../Assets/profileAvator.png";
import noReviewImage from "../Assets/addBookReview.jpeg"
import { FaEdit, FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import ReviewCard from "../Components/Profile/ReviewCard";
import Footer from "../Components/Footer/Footer";
import {useNavigate} from "react-router-dom";
import api from "../api"
import useAuth from "../Hooks/UseAuth";
import Navbar from "../Components/Navbar/Navbar";

export default function Profile() {
    const [user, setUser] = useState(null);
    const {auth, setAuth} = useAuth();
    const [reviews, setReviews] = useState(null);
    const [currPageNo, setCurrPageNo] = useState(null);
    const [totalNoPages, setTotalNoPages] = useState(null);
    const [viewReview, setViewReview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!reviews) return;
        setViewReview(reviews.slice(currPageNo * 3, currPageNo * 3 + 3));
    },[currPageNo]);
    
    useEffect(() => {
        if(!reviews) return;
        setTotalNoPages(Math.ceil(reviews.length / 3));
        setCurrPageNo(0);
    },[reviews])
    
    useEffect(() => {
        api.get("/user/get-user-details").then((res) => {
            const response = res.data;
            setAuth({
                id: response.user._id,
                role: response.user.role,
            })
            setUser(response.user)
            setReviews(response.reviews)
            setIsLoading(false);
        }).catch((err) => {
            const response = err.response;
            if(err.status === 401){
                navigate("/login");
            }
        })
    }, []);
    
    return (
        <div className="relative min-h-screen bg-background ">
            <Navbar currentPage={"Profile"} />
            <div className="max-w-4xl mx-auto bg-white rounded-xl  overflow-hidden">
                <div className="p-6 sm:p-10">
                    <h1 className="font-header text-2xl sm:text-3xl font-bold text-primary mb-6 border-b border-highlight pb-3">Profile Information</h1>
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-10 py-6 border-b-highlight border-b-2">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-accent">
                                    <img
                                        src={image}
                                        alt="Profile avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex-1 mt-6 md:mt-0">
                            {isLoading ? (
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                                </div>
                            ) : (
                                <div className="bg-background rounded-lg p-5 ">
                                    <Header
                                        email={user?.email}
                                        name={user?.name}
                                    />
                                </div>
                            )}
                            
                        </div>
                    </div>
                    <div className="min-h-[50vh]">
                        <h2 className="text-xl sm:text-2xl font-semibold text-primary my-6 font-header">Reviews Made Up You</h2>
                        {
                            isLoading ? (
                                <>
                                    <div className="animate-pulse mb-2">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                    <div className="animate-pulse mb-2">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                                    </div>
                                </>
                                
                            ) :
                                (reviews?.length == 0) ?
                                    <div className="flex justify-center items-center flex-col">
                                        <img src={noReviewImage} className="w-[200px] h-[300px]" />
                                        <button className="p-2 border border-primary rounded-lg bg-primary text-bg font-header hover:bg-bg hover:text-primary transition-colors duration-300 font-semibold tracking-wider my-3"
                                                onClick={() => navigate("/")} >
                                            Add Your First Review
                                        </button>
                                    </div> :
                                    <>
                                        <div className="flex flex-col">
                                            {
                                                viewReview?.map((review, index) => (
                                                    <ReviewCard bookname={review.bookId.name} review={review.review} stars={review.stars} author={review.bookId.author} key={index}/>
                                                ))
                                            }
                                        </div>
                                        < div className="flex gap-2 p-3 flex-wrap justify-center items-center">
                                            {
                                                Array.from({ length: totalNoPages }).map((_, index) => (
                                                    <button key={index} className={`px-3 p-2 border border-highlight rounded-xl font-semibold ${index == currPageNo ? `bg-highlight border-accent text-white` : ""} transition-all duration-200`} onClick={() => setCurrPageNo(index)}>
                                                        {index + 1}
                                                    </button>
                                                ))
                                            }
                                            <button className="p-2 border border-primary rounded-lg bg-primary text-bg font-header hover:bg-bg hover:text-primary transition-colors duration-300 font-semibold tracking-wider my-3"
                                                    onClick={() => navigate("/")} >
                                                Add More Review
                                            </button>
                                        </div>
                                    </>
                                
                        }
                    </div>
                </div>
            </div>
            <Footer isloading={isLoading}/>
        </div>
    );
}