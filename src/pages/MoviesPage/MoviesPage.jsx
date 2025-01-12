import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchSearchMovie } from "api/movies";
import Loader from "components/Loader/Loader";
import MovieList from "components/MovieList/MovieList";
import SearchForm from "components/SearchForm/SearchForm";
import NoFoundMessage from "components/NoFoundMessage/NoFoundMessage";

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
      <SearchForm
        handleChange={handleChange}
        handleSearchMovie={handleSearchMovie}
        query={search}
      />

      {isLoading && <Loader />}
      {isError && (
        <NoFoundMessage text="An error occurred, please try again." />
      )}
      {movies?.length > 0 ? (
        <MovieList data={movies} />
      ) : (
        movies && (
          <NoFoundMessage text="Movies with search criteria not found" />
        )
      )}
    </section>
  );
};

export default MoviesPage;
