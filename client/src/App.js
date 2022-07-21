import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AddMoviePage from "./pages/adminPages/AddMoviePage";
import Dashboard from "./pages/adminPages/Dashboard";
import GenreWisePage from "./pages/GenreWisePage";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVSeriesPage from "./pages/TVSeriesPage";

function App() {
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="browse" element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="tvseries" element={<TVSeriesPage />} />
            <Route path="genre/:categoryName" element={<GenreWisePage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="movies" element={<AddMoviePage />} />
            <Route path="addmovie" element={<AddMoviePage />} />
            <Route path="tvseries" element={<AddMoviePage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
