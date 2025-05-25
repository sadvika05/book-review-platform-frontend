import Header from "./../Components/Book/Header";
import { useState, useEffect } from "react";
import noReviewImage from "../Assets/addBookReview.jpeg";
import ReviewCard from "../Components/Book/ReviewCard";
import Footer from "../Components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import useAuth from "../Hooks/UseAuth";
import Navbar from "../Components/Navbar/Navbar";
import AddReview from "../Components/Book/AddReview";
import Notification from "../Components/Notification";
import LoginNotification from "../Components/LoginNotification/LoginNotification";

export default function BookDetails() {
    const { bookId } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [reviewFlag, setReviewFlag] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [image, setImage] = useState(null);
    const [currPageNo, setCurrPageNo] = useState(0);
    const [totalNoPages, setTotalNoPages] = useState(0);
    const [viewReview, setViewReview] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toaster, setToaster] = useState(null);
    const { auth, setAuth } = useAuth();
    const [loginFlag, setLoginFlag] = useState(false);
    const navigate = useNavigate();

    // Fetch book details and reviews
    useEffect(() => {
        if (!bookId) return;

        setIsLoading(true);
        api.get(`/book/book-details?id=${bookId}`)
            .then((res) => {
                const response = res.data;
                setBookDetails(response.bookDetails);

                // Convert image data to base64
                if (
                    response.bookImageData &&
                    response.bookImageData.image &&
                    response.bookImageData.image.data &&
                    response.bookImageData.image.data.data
                ) {
                    const base64String = btoa(
                        new Uint8Array(
                            response.bookImageData.image.data.data
                        ).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    );
                    setImage(base64String);
                }

                setReviews(response.bookReviews || []);
            })
            .catch((err) => {
                console.error("Error fetching book details:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [bookId]);

    // Calculate total pages when reviews change
    useEffect(() => {
        if (!reviews.length) {
            setTotalNoPages(0);
            setCurrPageNo(0);
            setViewReview([]);
            return;
        }

        setTotalNoPages(Math.ceil(reviews.length / 3));
        setCurrPageNo(0);
    }, [reviews]);

    // Update visible reviews when page changes
    useEffect(() => {
        if (!reviews.length) return;

        const startIndex = currPageNo * 3;
        setViewReview(reviews.slice(startIndex, startIndex + 3));
    }, [currPageNo, reviews]);

    const handleAddReview = () => {
        if (!auth.id || !auth.role) {
            setLoginFlag(true);
            return;
        }
        setReviewFlag(true);
    };

    const closeLoginNotification = () => {
        setLoginFlag(false);
    };

    const handleCloseAddReview = () => {
        setReviewFlag(false);
    };

    const handleSubmitAddReview = (review, stars) => {
        setToaster({
            statusCode: 100,
            message: "Adding Your Review",
        });

        api.post("/user/add-review", {
            review: review,
            stars: stars,
            bookId: bookId,
        })
            .then((res) => {
                // Success handling
                handleCloseAddReview();

                // Refresh reviews with updated data
                api.get(`/book/book-details?id=${bookId}`)
                    .then((res) => {
                        setReviews(res.data.bookReviews || []);
                    })
                    .catch((err) => {
                        console.error("Error refreshing reviews:", err);
                    });

                // Show success message
                setTimeout(() => {
                    setToaster({
                        statusCode: 200,
                        message: "Review Added",
                    });

                    // Clear notification after some time
                    setTimeout(() => {
                        setToaster(null);
                    }, 5000);
                }, 1000);
            })
            .catch((err) => {
                handleCloseAddReview();

                // Handle authentication error
                if (err.response && err.response.status === 401) {
                    setAuth({
                        id: null,
                        role: null,
                    });
                    navigate("/login");
                    return;
                }

                // Show error message
                setTimeout(() => {
                    setToaster({
                        statusCode: err.response ? err.response.status : 500,
                        message:
                            err.response?.data?.message || "An error occurred",
                    });

                    // Clear notification after some time
                    setTimeout(() => {
                        setToaster(null);
                    }, 5000);
                }, 1000);
            });
    };

    return (
        <div className="relative min-h-[100vh] bg-background">
            <Navbar currentPage={"Book"} />
            <div className="max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">
                {reviewFlag && (
                    <AddReview
                        handleAddReview={handleSubmitAddReview}
                        changePageStatus={handleCloseAddReview}
                    />
                )}

                {loginFlag && (
                    <LoginNotification closeFunction={closeLoginNotification} />
                )}

                {toaster && (
                    <Notification
                        statusCode={toaster.statusCode}
                        message={toaster.message}
                    />
                )}

                <div className="min-h-[90vh] px-8 lg:px-10">
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-10 py-6 border-b-highlight border-b-2">
                        <div className="flex flex-col items-center">
                            {isLoading ? (
                                <div className="animate-pulse">
                                    <div className="w-[100px] bg-gray-200 rounded h-[100px] mx-4"></div>
                                </div>
                            ) : (
                                <div className="relative group">
                                    <div className="w-[250px] h-[250px] overflow-hidden relative group rounded-xl">
                                        {image ? (
                                            <img
                                                src={`data:image/jpeg;base64,${image}`}
                                                alt={
                                                    bookDetails?.name ||
                                                    "Book cover"
                                                }
                                                className="w-full h-full object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:translate-x-1 group-hover:translate-y-1"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                No image available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 mt-6 md:mt-0">
                            {isLoading ? (
                                <div className="animate-pulse">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                                </div>
                            ) : (
                                <div className="bg-background rounded-lg p-5">
                                    <Header
                                        name={bookDetails?.name}
                                        author={bookDetails?.author}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-primary my-6 font-header">
                            Reviews
                        </h2>

                        {isLoading ? (
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
                        ) : reviews.length === 0 ? (
                            <div className="flex justify-center items-center flex-col">
                                <img
                                    src={noReviewImage}
                                    alt="No reviews"
                                    className="w-[200px] h-[300px]"
                                />
                                <button
                                    className="p-2 border border-primary rounded-lg bg-primary text-bg font-header hover:bg-bg hover:text-primary transition-colors duration-300 font-semibold tracking-wider my-3"
                                    onClick={handleAddReview}
                                >
                                    Be The First To Add Review
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    {viewReview.map((review, index) => (
                                        <ReviewCard
                                            key={review._id || index}
                                            name={review.userId.name}
                                            review={review.review}
                                            email={review.userId.email}
                                            stars={review.stars}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-2 p-3 flex-wrap justify-center items-center">
                                    {Array.from({ length: totalNoPages }).map(
                                        (_, index) => (
                                            <button
                                                key={index}
                                                className={`px-3 p-2 border border-highlight rounded-xl font-semibold ${
                                                    index === currPageNo
                                                        ? `bg-highlight border-accent text-white`
                                                        : ""
                                                } transition-all duration-200`}
                                                onClick={() =>
                                                    setCurrPageNo(index)
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        )
                                    )}
                                    <button
                                        className="p-2 border border-primary rounded-lg bg-primary text-bg font-header hover:bg-bg hover:text-primary transition-colors duration-300 font-semibold tracking-wider my-3"
                                        onClick={handleAddReview}
                                    >
                                        Add Review
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
