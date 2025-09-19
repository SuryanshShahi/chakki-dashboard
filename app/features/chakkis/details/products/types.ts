import { UUID } from 'crypto';

export interface IAddProductPayload {
  name: string;
  code: string;
  description: string;
  isAvailable: boolean;
  measurementUnit: string;
  pricePerUnit: number;
  status: string;
  takeCustomerRequests: boolean;
  externalStoreLinks?: string[];
}

export interface IProductList {
  id: UUID;
  createdAt: string;
  updatedAt: string;
  createdById: string | null;
  updatedById: string | null;
  name: string;
  code: string;
  description: string;
  measurementUnit: string;
  pricePerUnit: number;
  isAvailable: boolean;
  status: string;
  takeCustomerRequests: boolean;
  externalStoreLinks: any | null;
  isBestSeller: boolean;
}

export interface IUpdateProduct
  extends Omit<IAddProductPayload, 'measurementUnit'> {}

export interface IProductDetails extends IProductList {}
