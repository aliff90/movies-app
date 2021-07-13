import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import database from "./firebase"
import MovieList from "./MovieList";
import Header from "./Header";

const MovieDashBoard = () => {
    const [movies, setMovies] = useState("")
    const { currentUser } = useAuth();
    useEffect(() => {
            database.ref(`users/${currentUser}/movies`).once("value", snap => {
            const movies = []
            snap.forEach(snap => {
                movies.push(snap.val())
            })
            setMovies(movies)
        })
    }, [])

    return (
        <div>
            <Header />
            <div className="page-title">
                {/* <h1 >Shows</h1> */}
                <div className="shows-length">You are watching <b>{movies.length}</b> show(s)  currently.</div>
                <Link to="/add" className="btn header__add" >Add</Link>
            </div>
            <div className="dashboard"> 
                {movies.length === 0 ? (<div className="blank-title">You are not watching any shows currently. </div>) : movies.map((movie) => {
                    return <MovieList {...movie} key={movie.id} />
            })}
            </div>
        </div>
    )
}

export default MovieDashBoard;