import { IAuthenticatedRequestDTO } from '../dto/RequestsDTOs';
import { NextApiResponse } from 'next';

export const transferMoney = async (req: IAuthenticatedRequestDTO, res: NextApiResponse) => {
    try {

    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to transfer money'
        });
    }
}

export const getTransfers = async (req: IAuthenticatedRequestDTO, res: NextApiResponse) => {
    try {

    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to get transfers'
        });
    }
}
