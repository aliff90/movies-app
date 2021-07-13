import React, { useState } from "react";
import database, { storage } from "./firebase"
import { useParams, useHistory, useLocation } from "react-router-dom";
import Header from "./Header";
import noImageLogo from "../image/no-image.jpg"
import { useAuth } from "./contexts/AuthContext";

const EditMovie = () => {
    const location = useLocation()
    const { title, eps, url, current } = location.state;
    const [movies, setMovies] = useState({title, eps, url,current})
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(null);
    const { currentUser } = useAuth();
    const { id } = useParams();
    const history = useHistory();

    //set movies to new info onchange
    const changeTitle = (e) => {
        const title = e.target.value;
        setMovies({...movies, title});
    }
    const changeEps = (e) => {
        const eps = e.target.value;
        if (!eps || eps.match(/^[0-9\b]+$/)) {
            setMovies({...movies, eps});
        }
    }
    
    const changeCurrent = (e) => {
        const current = e.target.value;
        if (!current || current.match(/^[0-9\b]+$/)) {
            setMovies({...movies, current});
        }
    }

    const editHandler = () => {
        database.ref(`users/${currentUser}/movies/${id}`).update(movies);
    }
    
    const removeUrlImg = () =>{
        const url = movies.url;
        const storagePath = storage.refFromURL(url);
        const fileName = storagePath.name;
        database.ref(`users/${currentUser}/movies/${id}/url`).remove();
        storage.ref(`users/${currentUser}/images/${fileName}`).delete();
    }

    const removeHandler = () => {
        database.ref(`users/${currentUser}/movies/${id}`).remove();
        if (movies.url && !(movies.url.indexOf("undefined") > -1)) {
            removeUrlImg();
        }
        history.push("/dashboard");
        }

    const changeImageHandler = (e) => {
        const types = ["image/jpeg", "image/png"];

        const selectImg = e.target.files[0];

        if (selectImg && types.includes(selectImg.type)) {
            const img = selectImg;
            if (movies.url) {
                removeUrlImg();
            }
            const storageRef = storage.ref(`users/${currentUser}/images/${img.name}`)
            storageRef.put(img).on("state_changed", snap => {
                const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(progress)
                console.log(progress);
            }, (error) => {
                setError("Unable to upload. Try to upload again.")
            }, async () => {
                const url = await storageRef.getDownloadURL();
                database.ref(`users/${currentUser}/movies/${id}`).update({url}).then(() => {
                    console.log("done");
                    setMovies({...movies, url});
                    setProgress(null)
                })                
            })
        } else {
            setError("*Please select only jpeg or png files only");
            document.getElementById("file").value = "";
        }
    }

    // const removeImageHandler = () => {
    //     if (movies.url && !(movies.url.indexOf("undefined") > -1)) {
    //         removeUrlImg();
    //         setMovies({...movies, url: ""});
    //         document.getElementById("inputFile").value = "";
    //         console.log("true");
    //         }
    //     }

    const onEdit = () => {
        const current = parseInt(movies.current);
        const eps = parseInt(movies.eps);
        database.ref(`users/${currentUser}/movies/${id}`).update({title: movies.title, eps, current});
    }

    const editMovies = (e) => {
        e.preventDefault();
        onEdit();
        history.push("/dashboard");
    }

    return (
        <div>
        <Header />
        <h1 className="page-title">Edit</h1>
        <div className="edit-container">
            <div className="edit-item">
                <div className="edit-item__image">
                    {url ? <img src={movies.url} alt="" /> : <img src={noImageLogo} alt="" />}
                    {progress === 100 && <h3>Uploaded!</h3>}
                    <input type="file" onChange={changeImageHandler} id="file" />
                    <label htmlFor="file">Edit Image</label>
                    { error && <div className="error">{error}</div> }
                </div>
                <form onSubmit={editMovies}>
                    <div className="edit-item__form">
                        <h3>Title:</h3>
                        <input type="text" value={movies.title} onChange={changeTitle} />
                    </div>
                    <div className="edit-item__form">
                        <h3>Total Episodes:</h3>
                        <input type="text" pattern="[0-9]*" value={movies.eps} onChange={changeEps} />
                    </div>
                    <div className="edit-item__form">
                        <h3>Currently At Episode:</h3>
                        <input type="text" value={movies.current} onChange={changeCurrent} />
                    </div>
                    <div className="edit-item__btn">
                        <button onClick={editHandler} className="btn btn--edit">Edit Show</button>
                        <button onClick={removeHandler} className="btn btn--red">Remove</button>
                    </div>
                </form>  
                {/* <button onClick={removeImageHandler}>Remove image</button> */}
                
            </div>
          </div>
      </div>
    )
}

export default EditMovie;
