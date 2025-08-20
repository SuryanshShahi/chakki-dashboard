import { UUID } from 'crypto';
import { createUrl } from '../utils/constants';

export const API_CONSTANTS = {
  requestOtp: '/auth/request-otp',
  registerDevice: '/auth/device',
  verifyOtp: '/auth/verify-otp',
  refreshToken: '/auth/refresh',
  getChakkiList: (filters?: string, page?: number, limit?: number) =>
    createUrl('/admin/chakki', {
      filters,
      limit,
      page,
    }),
  getChakkiDetails: (chakkiId: UUID) => `/admin/chakki/${chakkiId}`,
  addChakki: '/admin/chakki',
  addChakkiImage: (chakkiId: UUID) => `/admin/chakki/${chakkiId}/image`,
  updateChakki: (chakkiId: UUID) => `/admin/chakki/${chakkiId}`,
  getActiveMerchantList: (page?: number, limit?: number, filters?: string) =>
    createUrl(`/admin/merchant/list`, {
      filters,
      limit,
      page,
    }),
};
