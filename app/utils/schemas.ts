import { localize } from '@/i18n/dictionaries';
import * as yup from 'yup';
import { ErrorMessage, Regex } from './static';
// todo - refactor error messages

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
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Name must be at least 1 characters long')
      .max(255, 'Name must be less than 255 characters long'),
    code: yup
      .string()
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Code must be at least 1 characters long')
      .max(255, 'Code must be less than 255 characters long')
      .matches(
        Regex.ALPHANUMERIC_AND_DASHES,
        'Code must contain only letters, numbers, and dashes'
      ),
    merchant: yup
      .object({
        value: yup.string().required(ErrorMessage.REQUIRED),
        label: yup.string(),
      })
      .nullable()
      .required(ErrorMessage.REQUIRED),
    isCustomerRequestAvailable: yup.boolean(),
    minOrderAmount: yup.number(),
    deliveryRangeInKms: yup.number(),
    externalStoreLinks: yup.array().of(yup.string()),
    link: yup.string().matches(Regex.URL, localize('invalid_url')),
    contactDetails: yup.object().shape({
      name: yup.string(),
      phone: yup.string(),
      email: yup.string(),
    }),
    address: yup.object().shape({
      addressLine1: yup.string().max(255).required(ErrorMessage.REQUIRED),
      addressLine2: yup.string().max(255),
      addressLine3: yup.string().max(255),
      landmark: yup.string().max(255),
      mapLink: yup
        .string()
        .required(ErrorMessage.REQUIRED)
        .matches(Regex.MAP_LINK, localize('invalid_map_link')),
    }),
    selectedDays: yup.array().of(yup.number()).min(1, ErrorMessage.REQUIRED),
    operationalHours: yup.object(),
  });

export const addMerchantSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Name must be at least 1 characters long')
      .max(255, 'Name must be less than 255 characters long'),
    email: yup.string().matches(Regex.EMAIL, ErrorMessage.INVALID_EMAIL),
    phone: yup
      .string()
      .trim()
      .matches(Regex.PHONE, ErrorMessage.INVALID_PHONE)
      .required(ErrorMessage.REQUIRED),
  });

export const addProductSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Name must be at least 1 characters long')
      .max(255, 'Name must be less than 255 characters long'),
    code: yup
      .string()
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Code must be at least 1 characters long')
      .max(255, 'Code must be less than 255 characters long')
      .matches(
        Regex.ALPHANUMERIC_AND_DASHES,
        'Code must contain only letters, numbers, and dashes'
      ),
    description: yup
      .string()
      .required(ErrorMessage.REQUIRED)
      .min(1, 'Description must be at least 1 characters long')
      .max(500, 'Description must be less than 500 characters long'),
    takeCustomerRequests: yup.boolean(),
    pricePerUnit: yup.number().required(ErrorMessage.REQUIRED),
    measurementUnit: yup
      .object({
        value: yup.string().required(ErrorMessage.REQUIRED),
        label: yup.string(),
      })
      .nullable()
      .required(ErrorMessage.REQUIRED),
    externalStoreLinks: yup.array().of(yup.string()),
    link: yup.string().matches(Regex.URL, localize('invalid_url')),
  });
