import { useEffect, useState } from "react";
import { fetchTrendMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await fetchTrendMovies();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movies</div>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList data={movies} />
    </div>
  );
};

export default HomePage;
