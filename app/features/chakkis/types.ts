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
  operationalHours: IOperationalHours;
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
  merchant: IUser;
}

export interface IAddChakkiPayload {
  name: string;
  code: string;
  merchantId?: UUID;
  contactDetails?: IChakkiContactDetails;
  isCustomerRequestAvailable?: boolean;
  minOrderAmount?: number;
  operationalHours?: IOperationalHours;
  isAcceptingOrders?: boolean;
  isAcceptingPickups?: boolean;
  deliveryRangeInKms?: number;
  externalStoreLinks?: string[];
}

export interface IAddChakkiAddress {
  googlePlaceId?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
  latitude: number;
  longitude: number;
}

export interface IUpdateChakki
  extends Omit<IAddChakkiPayload, 'merchantId' | 'addressId'> {}

export interface IChakkiDetails extends IChakkiList {
  externalStoreLinks: string[];
  merchant: IUser;
  address: IAddress;
  minOrderValue: number;
  contactDetails?: IChakkiContactDetails;
}

export interface IOperationalHours {
  [day: number]: {
    startTime: string;
    endTime: string;
  };
}
