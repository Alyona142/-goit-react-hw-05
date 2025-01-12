import { useEffect, useMemo, useState, useRef } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { fetchMovieById } from "api/movies";

import MovieDetails from "components/MovieDetails/MovieDetails";
import Loader from "components/Loader/Loader";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const refLocation = useRef(location.state);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!movieId || !apiKey) return;

    const handleMovieById = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchMovieById(movieId, apiKey);
        setMovieDetail(data);
      } catch (error) {
        console.log(error);

        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleMovieById();
  }, [movieId, apiKey]);

  const score = useMemo(() => {
    if (!movieDetail.vote_average || !movieDetail.vote_count) return 0;
    return ((movieDetail.vote_average / movieDetail.vote_count) * 100).toFixed(
      0
    );
  }, [movieDetail.vote_average, movieDetail.vote_count]);

  const genres = useMemo(() => {
    if (!movieDetail.genres) return;
    return movieDetail.genres.length > 0
      ? movieDetail.genres.map((genre) => genre.name).join(" ")
      : "";
  }, [movieDetail.genres]);

  return (
    <section className="container">
      <h1>Detail Info</h1>
      <Link to={refLocation.current || "/"}>
        {" "}
        <button
          className={styles.goBackBtn}
          type="button"
          aria-label="go to home page"
        >
          GoBack
        </button>
      </Link>
      {movieId && !isLoading && (
        <MovieDetails movieDetail={movieDetail} score={score} genres={genres} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <h2 className={styles.additionalTitle}>Additional Information</h2>{" "}
      <div className={styles.subNav}>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
      </div>
      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
