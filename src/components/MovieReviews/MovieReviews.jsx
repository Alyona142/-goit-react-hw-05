import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./MovieReviews.module.css";
import { fetchMovieReview } from "../../api/movies";

import Loader from "../Loader/Loader";

import NoFoundMessage from "../../pages/NoFoundPage/NoFoundPage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchMovieReview(movieId);
        setReviews(data.results);
      } catch {
        setError(`Error fetching MovieReviews: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && !reviews.length && (
        <p className={styles.message}>
          We don't have any reviews for this movie
        </p>
      )}

      {!isLoading && !error && reviews.length > 0 && (
        <>
          <h3 className={styles.subtitle}>Movie Reviews</h3>
          <ul className={styles.reviewList}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.reviewItem}>
                <p className={styles.reviewerName}>{author}</p>
                <p className={styles.reviewText}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
