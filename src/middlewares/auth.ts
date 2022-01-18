import joi from 'joi';
import { IUser } from './interface';
//user joi validation
export function validateSignUp(user: IUser) {
  const schema = joi.object({
    firstName: joi.string().min(3).max(20).required(),
    lastName: joi.string().min(3).max(20).required(),
    email: joi.string().email().max(50).required(),
    phoneNumber: joi.string().length(11).required(),
    password: joi.string().min(5).max(200).required(),
    password2: joi.ref('password'),
  });
  return schema.validate(user);
}
