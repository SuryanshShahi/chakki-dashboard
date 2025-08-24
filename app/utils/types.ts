import { UUID } from 'crypto';
import { ReactNode } from 'react';
import { IChakkiList } from '../features/chakkis/types';
import { IButton } from '../shared/buttons/Button';

export interface IEmptyState {
  title?: string;
  subtitle?: string;
  btnProps?: IButton | null;
  icon?: ReactNode;
}

export interface ITableHeading {
  title: string;
  icon?: ReactNode;
  variant:
    | 'userCard'
    | 'stack'
    | 'progress'
    | 'chip'
    | 'tags'
    | 'actions'
    | 'text';
  actions?: string[];
  maxLimit?: number;
}

export interface IParams {
  [key: string]: string;
}

export interface IAddress {
  id: UUID;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  landmark: string;
  googlePlaceId: string;
  latitude: number;
  longitude: number;
}

export interface IUser {
  id: UUID;
  email: string;
  name: string;
  phone: string;
}

export interface IMerchant extends IUser {
  userId: string;
  status: string;
  photo: {
    url: string;
  };
  chakkis: Pick<IChakkiList, 'id' | 'name' | 'code' | 'status'>[];
}

export interface IDashboardStats {
  activeChakkis: number;
  activeMerchants: number;
  activeCustomers: number;
  activeProducts: number;
  averageRatings: number;
  deliveredOrders: number;
}
