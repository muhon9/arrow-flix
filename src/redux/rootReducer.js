import { combineReducers } from "@reduxjs/toolkit";
import featuredReducer from "./featured/featuredSlice";
import modalReducer from "./modal/modalSlice";
import actionMoviesReducer from "./movies/actionMoviesSlice";
import adventureMoviesReducer from "./movies/adventureMoviesSlice";
import genreMoviesReducer from "./movies/genreMoviesSlice";

export const rootReducer = combineReducers({
  modal: modalReducer,
  featured: featuredReducer,
  actionMovies: actionMoviesReducer,
  adventureMovies: adventureMoviesReducer,
  genreMovies: genreMoviesReducer,
});
