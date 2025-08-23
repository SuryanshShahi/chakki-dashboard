import axios from 'axios';
import { UUID } from 'crypto';
import { IRequestOtp, IVerifyOtp } from '../features/auth/types';
import {
  IAddChakkiAddress,
  IAddChakkiPayload,
  IUpdateChakki,
  IUpdateChakkiStatus,
} from '../features/chakkis/types';
import { IAddMerchantPayload } from '../features/merchants/types';
import { getCookie } from '../utils/cookies';
import { getLocalItem } from '../utils/localstorage';
import { API_CONSTANTS } from './apiConstants';
import axiosInstance from './axiosInstance';

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
  const refreshToken = getCookie('token')?.refreshToken;
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
    `${process.env.NEXT_PUBLIC_API_URL}${API_CONSTANTS.refreshToken}`,
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
      'Content-Type': mimeType,
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

// --------------------------------------------------------------------------------------
// ---------------------------------------- Chakkis ----------------------------------------
// --------------------------------------------------------------------------------------

export const getChakkiList = async (
  filters?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance().get(
    API_CONSTANTS.getChakkiList(filters, page, limit)
  );
  return res?.data || {};
};

export const addChakki = async (body: IAddChakkiPayload) => {
  const res = await axiosInstance().post(API_CONSTANTS.addChakki, body);
  return res?.data;
};

export const addChakkiAddress = async (
  addressId: UUID,
  body: IAddChakkiAddress
) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.addChakkiAddress(addressId),
    body
  );
  return res?.data;
};

export const updateChakki = async (chakkiId: UUID, body: IUpdateChakki) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.updateChakki(chakkiId),
    body
  );
  return res?.data;
};

export const updateChakkiStatus = async (
  chakkiId: UUID,
  body: IUpdateChakkiStatus
) => {
  const res = await axiosInstance().patch(
    API_CONSTANTS.updateChakkiStatus(chakkiId),
    body
  );
  return res?.data;
};

export const deleteChakki = async (chakkiId: UUID) => {
  const res = await axiosInstance().delete(
    API_CONSTANTS.deleteChakki(chakkiId)
  );
  return res?.data;
};

export const addChakkiImages = async (chakkiId: UUID, formData: any) => {
  const res = await axiosInstance().post(
    API_CONSTANTS.addChakkiImage(chakkiId),
    formData
  );
  return res?.data;
};

export const getChakkiDetails = async (chakkiId: UUID) => {
  const res = await axiosInstance().get(
    API_CONSTANTS.getChakkiDetails(chakkiId)
  );
  return res?.data;
};

// --------------------------------------------------------------------------------------
// ---------------------------------------- Merchants ----------------------------------------
// --------------------------------------------------------------------------------------

export const addMerchant = async (body: IAddMerchantPayload) => {
  const res = await axiosInstance().post(API_CONSTANTS.addMerchant, body);
  return res?.data;
};

export const getMerchantList = async (
  filters?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance().get(
    API_CONSTANTS.getChakkiList(filters, page, limit)
  );
  return res?.data || {};
};

export const getActiveMerchantList = async (
  page?: number,
  limit?: number,
  filters?: string
) => {
  const res = await axiosInstance().get(
    API_CONSTANTS.getActiveMerchantList(page, limit, filters)
  );
  return res?.data;
};
