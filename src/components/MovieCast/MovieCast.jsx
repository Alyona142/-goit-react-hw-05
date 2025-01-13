import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { fetchMovieCast } from "../../api/movies";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const loadMovieCast = async () => {
      setIsLoading(true);

      try {
        const data = await fetchMovieCast(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        setError(`Error fetching MovieCast: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && !movieCast.length && (
        <p className={styles.message}>No cast information available.</p>
      )}

      {!isLoading && !error && movieCast.length > 0 && (
        <>
          <h3 className={styles.subtitle}>Movie Cast</h3>
          <ul className={styles.castList}>
            {movieCast.map(({ id, name, profile_path, character }) => (
              <li key={id} className={styles.castItem}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                    alt={name}
                    className={styles.actorImage}
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
                <p className={styles.actorName}>{name}</p>
                <p className={styles.characterName}>Character: {character}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieCast;
