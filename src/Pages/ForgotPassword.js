import Notification from "../Components/Notification";
import {FaEye, FaEyeSlash, FaGoogle} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "./../api"

export default function ForgotPassword(){
    
    const [userDetails, setUserDetails] = useState({
        email: "",
        newPassword: "",
        otp: ""
    });
    const [stage, setStage] = useState(1); //! 0 -> checking the email is present, 1 -> checking the otp, 2 -> changing the password
    const [showPassword, setShowPassword] = useState(false);
    const [toaster, setToaster] = useState(null);
    const navigate = useNavigate();
    
    const {email, newPassword, otp} = userDetails;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const handleStage1 = async () => {
        api.get(`/auth/forgot-password-email-check?email=${email}`).then((res) => {
            const response = res.data
            
            setTimeout(() => {
                setToaster({
                    statusCode: 200,
                    message: response.message,
                })
                setStage(2)
            },[1000])
        }).catch((err) => {
            const response = err.response.data;
            setToaster({
                statusCode: err.status,
                message: response.message,
            });
        }).finally(() => {
            setTimeout(() =>{
                setToaster(null)
            },[4000])
        })
    }
    const handleStage2 = async () => {
        api.post("/auth/forgot-password-otp-verify", {
            email: email,
            otp: otp
        }).then((res) => {
            const response = res.data
           
            
            setTimeout(() => {
                setToaster({
                    statusCode: 200,
                    message: response.message,
                })
                setStage(3)
            },[1000])
        }).catch((err) => {
            const response = err.response.data;
            setToaster({
                statusCode: err.status,
                message: response.message,
            });
        }).finally(() => {
            setTimeout(() =>{
                setToaster(null)
            },[4000])
        })
    }
    
    const handleStage3 = async () => {
        api.post("/auth/forgot-password-change-password",{
            email: email,
            password: newPassword
        }).then((res) => {
            const response = res.data
            setTimeout(() => {
                setToaster({
                    statusCode: 200,
                    message: response.message,
                })
            },[1000])
            setTimeout(()=>{
                navigate("/login")
            },[3000])
        }).catch((err) => {
            const response = err.response.data;
            setToaster({
                statusCode: err.status,
                message: response.message,
            });
        }).finally(() => {
            setTimeout(() =>{
                setToaster(null)
            },[4000])
        })
    }
    const handleEmailLogin = (e) => {
        e.preventDefault();
        
        if(stage === 1){
            setToaster({
                statusCode: 100,
                message: "Checking Email"
            })
            handleStage1();
            return
        }
        
        if(stage === 2){
            setToaster({
                statusCode: 100,
                message: "Verifying Otp"
            })
            handleStage2();
            return
        }
        
        if(stage === 3){
            setToaster({
                statusCode: 100,
                message: "Changing Password"
            })
            handleStage3();
            return
        }
    }
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 ">
            {toaster && <Notification statusCode={toaster.statusCode} message={toaster.message} />}
            <div className="max-w-md lg:max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-accent">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-primaryText">Oops Forgot Your Password</h2>
                    <p className="mt-2 text-sm text-secondary">{ stage == 1 ? "Forgot Password" : stage == 2 ? "Verify OTP" : "New Password" }</p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
                    <div className="rounded-md">
                        {stage === 1 && (
                            
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-primaryText mb-1">Email Address</label>
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
                                </div>
                        )}
                        
                        {stage == 2 && (
                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-sm font-medium text-primaryText mb-1">Enter OTP</label>
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
                            </div>
                        )}
                        
                        {stage == 3 && (
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-primaryText mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
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
                            </div>
                        )}
                        
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors duration-200"
                        >
                            {stage === 1 ? "Check Email" : stage == 2 ? "Verify Otp" : "Change Password"}
                        </button>
                    </div>
                </form>
                
                { stage === 1 &&
                    <p className="mt-8 text-center text-sm text-secondary">
                        New Sign Up Now?{" "}
                        <Link to="/signup" className="font-medium text-accent hover:text-primary">
                            Sign up
                        </Link>
                    </p>
                }
            </div>
        </div>
    )
}