import { combineReducers } from "@reduxjs/toolkit";
import featuredReducer from "./featured/featuredSlice";
import modalReducer from "./modal/modalSlice";

export const rootReducer = combineReducers({
  modal: modalReducer,
  featured: featuredReducer,
});
