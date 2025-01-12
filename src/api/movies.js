import { API_KEY } from "config";

export const fetchTrendMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  return response.json();
};
export const fetchMovieById = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie data");
  }
  return response.json();
};
