import { useEffect, useMemo, useState, useRef } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { fetchMovieById } from "@api/movies";
import Loader from "../../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const refLocation = useRef(location.state);

  useEffect(() => {
    if (!movieId) return;

    const handleMovieById = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchMovieById(movieId);
        setMovieDetail(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleMovieById();
  }, [movieId]);

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
        <button
          className={styles.goBackBtn}
          type="button"
          aria-label="go to home page"
        >
          GoBack
        </button>
      </Link>

      {movieId && !isLoading && (
        <div>
          <h2>{movieDetail.title}</h2>
          <p>{score}</p>
          <p>{genres}</p>
        </div>
      )}

      {isLoading && <Loader />}

      {isError && (
        <div className={styles.errorMessage}>
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}

      <h2 className={styles.additionalTitle}>Additional Information</h2>
      <div className={styles.subNav}>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
      </div>
      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
