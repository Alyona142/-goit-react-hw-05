import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchSearchMovie } from "@/api/movies";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryValue = searchParams.get("query") ?? "";
  const [search, setSearch] = useState(queryValue);
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!queryValue) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      setMovies(null);

      try {
        const { results } = await fetchSearchMovie(queryValue);
        setMovies(results);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [queryValue]);

  const handleChange = (e) => setSearch(e.target.value);
  const handleSearchMovie = () => setSearchParams({ query: search });

  return (
    <section className="container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchMovie();
        }}
      >
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search for movies"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <Loader />}
      {isError && (
        <p style={{ color: "red" }}>An error occurred, please try again.</p>
      )}
      {movies?.length > 0 ? (
        <MovieList data={movies} />
      ) : (
        movies && <p>Movies with search criteria not found</p>
      )}
    </section>
  );
};

export default MoviesPage;
