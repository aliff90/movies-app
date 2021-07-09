import React, { useState, useEffect } from "react";
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
                console.log("hi")
            })
            setMovies(movies)
            console.log("hey")
        })
    }, [])

    return (
        <div>
            <Header />
            <div>
                {movies.length === 0 ? (<div>No Movies</div>) : movies.map((movie) => {
                    return <MovieList {...movie} key={movie.id} />
            })}
            </div>
        </div>
    )
}

export default MovieDashBoard;