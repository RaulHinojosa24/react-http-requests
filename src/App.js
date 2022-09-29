import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = () => {
    setIsLoading(true);
    setError(null);

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
      })
      .catch((error) => {
        setError("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let content = <p>Found no movies.</p>;

  if (movies.length) {
    content = (
      <p>
        <MoviesList movies={movies} />
      </p>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
