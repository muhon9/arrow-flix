import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MovieDetailModal from "./components/Modals/MovieDetailModal";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVSeriesPage from "./pages/TVSeriesPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <MovieDetailModal />
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tvseries" element={<TVSeriesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
