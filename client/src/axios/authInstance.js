import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

const baseURL = 'http://localhost:8000/';
const authTokens = {
  access: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3OTQ4MGFkMWM2ZjdkZGVmNDcwOTEiLCJpYXQiOjE2NjY2OTQ3NjgsImV4cCI6MTY2NjY5NDg4OCwidHlwZSI6ImFjY2VzcyJ9.AMpTPNm3L1lckCEDaoThCawUWsx0KcHipQ8xRfstCkY',
  },
};

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access.token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log('Interceptor ran');

  const user = jwtDecode(authTokens.access.token);
  console.log(user);
  const isExpired = user.exp - moment().unix() < 5;
  console.log(isExpired);

  if (!isExpired) {
    console.log('first');
    return req;
  }

  const response = await axios.post(`${baseURL}/auth/refresh-tokens`, {
    refreshToken: authTokens.refresh.token,
  });

  localStorage.setItem('authTokens', JSON.stringify(response.data));

  // setUser(jwtDecode(response.data.access));

  req.headers.Authorization = `Bearer ${response.data.access.token}`;
  return req;
});

export default axiosInstance;
