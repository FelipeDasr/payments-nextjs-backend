import {
    IAuthenticatedRequestDTO,
    INewTransferRequestDTO
} from '../dto/RequestsDTOs';
import { IQueryDTO } from '../dto/QueryDTOs';

import { NextApiResponse } from 'next';
import { prisma } from '../lib/database';

export const transferMoney = async (req: INewTransferRequestDTO, res: NextApiResponse) => {
    try {
        const { accountId: payerId, cash } = req.locals;
        const { recipientId, value } = req.body;

        if (value > cash) {
            return res.status(200).json({
                message: "Insufficient funds"
            });
        }

        const recipient = await prisma.account.findFirst({
            where: {
                id: recipientId
            }
        });

        if (!recipient) {
            return res.status(400).json({
                message: "The recipient does not exist"
            });
        }

        const fieldsToSelect = {
            name: true,
            email: true,
            cash: true,
        }

        const transactionResult = await prisma.$transaction([
            prisma.account.update({
                where: {
                    id: payerId,
                },
                data: {
                    cash: {
                        decrement: value
                    }
                },
                select: { ...fieldsToSelect }
            }),
            prisma.account.update({
                where: {
                    id: recipientId
                },
                data: {
                    cash: {
                        increment: value
                    }
                },
                select: { ...fieldsToSelect, cash: false }
            }),
            prisma.transaction.create({
                data: {
                    payerId,
                    recipientId,
                    value
                }
            })
        ]);

        return res.status(200).json({
            payer: transactionResult[0],
            recipient: transactionResult[1],
            transferData: transactionResult[2]
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to transfer money'
        });
    }
}

export const getTransfers = async (req: IAuthenticatedRequestDTO, res: NextApiResponse) => {
    try {
        const query = req.query as IQueryDTO;
        const limit = query.limit ? Number(query.limit) : 50;
        const page = query.page ? Number(query.page) * limit : 0;

        const { accountId } = req.locals;

        const fieldsToSelect = {
            name: true,
            email: true,
        }

        const transfers = await prisma.$transaction([
            prisma.transaction.findMany({
                where: {
                    OR: [
                        { payerId: accountId },
                        { recipientId: accountId }
                    ]
                },
                include: {
                    payer: {
                        select: fieldsToSelect
                    },
                    recipient: {
                        select: fieldsToSelect
                    }
                },
                orderBy: {
                    id: 'desc'
                },
                take: limit,
                skip: page
            }),
            prisma.transaction.count({
                where: {
                    OR: [
                        { payerId: accountId },
                        { recipientId: accountId }
                    ]
                },
            })
        ]);

        return res.status(200).json({
            data: transfers[0],
            count: transfers[1]
        });
    }
    catch (e) {
        res.status(500).json({
            message: 'Error when trying to get transfers'
        });
    }
}
