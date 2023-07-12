import React, {useState, useEffect} from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

// App
const App = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Spiderman')
    }, [])

    return (
        <div className="app">
            <h1>Cinemagic</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(title)}
                />
            </div>
            {
                movies?.length > 0 
                ? (
                    <div className="container">
                        {
                            movies.map(movie => (
                                <MovieCard movie={movie} key={movie.imdbID}/>
                            ))
                        }
                    </div>
                ) : (
                    <div className="empty">
                      <h2>No movies found</h2>
                    </div>
                )
            }
            
        </div>
    )
}

export default App;