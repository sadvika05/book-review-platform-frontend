import {useState, useEffect } from 'react';
import AuthContext from "../Contexts/AuthContext"

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        id: JSON.parse(sessionStorage.getItem("id")) || null,
        role: JSON.parse(sessionStorage.getItem("role")) || null
    });
    
    useEffect(() => {
        if (auth.id) {
            sessionStorage.setItem("id", JSON.stringify(auth.id));
        }
        if (auth.role) {
            sessionStorage.setItem("role", JSON.stringify(auth.role));
        }
        if (!auth.id && !auth.role) {
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("role");
        }
    }, [auth]);
    
    return(
        <AuthContext.Provider value = {{auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;