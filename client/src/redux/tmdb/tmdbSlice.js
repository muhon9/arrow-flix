import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  error: '',
  data: {},
};

export const fetchTmdbData = createAsyncThunk(
  'tmdb/fetchTmdbData',
  async (tmdbId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    );
    return response.data;
  }
);

const tmdbSlice = createSlice({
  name: 'tmdb',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTmdbData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTmdbData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTmdbData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getTmdbData, setTmdbData, tmdbError } = tmdbSlice.actions;
export default tmdbSlice.reducer;
