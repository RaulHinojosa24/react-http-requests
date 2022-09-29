import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);

    fetch("https://swapi.dev/api/films/")
      .then((res) => res.json())
      .then((data) => {
        const transformedMovies = data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });

        setMovies(transformedMovies);
        setIsLoading(false);
      });

    // const res = await fetch("https://swapi.dev/api/films/");
    // const data = await res.json();
    // const transformedMovies = data.results.map((movie) => {
    //   return {
    //     id: movie.id,
    //     title: movie.title,
    //     releaseDate: movie.release_date,
    //     openingText: movie.opening_crawl,
    //   };
    // });
    // setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ...</p>}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}

        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
