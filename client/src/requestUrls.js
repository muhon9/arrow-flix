const ASSETS_BASE_URL = './assets/images';
export const TMDB_API_LINK = 'https://api.themoviedb.org/3';
export const LANG = 'en-US';
export const SERVER_ROOT = `${process.env.React_APP_BACKEND_ROOT}`;

export const REGION = 'US';
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
export const LOGO_URL = `${ASSETS_BASE_URL}/NetFlix.png`;
export const MOBILE_LOGO_URL = `${ASSETS_BASE_URL}/Netlix-Mobile-Logo.png`;
export const PROFILE_PIC_URL = `${ASSETS_BASE_URL}/Netflix_profilepic.png`;
export const FALLBACK_IMG_URL = `${ASSETS_BASE_URL}/fallbackImage.png`;

const { REACT_APP_TMDB_API_KEY } = process.env;
// &language=${LANG}
const requestUrls = {
  fetchFeaturedMovies: `${SERVER_ROOT}/movie`,
  fetchEnglishMovies: `${SERVER_ROOT}/movie?sortBy=release_date:desc&category=English`,
  fetchActionMovies: `${SERVER_ROOT}/movie?sortBy=release_date:desc&geners=Action`,
  fetchAdventureMovies: `${SERVER_ROOT}/movie?sortBy=release_date:desc&geners=Adventure`,
  fetchDramaMovies: `${SERVER_ROOT}/movie?sortBy=release_date:desc&geners=Drama`,
};

export default requestUrls;
