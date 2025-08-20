import { Status } from '@/app/utils/enum';
import { IAddress, IUser } from '@/app/utils/types';
import { UUID } from 'crypto';

interface IChakkiContactDetails {
  name: string;
  email: string;
  phone: string;
}

export interface IChakkiList {
  id: UUID;
  name: string;
  code: string;
  status: Status;
  isCustomerRequestAvailable: boolean;
  operationalHours: {
    days: [];
  };
  isAcceptingOrders: boolean;
  isAcceptingPickup: boolean;
  addressId: UUID;
  deliveryRangeInKms: number;
  photos: { id?: UUID; url: string }[];
  address: {
    id: UUID;
    addressLine1: string;
    latitude: number;
    longitude: number;
  };
}

export interface IAddChakki {
  name: string;
  code: string;
  merchantId?: UUID;
  contactDetails?: IChakkiContactDetails;
  isCustomerRequestAvailable?: boolean;
  minOrderAmount?: number;
  operationalHours?: unknown;
  isAcceptingOrders?: boolean;
  isAcceptingPickups?: boolean;
  addressId?: UUID;
  deliveryRangeInKms?: number;
  externalStoreLinks?: string[];
}

export interface IUpdateChakki
  extends Omit<IAddChakki, 'merchantId' | 'addressId'> {}

export interface IChakkiDetails extends IChakkiList {
  externalStoreLinks: string[];
  merchant: IUser;
  address: IAddress;
  minOrderValue: number;
  contactDetails?: IChakkiContactDetails;
}
