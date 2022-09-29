import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    // fetch("https://swapi.dev/api/films/")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const transformedMovies = data.results.map((movie) => {
    //       return {
    //         id: movie.id,
    //         title: movie.title,
    //         releaseDate: movie.release_date,
    //         openingText: movie.opening_crawl,
    //       };
    //     });
    //     setMovies(transformedMovies);
    //   });

    const res = await fetch("https://swapi.dev/api/films/");
    const data = await res.json();
    const transformedMovies = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      };
    });
    setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
