import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  data: [],
};

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {
    getFeatured(state) {
      state.loading = true;
    },
    setFeatured(state, { payload }) {
      state.loading = false;
      state.data = payload;
    },
    featuredError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { getFeatured, setFeatured, featuredError } =
  featuredSlice.actions;
export default featuredSlice.reducer;
