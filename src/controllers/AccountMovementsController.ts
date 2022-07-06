import { IAuthenticatedRequestDTO } from '../dto/RequestsDTOs';
import { NextApiResponse } from 'next';

export const depositMoney = async (req: IAuthenticatedRequestDTO, res: NextApiResponse) => {
    try {

    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to deposit money'
        });
    }
}

export const withdrawMoney = async (req: IAuthenticatedRequestDTO, res: NextApiResponse) => {
    try {

    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to withdraw money'
        });
    }
}