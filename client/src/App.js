import { AnimatePresence } from 'framer-motion';
import AdminLayout from 'layouts/AdminLayout';
import UserLayout from 'layouts/UserLayout';
import AddMoviePage from 'pages/adminPages/AddMoviePage';
import EditMoviePage from 'pages/adminPages/EditMoviePage';
import Dashboard from 'pages/adminPages/Dashboard';
import ShowMoviesPage from 'pages/adminPages/ShowMoviesPage';
import GenreWisePage from 'pages/publicPages/GenreWisePage';
import HomePage from 'pages/publicPages/HomePage';
import MoviesPage from 'pages/publicPages/MoviesPage';
import TVSeriesPage from 'pages/publicPages/TVSeriesPage';
import { Route, Routes } from 'react-router-dom';
import MyList from 'pages/publicPages/MyList';
import SearchPage from 'pages/publicPages/SearchPage';

function App() {
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="browse" element={<HomePage />} />
            <Route path="movies" element={<HomePage />} />
            <Route path="tvseries" element={<TVSeriesPage />} />
            <Route path="mylist" element={<MyList />} />
            <Route path="genre/:categoryName" element={<GenreWisePage />} />
            <Route path="search" element={<SearchPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="movies" element={<ShowMoviesPage />} />
            <Route path="addmovie" element={<AddMoviePage />} />
            <Route path="tvseries" element={<AddMoviePage />} />
            <Route path="addtvmovie" element={<AddMoviePage />} />
            <Route path="movie/edit/:id" element={<EditMoviePage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
