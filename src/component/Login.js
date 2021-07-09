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
        <div>
            <h1>Login Now!</h1>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;