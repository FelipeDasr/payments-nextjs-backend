import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from "next-connect";

export const router = () => {
    return nextConnect({
        onError: (err, req: NextApiRequest, res: NextApiResponse, next) => {
            console.error(err.stack);
            res.status(500).json({
                message: "Unexpected error!"
            });
        },
        onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
            res.status(404).json({
                message: "Page is not found"
            });
        },
    });
}