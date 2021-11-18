import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { API_URL, storagePrefix } from '@/config';
import { storage } from '@/utils/storage';
import { getRefreshToken } from '@/features/auth';
import { useNotificationStore } from '@/stores';

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

function getToken() {
  const storagedToken = storage.getItem({ key: 'token', storageType: 'local' });
  const sessionToken = storage.getItem({
    key: 'token',
    storageType: 'session',
  });

  if (storagedToken) {
    return {
      token: storagedToken,
      type: 'local',
    };
  }
  if (sessionToken) {
    return {
      token: sessionToken,
      type: 'session',
    };
  }

  return null;
}

function getStoredRefreshToken() {
  const storagedRefreshToken = storage.getItem({
    key: 'refreshToken',
    storageType: 'local',
  }) as string;
  const sessionRefreshToken = storage.getItem({
    key: 'refreshToken',
    storageType: 'session',
  }) as string;

  if (storagedRefreshToken) {
    return {
      token: storagedRefreshToken,
      type: 'local',
    };
  }
  if (sessionRefreshToken) {
    return {
      token: sessionRefreshToken,
      type: 'session',
    };
  }

  return null;
}

function authRequestInterceptor(config: AxiosRequestConfig) {
  const storedToken = getToken();
  config.headers.authorization = `${storedToken?.token}`;
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
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        const originalConfig = error.config;
        const storedRefreshToken = getStoredRefreshToken();

        if (!isRefreshing) {
          isRefreshing = true;

          return (
            storedRefreshToken !== null &&
            getRefreshToken(storedRefreshToken.token)
              .then(response => {
                const { user, token, refreshToken } = response;

                if (storedRefreshToken.type === 'session') {
                  storage.setItem({
                    key: 'user',
                    storageType: 'session',
                    values: user,
                  });
                  storage.setItem({
                    key: 'token',
                    storageType: 'session',
                    values: { token },
                  });
                  storage.setItem({
                    key: 'refreshToken',
                    storageType: 'session',
                    values: { refreshToken },
                  });
                }

                if (storedRefreshToken.type === 'local') {
                  storage.setItem({
                    key: 'user',
                    storageType: 'local',
                    values: user,
                  });
                  storage.setItem({
                    key: 'token',
                    storageType: 'local',
                    values: { token },
                  });
                  storage.setItem({
                    key: 'refreshToken',
                    storageType: 'local',
                    values: { refreshToken },
                  });
                }
                axios.defaults.headers.Authorization = `${token}`;
                failedRequestsQueue.forEach(request =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];
              })
              .catch(error => {
                console.log(error);
                failedRequestsQueue.forEach(request =>
                  request.onFailure(error),
                );
                failedRequestsQueue = [];

                setTimeout(() => {
                  Object.keys(localStorage)
                    .filter(id => id.includes(storagePrefix))
                    .map(item => localStorage.removeItem(item));

                  Object.keys(sessionStorage)
                    .filter(id => id.includes(storagePrefix))
                    .map(item => localStorage.removeItem(item));
                  window.location.href = '/';
                }, 5000);
              })
              .finally(() => {
                isRefreshing = false;
              })
          );
        }
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `${token}`;

              resolve(axios(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      }
      setTimeout(() => {
        Object.keys(localStorage)
          .filter(id => id.includes(storagePrefix))
          .map(item => localStorage.removeItem(item));

        Object.keys(sessionStorage)
          .filter(id => id.includes(storagePrefix))
          .map(item => localStorage.removeItem(item));
        window.location.href = '/';
      }, 5000);
      return Promise.reject(new Error('Error with auth token'));
    }
    if (error) {
      const message = error.response?.data?.message || error.message;
      useNotificationStore
        .getState()
        .addNotification({ type: 'error', title: 'Erro', message });
    }
    return Promise.reject(error);
  },
);
