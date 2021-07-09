import React from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

const Header = () => {
    const  {startLogout}  = useAuth();
    const history = useHistory();
    const logout = () => {
        startLogout();
        history.push("/");
    }
    return (
        <div>
            <Link to="/dashboard">Home</Link>
            <Link to="/add">Add</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Header;