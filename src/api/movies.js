const API_KEY = "621ed63c4188edff04a549d4b59f947c";

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
