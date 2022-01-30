import joi from 'joi';

// validate user details for updatedUser
const validateUserUpdate = (user: any) => {
  const schema = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
    image: joi.string().required(),
  };
  // return joi.validate(user, schema);
};
