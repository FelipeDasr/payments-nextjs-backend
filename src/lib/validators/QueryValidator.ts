import { IQueryDTO } from '../../dto/QueryDTOs';
import Joi from 'joi';

export const queryValidator = {
    query: Joi.object<IQueryDTO>({
        page: Joi.number().min(0).integer().optional(),
        limit: Joi.number().min(1).integer().optional()
    })
};