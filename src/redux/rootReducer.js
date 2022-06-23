import { combineReducers } from "@reduxjs/toolkit";
import featuredReducer from "./featured/featuredSlice";
import modalReducer from "./modal/modalSlice";
import actionMoviesReducer from "./movies/actionMoviesSlice";
import adventureMoviesReducer from "./movies/adventureMoviesSlice";

export const rootReducer = combineReducers({
  modal: modalReducer,
  featured: featuredReducer,
  actionMovies: actionMoviesReducer,
  adventureMovies: adventureMoviesReducer,
});
