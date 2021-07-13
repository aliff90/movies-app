import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import database from "./firebase"
import noImageLogo from "../image/no-image.jpg";
import OptionModal from "./OptionModal"
import { useAuth } from "./contexts/AuthContext";

const MovieList = ({id, title = "N/A", eps="0", url, current}) => {
    const [count, setCount] = useState(current);
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useAuth();
    
    const increaseCount = () => {
        setCount(count + 1);
        setIsOpen(false);
    };

    const open = () => {
        eps = parseInt(eps);
        if (count === eps) {
            console.log("done");
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };

    useEffect(() => {
        database.ref(`users/${currentUser}/movies/${id}`).update({current: count}).then(() => {
        });
    }, [count]);

    const openModal = {id, setIsOpen, current, increaseCount};

    return (
        <div className="list-container">
            <div className="list-content">
                <Link  className="list-item" to={{
                    pathname:`/edit/${id}`,
                    state: {
                        id, title, eps, url, current: count
                    }
                }}>
                
               {/* <h1>Title</h1> */}
               <h2 className="list-item__title">{title ? title : "N/A"}</h2>
               <div className="list-item__image">
               { url.indexOf("undefined") > -1 || !url ? <img src={noImageLogo} alt="" /> : <img src={url} alt="" />}
               </div>
               <h3 className="list-item__heading">Total Episodes</h3>
               <p className="list-item__count">{eps ? eps : "N/A"}</p>
                <h3 className="list-item__heading">Currently Watching</h3>
                <p className="list-item__count">{count}</p>
                </Link>
                <button onClick={open} className="btn btn--increase">Next Episode</button>
            </div>
               { isOpen && <OptionModal openModal={openModal} /> }
        </div>
    )
}

export default MovieList