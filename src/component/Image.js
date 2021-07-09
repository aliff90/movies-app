import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import database, { storage } from "./firebase";

const Image = (props) => {
    const [img, setImg] = useState("")
    const [url, setUrl] = useState("")
    const history = useHistory()
    
    const changeImageHandler = (e) => {
        const selectImg = e.target.files[0];
        if (selectImg) {
            // setImg(selectImg);
            const img = selectImg;
            const storageRef = storage.ref(`images/${img.name}`)
            storageRef.put(img).on("state_chaneds", snap => {
                console.log("success")
            }, (error) => {
                console.log("Error")
            }, async () => {
                const url = await storageRef.getDownloadURL();
                setUrl(url)
                database.ref(`movies/lists/${props.movies.id}`).update({...props, url}).then(() => {
                    console.log("done")
                })
            })
        }
    }
    // console.log(props.movies)

    return (
        <div className="image">
            { url ? (<img src= {url} />) : (<img src={props.movies.url} />)}
            <input type="file" onChange={changeImageHandler} id="inputFile" hidden/>
            <label htmlFor="inputFile">+</label>
        </div>
    )
}

export default Image;