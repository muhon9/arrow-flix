import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const actionMoviesSlice = createSlice({
  name: 'actionMovies',
  initialState,
  reducers: {
    getActionMovies(state) {
      state.loading = true;
    },
    setActionMovies(state, { payload }) {
      state.loading = false;
      state.data = payload;
    },
    actionMoviesError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getActionMovies, setActionMovies, actionMoviesError } =
  actionMoviesSlice.actions;
export default actionMoviesSlice.reducer;
