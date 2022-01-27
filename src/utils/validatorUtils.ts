import Joi from 'joi'


export interface Login {
    email: string,
    password: string
}

export const validateLogin = (data: Login) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data);
}

