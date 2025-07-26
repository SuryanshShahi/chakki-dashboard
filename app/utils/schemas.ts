import * as yup from 'yup';
import { ErrorMessage, Regex } from './static';

export const loginWithEmailSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .matches(Regex.EMAIL, ErrorMessage.INVALID_EMAIL)
      .required(ErrorMessage.REQUIRED),
  });
