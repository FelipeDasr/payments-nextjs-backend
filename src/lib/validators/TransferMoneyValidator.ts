import { INewTransferDTO } from '../../dto/TransferDTOs';
import Joi from 'joi';

export const transferMoneyValidator = {
    body: Joi.object<INewTransferDTO>({
        recipientId: Joi.number().required(),
        value: Joi.number().positive()
    })
}