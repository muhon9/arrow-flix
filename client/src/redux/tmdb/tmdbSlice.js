import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  data: {},
};

const tmdbSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {
    getTmdbData(state) {
      state.loading = true;
      state.error = "";
    },
    setTmdbData(state, { payload }) {
      state.loading = false;
      state.data = payload;
      state.error = "";
    },
    tmdbError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getTmdbData, setTmdbData, tmdbError } = tmdbSlice.actions;

export default tmdbSlice.reducer;
