import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import database, { storage } from "../component/firebase";
import { useAuth } from "./contexts/AuthContext";
import Header from "./Header";

const AddMovies = () => {
    const [movies, setMovies] = useState({title : "",  eps : "", current: 0, url: ""})
    const [img, setImg] = useState("");
    const [error, setError] = useState("")
    const { currentUser } = useAuth();
    console.log(currentUser)
    // const [url, setUrl] = useState("")
    const history = useHistory();

    const changeImageHandler = (e) => {
        const types = ["image/jpeg", "image/png"];

        let selectImg = e.target.files[0];

        if (selectImg && types.includes(selectImg.type)) {
            setImg(selectImg);
            setError(null)
        } else {
            setError("Please select only jpeg or png files only");
            document.getElementById("inputFile").value = "";
        }
    };

    const changeTitle = (e) => {
        const title = e.target.value;
        setMovies({...movies, title});
    };

    const changeEps = (e) => {
        const eps = e.target.value;
        setMovies({...movies, eps});
    };

    const changeCurrent = (e) => {
        const current = e.target.value;
        setMovies({...movies, current});
    };
    
    const onUpload = () => {
        const storageRef = storage.ref(`users/${currentUser}/images/${img.name}`)
        storageRef.put(img).on("state_changed", (snap) => {
            console.log("upload success")
        },
        (error) => {
            console.log("error")
        }, async () => {
            const url = await storageRef.getDownloadURL();
            // setUrl(url)
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
          <form onSubmit={addMovies}>
            <input type="file" onChange={changeImageHandler} id="inputFile"/>
            {error && <div>{error}</div>}
            <h3>Title</h3>
            <input type="text" value={movies.title} onChange={changeTitle} />  
            <h3>Episodes</h3>
            <input type="text" value={movies.eps} onChange={changeEps} />
            <h3>Currently Watching</h3>
            <input type="text" value={movies.current} onChange={changeCurrent} />  
            <button>Add</button>
          </form>  
      </div>
    )
}


export default AddMovies;