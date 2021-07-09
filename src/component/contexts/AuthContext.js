import React, { useState, useContext, useEffect } from "react";
import { firebase, googleAuthProvider } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    const startLogin = () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }

    const startLogout = () => {
        return firebase.auth().signOut();
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("login")
                setCurrentUser(user.uid)
            } else {
                console.log("logout")
            }
            return unsubscribe;
        })
    }, [])

    const  value = {
        currentUser,
        startLogin,
        startLogout  
    }

    return (
        <AuthContext.Provider value={value}> 
            {children}
        </AuthContext.Provider>
    )


}