import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Book from "./Pages/Book";
import ForgotPassword from "./Pages/ForgotPassword"
import Admin from "./Pages/Admin";
import Unauthorized from "./Pages/Unauthorized";
import NotFound from "./Pages/NotFound";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/signup" element = {<Signup />} />
                <Route path = "/book/:bookId" element = {<Book />} />
                <Route path = "/profile" element = {<Profile />} />
                <Route path = "/forgot-password" element = {<ForgotPassword />} />
                <Route path = "/admin" element = {<Admin />} />
                <Route path = "/unauthorized" element = {<Unauthorized/>} />
                <Route path = "*" element = {<NotFound />} />
            </Routes>
        </BrowserRouter>
    
    )
}