import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);

const CastComponent = lazy(() => import("./components/MovieCast/MovieCast"));
const ReviewsComponent = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

const NoFoundPage = lazy(() => import("./pages/NoFoundPage/NoFoundPage"));

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        {" "}
        <Navigation />
        <Toaster position="top-center" />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<CastComponent />} />
              <Route path="reviews" element={<ReviewsComponent />} />
            </Route>
            <Route path="*" element={<NoFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
