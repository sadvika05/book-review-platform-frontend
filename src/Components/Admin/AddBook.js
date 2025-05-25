import { useState } from "react";
import api from "../../api";
import Notification from "../Notification";

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [toaster, setToaster] = useState(null);
    const [categories] = useState([
        'Fiction',
        'Non-Fiction',
        'Science Fiction',
        'Mystery',
        'Biography',
        'Romance',
        'Fantasy',
        'Adventure',
        'Philosophy',
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        if (file && file.type !== 'image/png') {
            alert("Please select a PNG image.");
            event.target.value = ''; // Reset file input
            return;
        }
        
        setImage(file);
        
        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };
    
    const toggleCategorySelection = (category) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter((item) => item !== category); // Remove category
            } else {
                return [...prevSelected, category]; // Add category
            }
        });
    };
    
    const savedImage = (bookId) => {
        const formData = new FormData();
        setToaster({
            statusCode: 100,
            message: "Add Book Image"
        });
        formData.append("id", bookId);
        formData.append("image", image);
        api.post("/book/add-book-image", formData).then((res) => {
            setToaster({
                statusCode: 200,
                message: "Book Added Successfully",
            });
        }).catch((err) => {
            const response = err.response.data;
            setTimeout(() => {
                setToaster(null);
                setToaster({
                    statusCode: err.status,
                    message: response.message,
                });
            }, [2000]);
        }).finally(() => {
            setImage(null);
            setImagePreview(null);
            setTitle("");
            setName("");
            setSelectedCategories([]);
            setTimeout(() => {
                setToaster(null);
            }, [7000]);
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setToaster({
            statusCode: 100,
            message: "Add Book Details"
        });
        api.post("/book/add-book", {
            name: title,
            author: name,
            category: selectedCategories,
        }).then((res) => {
            console.log(res.data);
            savedImage(res.data.bookId);
        }).catch((err) => {
            setImage(null);
            setImagePreview(null);
            setTitle("");
            setName("");
            setSelectedCategories([]);
            const response = err.response.data;
            setTimeout(() => {
                setToaster(null);
                setToaster({
                    statusCode: err.status,
                    message: response.message,
                });
            }, [2000]);
            setTimeout(() => {
                setToaster(null);
            }, [5000]);
        });
    };
    
    return (
        <div className="w-full max-w-[60vw] mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-primary mb-6">Add a New Book</h2>
            {
                toaster && <Notification message={toaster.message} statusCode={toaster.statusCode} />
            }
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                        Book Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter the book title"
                        required
                    />
                </div>
                
                {/* Book Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter the author's name"
                        required
                    />
                </div>
                
                {/* Category List (Selectable) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Book Categories
                    </label>
                    <ul className="grid grid-cols-2 gap-2 mt-2">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                onClick={() => toggleCategorySelection(category)}
                                className={`p-2 cursor-pointer rounded-md text-center
                                    ${selectedCategories.includes(category)
                                    ? "bg-primary text-white"
                                    : "border-2 border-gray-300"}`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="image">
                        Upload Book Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        accept=".png"
                    />
                </div>
                
                {/* Image Preview */}
                {imagePreview && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Book Preview"
                            className="w-full max-w-xs h-auto mt-2 rounded-md border-2 border-gray-300"
                        />
                    </div>
                )}
                
                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
}
