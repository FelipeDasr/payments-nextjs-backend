import { IAccountMovementRequestDTO } from '../dto/RequestsDTOs';
import { NextApiResponse } from 'next';
import { prisma } from '../lib/database';
import { IQueryDTO } from '../dto/QueryDTOs';

export const depositMoney = async (req: IAccountMovementRequestDTO, res: NextApiResponse) => {
    try {
        const { accountId } = req.locals;
        const { amount } = req.body;

        const result = await prisma.account.update({
            where: { id: accountId },
            data: {
                cash: {
                    increment: amount
                },
                accountMovements: {
                    create: {
                        amount,
                        type: 'deposit'
                    }
                },
            },
            select: {
                cash: true
            }
        });

        return res.status(200).json(result);
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to deposit money'
        });
    }
}

export const withdrawMoney = async (req: IAccountMovementRequestDTO, res: NextApiResponse) => {
    try {
        const { accountId, cash } = req.locals;
        const { amount } = req.body;

        if (amount > cash) {
            return res.status(200).json({
                message: "Insufficient funds"
            });
        }

        const result = await prisma.account.update({
            where: { id: accountId },
            data: {
                cash: {
                    decrement: amount
                },
                accountMovements: {
                    create: {
                        amount,
                        type: 'cashwithdrawal'
                    }
                },
            },
            select: {
                cash: true
            }
        });

        return res.status(200).json(result);
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to withdraw money'
        });
    }
}

export const getAccountMovements = async (req: IAccountMovementRequestDTO, res: NextApiResponse) => {
    try {
        const query = req.query as IQueryDTO;
        const limit = query.limit ? Number(query.limit) : 50;
        const page = query.page ? Number(query.page) * limit : 0;

        const { accountId } = req.locals;

        const accountMovements = await prisma.$transaction([
            prisma.accountMovement.findMany({
                where: { accountId },
                select: {
                    type: true,
                    amount: true,
                    createdAt: true
                },
                take: limit,
                skip: page
            }),
            prisma.accountMovement.count({
                where: { accountId }
            })
        ]);

        return res.status(200).json({
            data: accountMovements[0],
            count: accountMovements[1]
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to get account movements'
        });
    }
}