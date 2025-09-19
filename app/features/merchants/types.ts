import { UUID } from 'crypto';

export interface IAddMerchantPayload {
  id?: UUID
  name: string;
  phone: string;
  email?: string;
}
