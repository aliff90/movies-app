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
        <header>
           <div className="header__container">
               <div className="header__content">
                   <Link to="/dashboard" className="header__link header__link--logo">EpiTracker</Link>
                   <div className="header__links">
                      {/* <Link to="/dashboard" className="header__link">Home</Link> */}
                      {/* <Link to="/add" className="header__link">Add</Link> */}
                      <button onClick={logout} className="btn btn--link">Logout</button>
                   </div>
               </div>
           </div>
        </header>
    )
}

export default Header;