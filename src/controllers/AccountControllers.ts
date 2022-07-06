import { IAuthenticationRequestDTO, ICreateAccountRequestDTO } from '../dto/RequestsDTOs';
import { NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '../lib/database';

export const createAccount = async (req: ICreateAccountRequestDTO, res: NextApiResponse) => {
    try {
        const account = req.body;

        const accountAlreadyExists = await prisma.account.findFirst({
            where: { email: account.email },
        });

        if (accountAlreadyExists) {
            return res.status(400).json({
                message: 'Email is already in use'
            });
        }

        account.password = bcrypt.hashSync(account.password, 10);
        
        const newAccount = await prisma.account.create({
            data: account,
            select: {
                id: true,
                name: true,
                email: true,
                cash: true,
            },
        });

        return res.status(201).json({ ...newAccount });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Error when trying to create the account'
        });
    }
}

export const authenticate = async (req: IAuthenticationRequestDTO, res: NextApiResponse) => {
    try {
        const { email, password } = req.body;
        const account = await prisma.account.findFirst({ where: { email } });

        if (!account) {
            return res.status(400).json({
                message: "The account does not exist"
            });
        }

        const passwordIsCorrect = bcrypt.compareSync(password, account.password);

        if (!passwordIsCorrect) {
            return res.status(401).json({
                message: "The email or password is incorrect"
            });
        }

        const token = jwt.sign(
            { email, accountId: account.id },
            process.env.API_SECRET_TOKEN || '',
            { expiresIn: '24h' }
        );

        return res.status(200).json({ token });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to authenticate account'
        });
    }
}