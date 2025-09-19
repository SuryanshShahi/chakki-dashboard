import axios from 'axios';
import { UUID } from 'crypto';
import { IRequestOtp, IVerifyOtp } from '../features/auth/types';
import { IAddProductPayload } from '../features/chakkis/details/products/types';
import {
  IAddChakkiAddress,
  IAddChakkiPayload,
  IUpdateChakki,
} from '../features/chakkis/types';
import { IAddMerchantPayload } from '../features/merchants/types';
import { decodeToken } from '../utils/constants';
import { getCookie } from '../utils/cookies';
import { IUpdateEntityStatus } from '../utils/types';
import {
  ADMIN_API_CONSTANTS,
  COMMON_API_CONSTANTS,
  SALESPERSON_API_CONSTANTS,
} from './apiConstants';
import axiosInstance from './axiosInstance';

const getAccessToken = () => {
  const accessToken = getCookie('token')?.accessToken;
  return accessToken;
};

const getDecodedAccessToken = () => {
  return decodeToken(getAccessToken());
};

const getRefreshToken = () => {
  const refreshToken = getCookie('token')?.refreshToken;
  return refreshToken;
};

const currentUserRole = getDecodedAccessToken()?.role || 'admin';

const rolesApiConstants = {
  admin: ADMIN_API_CONSTANTS,
  salesperson: SALESPERSON_API_CONSTANTS,
};

/**
 * Get Refresh token
 * @param deviceId
 * @returns
 */
export const getRefreshAccessToken = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${COMMON_API_CONSTANTS.refreshToken}`,
    {
      refreshToken: getRefreshToken(),
      accessToken: getAccessToken(),
    }
  );
  return res?.data?.data;
};

export const logout = async () => {
  const res = await axiosInstance().post(COMMON_API_CONSTANTS.logout);
  return res?.data?.data;
};

export const registerDevice = async (payload: { identifier: string }) => {
  const res = await axiosInstance().post(
    COMMON_API_CONSTANTS.registerDevice,
    payload
  );
  return res?.data?.data;
};
// --------------------------------------------------------------------------------------
// ---------------------------------------- Auth ----------------------------------------
// --------------------------------------------------------------------------------------

export const requestOtp = async (payload: IRequestOtp) => {
  const res = await axiosInstance().post(
    COMMON_API_CONSTANTS.requestOtp,
    payload
  );
  return res?.data?.data;
};

export const verifyOtp = async (payload: IVerifyOtp) => {
  const res = await axiosInstance().post(
    COMMON_API_CONSTANTS.verifyOtp,
    payload
  );
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
    rolesApiConstants[currentUserRole].searchChakkiList(filters, page, limit)
  );
  return res?.data || {};
};

export const addChakki = async (body: IAddChakkiPayload) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addChakki,
    body
  );
  return res?.data;
};

export const addChakkiAddress = async (
  addressId: UUID,
  body: IAddChakkiAddress
) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addChakkiAddress(addressId),
    body
  );
  return res?.data;
};

export const updateChakki = async (chakkiId: UUID, body: IUpdateChakki) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].updateChakki(chakkiId),
    body
  );
  return res?.data;
};

export const updateChakkiStatus = async (
  chakkiId: UUID,
  body: IUpdateEntityStatus
) => {
  const res = await axiosInstance().patch(
    rolesApiConstants[currentUserRole].updateChakkiStatus(chakkiId),
    body
  );
  return res?.data;
};

export const deleteChakki = async (chakkiId: UUID) => {
  const res = await axiosInstance().delete(
    rolesApiConstants[currentUserRole].deleteChakki(chakkiId)
  );
  return res?.data;
};

export const addChakkiImages = async (chakkiId: UUID, formData: FormData) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addChakkiImage(chakkiId),
    formData
  );
  return res?.data;
};

export const getChakkiDetails = async (chakkiId: UUID) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].getChakkiDetails(chakkiId)
  );
  return res?.data?.data;
};

// --------------------------------------------------------------------------------------
// ---------------------------------------- Products ----------------------------------------
// --------------------------------------------------------------------------------------

export const getProductList = async (
  chakkiId: UUID,
  filters?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].searchProductList(
      chakkiId,
      filters,
      page,
      limit
    )
  );
  return res?.data?.data || {};
};

export const getProductDetails = async (chakkiId: UUID, productId: UUID) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].getProductDetails(chakkiId, productId)
  );
  return res?.data?.data;
};

export const addProduct = async (chakkiId: UUID, body: IAddProductPayload) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addProduct(chakkiId),
    {
      ...body,
      // todo - remove chakkiId from body
      chakkiId,
    }
  );
  return res?.data;
};

export const addProductImages = async (
  chakkiId: UUID,
  productId: UUID,
  formData: FormData
) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addProductImage(chakkiId, productId),
    formData
  );
  return res?.data;
};

export const updateProduct = async (
  chakkiId: UUID,
  productId: UUID,
  body: IUpdateChakki
) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].updateProduct(chakkiId, productId),
    body
  );
  return res?.data;
};

export const updateProductStatus = async (
  chakkiId: UUID,
  productId: UUID,
  body: IUpdateEntityStatus
) => {
  const res = await axiosInstance().patch(
    rolesApiConstants[currentUserRole].updateProductStatus(chakkiId, productId),
    body
  );
  return res?.data;
};

export const deleteProduct = async (chakkiId: UUID, productId: UUID) => {
  const res = await axiosInstance().delete(
    rolesApiConstants[currentUserRole].deleteProduct(chakkiId, productId)
  );
  return res?.data;
};

// --------------------------------------------------------------------------------------
// ---------------------------------------- Merchants ----------------------------------------
// --------------------------------------------------------------------------------------

export const addMerchant = async (body: IAddMerchantPayload) => {
  const res = await axiosInstance().post(
    rolesApiConstants[currentUserRole].addMerchant,
    body
  );
  return res?.data?.data;
};

export const getMerchantList = async (
  filters?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].searchChakkiList(filters, page, limit)
  );
  return res?.data || {};
};

export const getActiveMerchantList = async (
  page?: number,
  limit?: number,
  filters?: string
) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].getActiveMerchantList(
      page,
      limit,
      filters
    )
  );
  return res?.data;
};

export const searchMerchants = async (
  filters?: string,
  page?: number,
  limit?: number
) => {
  const res = await axiosInstance().get(
    rolesApiConstants[currentUserRole].searchMerchants(filters, page, limit)
  );
  return res?.data?.data;
};

export const removeUserAsMerchant = async (merchantId: UUID) => {
  const res = await axiosInstance().delete(
    rolesApiConstants[currentUserRole].removeUserAsMerchant(merchantId)
  );
  return res?.data;
};

export const updateMerchantStatus = async (
  merchantId: UUID,
  body: IUpdateEntityStatus
) => {
  const res = await axiosInstance().patch(
    rolesApiConstants[currentUserRole].updateMerchantStatus(merchantId),
    body
  );
  return res?.data;
};

// --------------------------------------------------------------------------------------
// ---------------------------------------- Misc ----------------------------------------
// --------------------------------------------------------------------------------------

export const getDashboardStats = async () => {
  const res = await axiosInstance().get(
    ADMIN_API_CONSTANTS.getAdminDashboardStats
  );
  return res?.data?.data;
};
