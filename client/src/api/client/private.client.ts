import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const baseURL = 'http://localhost:4000/api/v1';

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(
  async (config: AxiosRequestConfig): Promise<any> => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!['Authorization'] = token;
      config.headers!['Content-Type'] = 'application/json';
    }
    console.log(config.headers);

    return config;
  }
);

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

export default privateClient;
