import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookies";
import { localStorageKeys } from "../utils/enum";
import { getLocalItem, setLocalItem } from "../utils/localstorage";
import { getRefreshAccessToken } from "./apis";
import { decodeToken } from "../utils/constants";

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

      /**
       * Error codes:
       * 905: Refresh token expired
       * 401: Unauthorized
       */
      if (
        (error.response.data.httpStatus === 401 ||
          error.response.status === 401) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // Get a new access token using the refresh token.
          const decodedToken = decodeToken(getCookie("token")?.accessToken);
          let deviceId: string | null = getLocalItem(
            localStorageKeys.DEVICE_ID
          );
          if (deviceId === null) {
            deviceId = (await (await FingerprintJS.load()).get()).visitorId;
            setLocalItem(localStorageKeys.DEVICE_ID, deviceId);
          }
          const res = await getRefreshAccessToken(
            deviceId,
            decodedToken?.identity?.id
          );

          if (res?.data) {
            // Save the new token in the cookie.
            setCookie("token", JSON.stringify(res.data));
            const newAccessToken = res.data.accessToken;

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
          if (axios.isAxiosError(err) && err.response?.status === 401) {
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
