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
        <div>
            <Link to={{
                pathname:`/edit/${id}`,
                state: {
                    id, title, eps, url, current: count
                }
                }}>
                { url.indexOf("undefined") > -1 || !url ? <img src={noImageLogo} alt="" /> : <img src={url} alt="" />}
                <h1>Title</h1>
                <p>{title ? title : "N/A"}</p>
            </Link>
            <h1>Total Episodes</h1>
            <p>{eps ? eps : "N/A"}</p>
            <div>
                <p>Currently Watching</p>
                <p>{count}</p>
                <button onClick={open}>Next Episode</button>
            </div>
            { isOpen && <OptionModal openModal={openModal} /> }                
        </div>
    )
}

export default MovieList