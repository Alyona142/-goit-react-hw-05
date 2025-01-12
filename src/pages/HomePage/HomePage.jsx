import { useEffect, useState } from "react";
import { fetchTrendMovies } from "api/movies";
import Loader from "components/Loader/Loader";
import MovieList from "components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);

      try {
        const { results } = await fetchTrendMovies();
        setMovies(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <section className="container">
      {isLoading && <Loader />}{" "}
      {!isLoading && movies.length > 0 && <MovieList data={movies} />}{" "}
    </section>
  );
};

export default HomePage;
