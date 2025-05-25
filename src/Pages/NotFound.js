import image from "./../Assets/notFound.gif";
import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-bg">
            <img src={image} alt="Unauthorized Access" className="w-64 h-64 mb-6" />
            <p className="text-2xl font-bold mb-4 text-primaryText font-header">Page Not Found</p>
            <button className="px-6 py-2 bg-primary text-white rounded  transition" onClick={() => navigate("/")}>
                Home
            </button>
        </div>
    );
}
