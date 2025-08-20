import * as yup from 'yup';
import { ErrorMessage, Regex } from './static';

export const loginWithEmailSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .matches(Regex.EMAIL, ErrorMessage.INVALID_EMAIL)
      .required(ErrorMessage.REQUIRED),
  });

export const addChakkiSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(1, 'Name must be at least 1 characters long')
      .max(255, 'Name must be less than 255 characters long'),
    code: yup
      .string()
      .required('Code is required')
      .min(1, 'Code must be at least 1 characters long')
      .max(255, 'Code must be less than 255 characters long'),
    merchant: yup
      .object({
        value: yup.string().required('Merchant is required'),
        label: yup.string(),
      })
      .nullable()
      .required('Merchant is required'),
    isCustomerRequestAvailable: yup.boolean(),
    minOrderAmount: yup.number(),
    deliveryRangeInKms: yup.number(),
    externalStoreLinks: yup.array().of(yup.string()),
    contactDetails: yup.object().shape({
      name: yup.string(),
      phone: yup.string(),
      email: yup.string(),
    }),
    // todo: pending implementation
    operationalHours: yup.object(),
    addressId: yup.string(),
  });
