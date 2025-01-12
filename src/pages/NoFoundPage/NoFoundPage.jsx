import styles from "./NoFoundPage.module.css";

const NoFoundPage = ({ text }) => {
  return <div className={styles.noResult}>{text}</div>;
};

export default NoFoundPage;
