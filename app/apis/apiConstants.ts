import { UUID } from 'crypto';
import { createUrl } from '../utils/constants';

export const COMMON_API_CONSTANTS = {
  requestOtp: '/auth/request-otp',
  registerDevice: '/auth/device',
  verifyOtp: '/auth/verify-otp',
  refreshToken: '/auth/refresh',
  logout: '/auth/logout',
};

export const ADMIN_API_CONSTANTS = {
  getAdminDashboardStats: '/admin/common/stats',
  searchChakkiList: (filters?: string, page?: number, limit?: number) =>
    createUrl('/admin/chakki', {
      filters,
      limit,
      page,
    }),
  getChakkiDetails: (chakkiId: UUID) => `/admin/chakki/${chakkiId}`,
  addChakki: '/admin/chakki',
  addChakkiAddress: (chakkiId: UUID) => `/admin/chakki/${chakkiId}/address`,
  addChakkiImage: (chakkiId: UUID) => `/admin/chakki/${chakkiId}/image`,
  updateChakki: (chakkiId: UUID) => `/admin/chakki/${chakkiId}`,
  deleteChakki: (chakkiId: UUID) => `/admin/chakki/${chakkiId}`,
  updateChakkiStatus: (chakkiId: UUID) => `/admin/chakki/${chakkiId}/status`,
  addMerchant: `/admin/merchant`,
  getActiveMerchantList: (page?: number, limit?: number, filters?: string) =>
    createUrl(`/admin/merchant/list`, {
      filters,
      limit,
      page,
    }),
  searchMerchants: (filters?: string, page?: number, limit?: number) =>
    createUrl('/admin/merchant', {
      filters,
      limit,
      page,
    }),
  removeUserAsMerchant: (merchantId: UUID) => `/admin/merchant/${merchantId}`,
  updateMerchantStatus: (merchantId: UUID) =>
    `/admin/merchant/${merchantId}/status`,
  // todo - change product routes
  getProductDetails: (chakkiId: UUID, productId: UUID) =>
    `/admin/products/${productId}`,
  addProduct: (chakkiId: UUID) => '/admin/products',
  addProductImage: (chakkiId: UUID, productId: UUID) =>
    `/admin/chakki/${chakkiId}/product/${productId}/image`,
  updateProduct: (chakkiId: UUID, productId: UUID) =>
    `/admin/products/${productId}`,
  updateProductStatus: (chakkiId: UUID, productId: UUID) =>
    `/admin/products/${productId}/status`,
  searchProductList: (
    chakkiId: UUID,
    filters?: string,
    page?: number,
    limit?: number
  ) =>
    createUrl('/admin/products', {
      filters,
      limit,
      page,
    }),
  deleteProduct: (chakkiId: UUID, productId: UUID) =>
    `/admin/products/${productId}`,
};

export const SALESPERSON_API_CONSTANTS = {
  searchChakkiList: (filters?: string, page?: number, limit?: number) =>
    createUrl('/salesperson/chakki', {
      filters,
      limit,
      page,
    }),
  getChakkiDetails: (chakkiId: UUID) => `/salesperson/chakki/${chakkiId}`,
  addChakki: '/salesperson/chakki',
  addChakkiAddress: (chakkiId: UUID) =>
    `/salesperson/chakki/${chakkiId}/address`,
  addChakkiImage: (chakkiId: UUID) => `/salesperson/chakki/${chakkiId}/image`,
  updateChakki: (chakkiId: UUID) => `/salesperson/chakki/${chakkiId}`,
  deleteChakki: (chakkiId: UUID) => `/salesperson/chakki/${chakkiId}`,
  updateChakkiStatus: (chakkiId: UUID) =>
    `/salesperson/chakki/${chakkiId}/status`,
  addMerchant: `/salesperson/merchant`,
  getActiveMerchantList: (page?: number, limit?: number, filters?: string) =>
    createUrl(`/salesperson/merchant/list`, {
      filters,
      limit,
      page,
    }),
  searchMerchants: (filters?: string, page?: number, limit?: number) =>
    createUrl('/salesperson/merchant', {
      filters,
      limit,
      page,
    }),
  removeUserAsMerchant: (merchantId: UUID) =>
    `/salesperson/merchant/${merchantId}`,
  updateMerchantStatus: (merchantId: UUID) =>
    `/salesperson/merchant/${merchantId}/status`,
  // todo - change product routes
  getProductDetails: (chakkiId: UUID, productId: UUID) =>
    `/salesperson/products/${productId}`,
  addProduct: (chakkiId: UUID) => '/salesperson/products',
  addProductImage: (chakkiId: UUID, productId: UUID) =>
    `/salesperson/chakki/${chakkiId}/product/${productId}/image`,
  updateProduct: (chakkiId: UUID, productId: UUID) =>
    `/salesperson/products/${productId}`,
  updateProductStatus: (chakkiId: UUID, productId: UUID) =>
    `/salesperson/products/${productId}/status`,
  searchProductList: (
    chakkiId: UUID,
    filters?: string,
    page?: number,
    limit?: number
  ) =>
    createUrl('/salesperson/products', {
      filters,
      limit,
      page,
    }),
  deleteProduct: (chakkiId: UUID, productId: UUID) =>
    `/salesperson/products/${productId}`,
};
