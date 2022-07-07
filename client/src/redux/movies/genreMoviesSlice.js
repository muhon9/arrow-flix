import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const genreMoviesSlice = createSlice({
  name: "genreMovies",
  initialState,
  reducers: {
    getGenreMovies(state) {
      state.loading = true;
    },
    setGenreMovies(state, { payload }) {
      state.loading = false;
      state.data = payload;
    },
    genreMoviesError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getGenreMovies, setGenreMovies, genreMoviesError } =
  genreMoviesSlice.actions;
export default genreMoviesSlice.reducer;
