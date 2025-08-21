import { localize } from '@/i18n/dictionaries';
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
    link: yup.string().matches(Regex.URL, localize('invalid_url')),
    contactDetails: yup.object().shape({
      name: yup.string(),
      phone: yup.string(),
      email: yup.string(),
    }),
    address: yup.object().shape({
      addressLine1: yup
        .string()
        .max(255)
        .required(localize('address_line_1_is_required')),
      addressLine2: yup.string().max(255),
      addressLine3: yup.string().max(255),
      landmark: yup.string().max(255),
      mapLink: yup
        .string()
        .required(localize('map_link_is_required'))
        .matches(Regex.MAP_LINK, localize('invalid_map_link')),
    }),
    // todo: pending implementation
    operationalHours: yup.object(),
  });
