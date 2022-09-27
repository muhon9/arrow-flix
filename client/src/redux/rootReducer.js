import { combineReducers } from '@reduxjs/toolkit';
import { rootApi } from './api/rootApi';
import featuredReducer from './featured/featuredSlice';
import modalReducer from './modal/modalSlice';
import actionMoviesReducer from './movies/actionMoviesSlice';
import adventureMoviesReducer from './movies/adventureMoviesSlice';
import genreMoviesReducer from './movies/genreMoviesSlice';
import tmdbReducer from './tmdb/tmdbSlice';

export const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  modal: modalReducer,
  tmdbData: tmdbReducer,
  featured: featuredReducer,
  actionMovies: actionMoviesReducer,
  adventureMovies: adventureMoviesReducer,
  genreMovies: genreMoviesReducer,
});
