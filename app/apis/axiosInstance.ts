import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../utils/cookies';
import { getRefreshAccessToken } from './apis';

const getBaseUrl = (name?: string) => {
  switch (name) {
    default:
      return process.env.NEXT_PUBLIC_API_URL;
  }
};

const axiosInstance = (serviceName?: string) => {
  const instance = axios.create({
    baseURL: getBaseUrl(serviceName),
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getCookie("token");
      if (token?.accessToken) {
        config.headers["Authorization"] = `Bearer ${token.accessToken}`;
        config.headers["ngrok-skip-browser-warning"] = `server`;
      } else {
        console.warn("Access token not found");
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        (error.response.data.httpStatus === 401 ||
          error.response.status === 401) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await getRefreshAccessToken();
          if (res) {
            // Save the new token in the cookie.
            setCookie('token', JSON.stringify(res));
            const newAccessToken = res.accessToken;

            // Update the authorization header with the new access token.
            instance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;

            return instance(originalRequest);
          } else {
            removeCookie('token');
            return Promise.reject(
              error instanceof Error
                ? error
                : new Error('An unexpected error occurred during token refresh')
            );
          }
        } catch (err) {
          if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 500)) {
            removeCookie('token');
            window.location.href = '/auth/login';
          }
          return Promise.reject(
            error instanceof Error
              ? error
              : new Error('An unexpected error occurred during token refresh')
          );
        }
      }

      return Promise.reject(
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred during token refresh')
      );
    }
  );
  return instance;
};

export default axiosInstance;
