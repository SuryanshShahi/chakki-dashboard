import { UUID } from 'crypto';
import { ReactNode } from 'react';
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
