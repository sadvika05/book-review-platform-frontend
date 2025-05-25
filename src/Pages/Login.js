import {useState, useEffect} from "react";
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Notification from "../Components/Notification";
import {useNavigate, Link} from "react-router-dom";
import useAuth from "../Hooks/UseAuth"
import {motion} from "framer-motion"
import api from "./../api"
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [toaster, setToaster] = useState(null);
    const navigate = useNavigate();
    const {auth, setAuth}  = useAuth();
    
    
    const handleEmailLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setToaster({
                statusCode: 400,
                message: "Enter All Fields",
            })
            return;
        }
        setToaster({
            statusCode: 100,
            message: "Checking Credentials"
        })
        api.post("/auth/login",{
            email: email,
            password: password
        }).then((res) => {
            const response = res.data;
            setAuth({
                id: response.id,
                role: response.role
            })
            setTimeout(() => {
                setToaster(null)
                setToaster({
                    statusCode: 200,
                    message: "Successfully logged in",
                })
            },[1000])
            setTimeout(() => {
                navigate("/profile");
            },[2000])
        }).catch((err) => {
            const response = err.response.data;
            setTimeout(() => {
                setToaster(null)
                setToaster({
                    statusCode: err.status,
                    message: response.message,
                })
            },[2000])
        }).finally(()=>{
            setTimeout(() => {
                setToaster(null);
            },[7000])
        })
    };
    
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
            {toaster && <Notification statusCode={toaster.statusCode} message={toaster.message} />}
            <Navbar currentPage={"loginPage"}/>
            <motion.div
                className="max-w-md lg:max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-accent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h2 className="mt-6 text-3xl font-bold text-primaryText">Welcome Back</h2>
                    <p className="mt-2 text-sm text-secondary">Sign in to your account</p>
                </motion.div>
                
                <motion.form
                    className="mt-8 space-y-6"
                    onSubmit={handleEmailLogin}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleEmailLogin(e);
                        }
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className="rounded-md -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-primaryText mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                                placeholder="name@example.com"
                            />
                        </div>
                        
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-primaryText mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-accent hover:text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </motion.form>
                
                <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-secondary/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-secondary">Or continue with</span>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <button
                            className="w-full inline-flex justify-center py-3 px-4 border border-secondary/30 rounded-lg shadow-sm bg-white text-sm font-medium text-primaryText hover:bg-highlight/10 transition-colors duration-200"
                            onClick={() => (window.location.href = `${process.env.REACT_APP_GOOGLE_API_ENDPOINT}`)}
                        >
                            <a className={"flex"}>
                                <FaGoogle className="h-5 w-5 text-accent mr-2" />
                                <span>Sign in with Google</span>
                            </a>
                        </button>
                    </div>
                </motion.div>
                
                <motion.p
                    className="mt-8 text-center text-sm text-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-accent hover:text-primary">
                        Sign up now
                    </Link>
                </motion.p>
            </motion.div>
            {/*<Footer isloading={true}/>*/}
        </div>
    )
}