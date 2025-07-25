import axios from "axios";
import { getCookie } from "../utils/cookies";
import { getLocalItem } from "../utils/localstorage";
import { API_CONSTANTS } from "./apiConstants";
import axiosInstance from "./axiosInstance";
import { IRequestOtp, IVerifyOtp } from "../features/auth/types";

const getAccessToken = (key: string) => {
  const accessToken = getLocalItem<{ accessToken: string }>(key)?.accessToken;
  const token = {
    Authorization: `Bearer ${accessToken}`,
  };

  return accessToken
    ? {
        headers: token,
      }
    : undefined;
};

const getRefreshToken = () => {
  const refreshToken = getCookie("token")?.refreshToken;
  return refreshToken;
};
/**
 * Get Refresh token
 * @param deviceId
 * @returns
 */
export const getRefreshAccessToken = async (
  deviceId: string,
  identityId: string
) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}${API_CONSTANTS.refreshToken}`,
    {
      deviceIdentifier: deviceId,
      refreshToken: getRefreshToken(),
      identityId,
    }
  );
  return res?.data?.response;
};

export const registerDevice = async (payload: { identifier: string }) => {
  const res = await axiosInstance().post(API_CONSTANTS.registerDevice, payload);
  return res?.data?.data;
};
export const uploadToS3 = async (url: string, data: any, mimeType: string) => {
  const res = await axios.put(url, data, {
    headers: {
      "Content-Type": mimeType,
    },
  });
  return res?.data?.data;
};
// --------------------------------------------------------------------------------------
// ---------------------------------------- Auth ----------------------------------------
// --------------------------------------------------------------------------------------

export const requestOtp = async (payload: IRequestOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.requestOtp, payload);
  return res?.data?.data;
};

export const verifyOtp = async (payload: IVerifyOtp) => {
  const res = await axiosInstance().post(API_CONSTANTS.verifyOtp, payload);
  return res?.data?.data;
};
