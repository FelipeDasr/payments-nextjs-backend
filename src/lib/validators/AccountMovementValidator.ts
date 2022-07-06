import { IAccountMovementDTO } from '../../dto/AccountMovementDTOs';
import Joi from 'joi';

export const newAccountMovementValidator = {
    body: Joi.object<IAccountMovementDTO>({
        amount: Joi.number().positive().required()
    })
};