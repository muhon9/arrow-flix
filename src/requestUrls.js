const ASSETS_BASE_URL = "./assets/images";
export const TMDB_API_LINK = "https://api.themoviedb.org/3";
// export const LANG = "en-US";
export const LANG = "hi-IN";
export const REGION = "US";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const LOGO_URL = `${ASSETS_BASE_URL}/NetFlix.png`;
export const MOBILE_LOGO_URL = `${ASSETS_BASE_URL}/Netlix-Mobile-Logo.png`;
export const PROFILE_PIC_URL = `${ASSETS_BASE_URL}/Netflix_profilepic.png`;
export const FALLBACK_IMG_URL = `${ASSETS_BASE_URL}/fallbackImage.png`;

const { REACT_APP_TMDB_API_KEY } = process.env;
// &language=${LANG}
const requestUrls = {
  fetchTrendingAll: `${TMDB_API_LINK}/trending/all/week?api_key=${REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
};

export default requestUrls;
