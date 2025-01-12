const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjFlZDYzYzQxODhlZGZmMDRhNTQ5ZDRiNTlmOTQ3YyIsIm5iZiI6MTczNjM2MDY1Ni4zNDYsInN1YiI6IjY3N2VjMmQwYzgxYWNhYTYzZGJiMmEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jEP5GOMrxpWTB2rjrbq4-rHaL_dM78TlnJIWuuSgIcA";

export const fetchTrendMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
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
export const fetchSearchMovie = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return response.json();
};
