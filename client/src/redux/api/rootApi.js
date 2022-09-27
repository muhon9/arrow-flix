import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_ROOT } from 'requestUrls';
import requestUrls from '../../requestUrls';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_ROOT }),
  endpoints: (builder) => ({
    getFeaturedMovies: builder.query({
      query: () => `${requestUrls.fetchFeaturedMovies}`,
    }),
    getActionMovies: builder.query({
      query: () => `${requestUrls.fetchActionMovies}`,
    }),
    getAdventureMovies: builder.query({
      query: () => `${requestUrls.fetchActionMovies}`,
    }),
    getDramaMovies: builder.query({
      query: () => `${requestUrls.fetchDramaMovies}`,
    }),
  }),
});

export const {
  useGetFeaturedMoviesQuery,
  useGetActionMoviesQuery,
  useGetAdventureMoviesQuery,
  useGetDramaMoviesQuery,
} = rootApi;
