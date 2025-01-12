import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./MovieReviews.module.css";
import { fetchMovieReview } from "../../api/movies";

import Loader from "../Loader/Loader";

import NoFoundMessage from "../../pages/NoFoundPage/NoFoundPage";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movieId) return;

      setIsLoading(true);
      setIsError(false);

      try {
        const { results } = await fetchMovieReview(movieId);
        setReviews(results);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.content}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && reviews && reviews.length === 0 && (
        <NoFoundMessage text="Unfortunately, there are no reviews for this movie" />
      )}
      {!isLoading && !isError && reviews && reviews.length > 0 && (
        <ReviewCard reviews={reviews} />
      )}
    </div>
  );
};

export default MovieReviews;
