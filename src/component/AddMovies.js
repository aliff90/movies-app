import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import database, { storage } from "../component/firebase";
import { useAuth } from "./contexts/AuthContext";
import Header from "./Header";

const AddMovies = () => {
    const [movies, setMovies] = useState({title : "",  eps : 0  , current: 0, url: ""})
    const [img, setImg] = useState("");
    const [error, setError] = useState("")
    const { currentUser } = useAuth();
    const history = useHistory();

    const changeImageHandler = (e) => {
        const types = ["image/jpeg", "image/png"];

        let selectImg = e.target.files[0];

        if (selectImg && types.includes(selectImg.type)) {
            setImg(selectImg);
            setError(null)
        } else {
            setError("*Please select only jpeg or png files only");
            document.getElementById("inputFile").value = "";
        }
    };

    const changeTitle = (e) => {
        const title = e.target.value;
        setMovies({...movies, title});
    };

    const changeEps = (e) => {
        let eps = e.target.value;
        if (!eps || eps.match(/^[0-9\b]+$/)) {
            eps=parseInt(eps) || 0;
            setMovies({...movies, eps});
        }
    };

    const changeCurrent = (e) => {
        let current = e.target.value;
        if (!current || current.match(/^[0-9\b]+$/)) {
            current=parseInt(current) || 0;
            setMovies({...movies, current});
        }
    };
    
    const onUpload = () => {
        const storageRef = storage.ref(`users/${currentUser}/images/${img.name}`)
        storageRef.put(img).on("state_changed", (snap) => {
            console.log("upload success")
        },
        (error) => {
            setError("There is a problem when uploading. Please try and upload again")
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const eps = parseInt(movies.eps)
            const current = parseInt(movies.current)
            database.ref(`users/${currentUser}/movies`).push(movies).then((ref) => {
                setMovies({...movies, id: ref.key})
                const key = ref.key
                return database.ref(`users/${currentUser}/movies/${key}`).update({...movies, id: key, url}).then(() => {
                    history.push("/dashboard")
                })
            })
        })
    }
    
    const addMovies = (e) => {
        e.preventDefault();
        
        onUpload()
    }
    return (
        <div>
        <Header />
        <h1 className="page-title">Add Show</h1>
          <div className="add-container">
                <form onSubmit={addMovies}>
                    <div className="inputFile">
                        <input type="file" onChange={changeImageHandler} id="inputFile"/>
                        <p>Add image here</p>
                        {error && <div>{error}</div>}
                    </div>
                    <div className="add-item__form">
                        <h3>Title:</h3>
                        <input type="text" value={movies.title} onChange={changeTitle} className="add-item__input" />
                    </div>
                    <div className="add-item__form">
                        <h3>Total Episodes:</h3>
                        <input type="text" pattern="[0-9]*" value={movies.eps} onChange={changeEps}  className="add-item__input" />
                    </div>
                    <div className="add-item__form">
                        <h3>Currently at episode:</h3>
                        <input type="text" value={movies.current} onChange={changeCurrent} className="add-item__input" />
                    </div>
                    <button className="btn btn--add">Add Show</button>
                </form>  
            </div>
      </div>
    )
}


export default AddMovies;