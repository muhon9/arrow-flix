import { getActionMovies } from '../redux/movies/actionMoviesSlice';
import { getAdventureMovies } from '../redux/movies/adventureMoviesSlice';
import {
  selectActionMovies,
  selectAdventureMovies,
} from '../redux/movies/moviesSelector';

export const homePageRowInfo = [
  {
    id: 0,
    row_title: 'Action Movies',
    sagaFunction: getActionMovies(),
    selector: selectActionMovies,
    genre: 'action',
  },
  {
    id: 1,
    row_title: 'Adventure Movies',
    sagaFunction: getAdventureMovies(),
    selector: selectAdventureMovies,
    genre: 'adventure',
  },
  {
    id: 3,
    row_title: 'Adventure Movies',
    sagaFunction: getAdventureMovies(),
    selector: selectAdventureMovies,
    genre: 'adventure',
  },
  {
    id: 4,
    row_title: 'Adventure Movies',
    sagaFunction: getAdventureMovies(),
    selector: selectAdventureMovies,
    genre: 'adventure',
  },
];
