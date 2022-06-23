import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const adventureMoviesSlice = createSlice({
  name: "adventureMovies",
  initialState,
  reducers: {
    getAdventureMovies(state) {
      state.loading = true;
    },
    setAdventureMovies(state, { payload }) {
      state.loading = false;
      state.data = payload;
    },
    adventureMoviesError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getAdventureMovies, setAdventureMovies, adventureMoviesError } =
  adventureMoviesSlice.actions;
export default adventureMoviesSlice.reducer;
