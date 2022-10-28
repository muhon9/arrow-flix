import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { userLogedIn } from 'redux/auth/authSlice';

let store;

export const injectStore = (_store) => {
  store = _store;
};

const baseURL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (req) => {
  const localAuth = JSON.parse(localStorage.getItem('auth'));
  const accessToken = store.getState().auth.tokens.access.token;
  const refreshToken = store.getState().auth.tokens.refresh.token;

  req.headers.Authorization = `Bearer ${accessToken}`;

  const user = jwtDecode(accessToken);

  const isExpired = user.exp - moment().unix() < 5;

  if (!isExpired) {
    return req;
  }

  const response = await axios.post(`${baseURL}auth/refresh-tokens`, {
    refreshToken,
  });

  const newAuth = { user: store.getState().auth.user, tokens: response.data };

  localStorage.setItem('auth', JSON.stringify(newAuth));

  store.dispatch(userLogedIn(newAuth));

  req.headers.Authorization = `Bearer ${response.data.access.token}`;
  return req;
});

export default axiosInstance;
