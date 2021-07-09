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

    //Setup current info during on-mount
//     useEffect(async () => {
//             await database.ref(`users/${currentUser}/movies/lists/${id}`).on("value", snap => {
//             const url = snap.val().url;
//             const title = snap.val().title;
//             const eps = snap.val().eps;
//             const current = snap.val().current;
//             setMovies({title, eps, url, current});
//         });
// }, [])
// console.log(movies.title)

    //set movies to new info onchange
    const changeTitle = (e) => {
        const title = e.target.value;
        setMovies({...movies, title});
    }
    // replace(/\D/,'')
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

    const changeImageHandler = (e) => {
        const selectImg = e.target.files[0];
        if (selectImg) {
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
        }
    }

    const removeHandler = () => {
        database.ref(`users/${currentUser}/movies/${id}`).remove();
        if (movies.url) {
            removeUrlImg();
        }
        history.push("/dashboard");
        }
    
    const removeImageHandler = () => {
        if (movies.url && !(movies.url.indexOf("undefined") > -1)) {
            removeUrlImg();
            setMovies({...movies, url: ""});
            // setNewUrl("");
            document.getElementById("inputFile").value = "";
            console.log("true");
            }
        }

    const onEdit = () => {
        const current = parseInt(movies.current)
        database.ref(`users/${currentUser}/movies/${id}`).update({title: movies.title, eps: movies.eps, current: current});
    }

    const editMovies = (e) => {
        e.preventDefault();
        onEdit();
        history.push("/dashboard");
    }

    return (
        <div>
        <Header />
        {url ? <img src={movies.url} alt="" /> : <img src={noImageLogo} alt="" />}
        {progress === 100 && <h3>Uploaded!</h3>}
        <input type="file" onChange={changeImageHandler} id="inputFile" />
        { error && <div>{error}</div> }
          <form onSubmit={editMovies}>
            <h3>Title</h3>
            <input type="text" value={movies.title} onChange={changeTitle} />  
            <h3>Episodes</h3>
            <input type="text" pattern="[0-9]*" value={movies.eps} onChange={changeEps} />
            <input type="text" value={movies.current} onChange={changeCurrent} />
            <button onClick={editHandler}>Edit</button>
          </form>  
          <button onClick={removeImageHandler}>Remove image</button>
          <button onClick={removeHandler}>Remove</button>
      </div>
    )
}

export default EditMovie;
