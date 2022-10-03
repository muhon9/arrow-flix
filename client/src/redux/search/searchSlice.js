import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from 'api/movieApi';
import axios from 'axios';

const initialState = {
  loading: false,
  error: '',
  searchResult: [],
};

export const searchContent = createAsyncThunk(
  'search/searchContent',
  movieApi.searchContentByQuery
  // async (query) => {
  //   const response = await axios.get(
  //     `${process.env.React_APP_BACKEND_ROOT}/movie/search?q=${query}`
  //   );
  //   return response.data;
  // }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.searchResult = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
