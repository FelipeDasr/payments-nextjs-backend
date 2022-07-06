import { IAuthenticatedRequestDTO } from '../../dto/RequestsDTOs';
import { ITokenPayload } from '../../dto/AccountDTOs';
import { NextHandler } from 'next-connect';
import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { prisma } from '../database';

export const authenticator = (
    req: IAuthenticatedRequestDTO,
    res: NextApiResponse,
    next: NextHandler
) => {

    const bearerToken = req.headers.authorization || ''
    const token = bearerToken.split(' ')[1]

    if (!token) {
        return res.status(401).send({ errors: 'The access token is required' });
    }

    jwt.verify(token, process.env.API_SECRET_TOKEN || '', async (err, data) => {

        if (err) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const { email, accountId: id } = data as ITokenPayload;
        const account = await prisma.account.findFirst({
            where: { email, id, },
            select: { id: true }
        });

        if (!account) {
            return res.status(400).json({
                message: 'The account does not exist'
            });
        }

        req.locals = { accountId: account.id };
        next();
    });
}