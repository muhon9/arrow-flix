import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { rootApi } from './api/rootApi';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';
import featuredReducer from './featured/featuredSlice';
import modalReducer from './modal/modalSlice';
import actionMoviesReducer from './movies/actionMoviesSlice';
import adventureMoviesReducer from './movies/adventureMoviesSlice';
import genreMoviesReducer from './movies/genreMoviesSlice';
import tmdbReducer from './tmdb/tmdbSlice';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    modal: modalReducer,
    // tmdbData: tmdbReducer,
    // featured: featuredReducer,
    // actionMovies: actionMoviesReducer,
    // adventureMovies: adventureMoviesReducer,
    // genreMovies: genreMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
});

// sagaMiddleware.run(rootSaga);
export default store;
