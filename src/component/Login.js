import React from "react";
import { useHistory } from "react-router-dom";
import "firebase/auth";
import { useAuth } from "./contexts/AuthContext";

const Login =  () => {
    const history = useHistory();
    const {startLogin} = useAuth();

    const login = async () => {
        await startLogin()
        history.push("/dashboard")
    }

    return (
        <div className="login-container">
            <div className="login-container__content">
                <h1 className="login-container__title">Show Tracker</h1>
                <p className="login-container__description">Keep track of your shows now!</p>
                <button className="btn" onClick={login}>Login with Google!</button>
            </div>
        </div>
    )
}

export default Login;