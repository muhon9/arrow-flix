import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieDetailModal from "../components/Modals/MovieDetailModal";
import Navbar from "../components/Navbar/Navbar";
import GenreWisePage from "../pages/GenreWisePage";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import TVSeriesPage from "../pages/TVSeriesPage";

export default function UserLayout({ children }) {
  return (
    <div>
      <Navbar />
      <MovieDetailModal />
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tvseries" element={<TVSeriesPage />} />
          <Route path="/genre/:categoryName" element={<GenreWisePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
