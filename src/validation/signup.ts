import Validator from 'validator';
import { isEmpty } from './is-empty';
// import Joi fr

interface dataInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  phoneNumber: string;
  avatar: string;
}

interface error {
  [key: string]: string;
}

export const userRegisterInput = (data: dataInput) => {
  let errors: error = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
  data.avatar = !isEmpty(data.avatar)
    ? data.avatar
    : '';

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password should be more than 6 characters';
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'The email provided is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Password provided does not match';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
