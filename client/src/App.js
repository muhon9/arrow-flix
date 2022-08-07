import { AnimatePresence } from "framer-motion";
import AdminLayout from "layouts/AdminLayout";
import UserLayout from "layouts/UserLayout";
import AddMoviePage from "pages/adminPages/AddMoviePage";
import Dashboard from "pages/adminPages/Dashboard";
import GenreWisePage from "pages/publicPages/GenreWisePage";
import HomePage from "pages/publicPages/HomePage";
import MoviesPage from "pages/publicPages/MoviesPage";
import TVSeriesPage from "pages/publicPages/TVSeriesPage";
import { Route, Routes } from "react-router-dom";

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
            <Route path="addtvmovie" element={<AddMoviePage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
