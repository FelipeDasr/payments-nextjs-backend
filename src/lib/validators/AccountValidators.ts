import { IAuthenticationDTO, IAccountDTO } from '../../dto/AccountDTOs';

import Joi from 'joi';

export const createAccountValidator = {
    body: Joi.object<IAccountDTO>({
        name: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        cash: Joi.number().positive().required()
    })
}

export const authenticationValidator = {
    body: Joi.object<IAuthenticationDTO>({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
}