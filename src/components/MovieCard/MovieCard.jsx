import styles from "./MovieCard.module.css";

const MovieCard = ({ data: { poster_path, title, release_date } }) => {
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const DEFAULT_IMG_URL = "https://via.placeholder.com/500x750?text=No+Image";
  const DEFAULT_TITLE = "No title available";
  const DEFAULT_DATE = "No release date available";

  return (
    <>
      <img
        className={styles.avatarImg}
        src={poster_path ? IMG_URL + poster_path : DEFAULT_IMG_URL}
        alt={"avatar " + title || DEFAULT_TITLE}
        loading="lazy"
      />
      <div className={styles.cardContent}>
        <hr className={styles.hr} />
        <p className={styles.cardTitle}>{title || DEFAULT_TITLE}</p>
        <p className={styles.cardDate}>{release_date || DEFAULT_DATE}</p>
      </div>
    </>
  );
};

export default MovieCard;
