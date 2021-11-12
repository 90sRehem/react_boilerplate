import Axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { API_URL } from '@/config';
import { tokenStorage } from '@/utils/token';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = tokenStorage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor, error => {
  Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
