import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);

    fetch("") // It all worked with the Firebase URL #promise
      .then((res) => res.json())
      .then((data) => {
        const lodadedMovies = [];

        for (const key in data) {
          lodadedMovies.push({
            id: key,
            title: data[key].title,
            releaseDate: data[key].releaseDate,
            openingText: data[key].openingText,
          });
        }

        setMovies(lodadedMovies);
      })
      .catch(() => {
        setError("URL is no longer valid, sorry...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    fetch("", {
      // Again, it all worked with the Firebase URL #promise
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
