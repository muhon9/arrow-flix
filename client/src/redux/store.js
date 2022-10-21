import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { rootApi } from './api/rootApi';
import modalReducer from './modal/modalSlice';
import tmdbReducer from './tmdb/tmdbSlice';
import searchReducer from './search/searchSlice';

const middlewares = [rootApi.middleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    modal: modalReducer,
    tmdb: tmdbReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export default store;
