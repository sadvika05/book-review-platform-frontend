import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import Notification from "../Components/Notification";
import {useNavigate, Link} from "react-router-dom";
import api from "../api"
import useAuth from "../Hooks/UseAuth";
import {motion } from"framer-motion"
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

export default function SignUp() {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [toaster, setToaster] = useState(null);
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    
    const {name, email, password, confirmPassword, otp} = userDetails;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const handleEmailLogin = (e) => {
        e.preventDefault();
        
        if (!otpGenerated) {
            if (!name || !email || !password || !confirmPassword) {
                setToaster({
                    statusCode: 400,
                    message: "Enter All Fields",
                });
                setTimeout(() => {
                    setToaster(null);
                },[4000])
                return;
            }
            
            if (password !== confirmPassword) {
                setToaster({
                    statusCode: 400,
                    message: "Passwords do not match",
                });
                setTimeout(() => {
                    setToaster(null);
                },[3000])
                return;
            }
            setToaster({
                statusCode:100,
                message:"Creating new account",
            })
            api.post("/auth/signup", {
                email: userDetails.email,
                password: userDetails.password,
                name: userDetails.name
            }).then(res => {
                const response = res.data;
                
                setTimeout(() => {
                    setOtpGenerated(true);
                    setToaster(null)
                    setToaster({
                        statusCode: 200,
                        message: response.message,
                    })
                },[1000])
                
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
                return;
            })
            return
        }
        
        setToaster({
            statusCode:100,
            message:"Checking Otp",
        })
        //otp verfication
        api.post("/auth/otp-verify",{
            email: userDetails.email,
            otp: userDetails.otp
        }).then(res => {
            const response = res.data;
            setAuth({
                email: response.id,
                role: response.role,
            })
            setTimeout(() => {
                setToaster(null)
                setToaster({
                    statusCode: 200,
                    message: response.message,
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
            return;
        })
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center ">
            {toaster && <Notification statusCode={toaster.statusCode} message={toaster.message} />}
            <Navbar currentPage={"signupPage"}/>
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
                    <h2 className="mt-6 text-3xl font-bold text-primaryText">Welcome</h2>
                    <p className="mt-2 text-sm text-secondary">
                        {!otpGenerated ? "Create your account" : "Verify Your Account"}
                    </p>
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
                    <div className="rounded-md">
                        {!otpGenerated && (
                            <>
                                <motion.div
                                    className="mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <label htmlFor="name" className="block text-sm font-medium text-primaryText mb-1">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none rounded-lg block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
                                        placeholder="Your name"
                                    />
                                </motion.div>
                                
                                <motion.div
                                    className="mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                >
                                    <label htmlFor="email" className="block text-sm font-medium text-primaryText mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none rounded-lg block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
                                        placeholder="name@example.com"
                                    />
                                </motion.div>
                                
                                <motion.div
                                    className="mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <label htmlFor="password" className="block text-sm font-medium text-primaryText mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={handleChange}
                                            required
                                            className="appearance-none rounded-lg block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
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
                                </motion.div>
                                
                                <motion.div
                                    className="mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9, duration: 0.5 }}
                                >
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-primaryText mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className="appearance-none rounded-lg block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                        
                        {otpGenerated && (
                            <motion.div
                                className="mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <label htmlFor="otp" className="block text-sm font-medium text-primaryText mb-1">
                                    Enter OTP
                                </label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    value={otp}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-lg block w-full px-3 py-3 border border-secondary/30 placeholder-secondary/60 text-primaryText focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
                                    placeholder="Enter the OTP sent to your email"
                                />
                            </motion.div>
                        )}
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
                        >
                            {otpGenerated ? "Verify OTP" : "Sign up"}
                        </button>
                    </motion.div>
                </motion.form>
                
                {!otpGenerated && (
                    <>
                        <motion.div
                            className="mt-6 relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-secondary/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-secondary">Or continue with</span>
                            </div>
                        </motion.div>
                        
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                        >
                            <button
                                className="w-full inline-flex justify-center py-3 px-4 border border-secondary/30 rounded-lg shadow-sm bg-white text-sm font-medium text-primaryText hover:bg-highlight/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight transition-colors duration-200"
                                onClick={() => window.location.href = `${process.env.REACT_APP_GOOGLE_API_ENDPOINT}`}
                            >
                                <a className={"flex"}>
                                    <FaGoogle className="h-5 w-5 text-accent mr-2" />
                                    <span>Sign in with Google</span>
                                </a>
                            </button>
                        </motion.div>
                    </>
                )}
                
                {!otpGenerated && (
                    <motion.p
                        className="mt-8 text-center text-sm text-secondary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                    >
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-accent hover:text-primary">
                            Sign in
                        </Link>
                    </motion.p>
                )}
            </motion.div>
            {/*<Footer isloading={true}/>*/}
        </div>
    );
}
