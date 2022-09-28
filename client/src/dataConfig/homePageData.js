import {
  useGetActionMoviesQuery,
  useGetAdventureMoviesQuery,
  useGetDramaMoviesQuery,
} from 'redux/api/rootApi';

export const homePageRowInfo = [
  {
    id: 0,
    row_title: 'Action Movies',
    genre: 'action',
    apiHook: useGetActionMoviesQuery,
  },
  {
    id: 1,
    row_title: 'Adventure Movies',
    genre: 'adventure',
    apiHook: useGetActionMoviesQuery,
  },
  {
    id: 2,
    row_title: 'Drama Movies',
    genere: 'drama',
    apiHook: useGetDramaMoviesQuery,
  },
  {
    id: 3,
    row_title: 'Adventure Movies',
    genere: 'adventure',
    apiHook: useGetAdventureMoviesQuery,
  },
];
