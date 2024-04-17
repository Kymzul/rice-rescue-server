import { NextFunction, Request, Response } from "express";
import { TUser } from "../types";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import prisma from "../../prisma";


export interface ValdationRequest extends Request {
    user: TUser
    token: string
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        const valdationReq = req as ValdationRequest;

        if (!token) {
            return res.status(401).json({ 'message': 'No auth token, access denied' });
        }

        const verified = jwt.verify(token, JWT_SECRET) as any;

        if (!verified) {
            return res.status(401).json({ 'message': 'Token verification failed' });
        }

        const user = await prisma.user.findFirst({ where: { userID: verified.userID } });

        if (!user) {
            return res.status(404).json({ 'message': 'User not found' });
        }

        valdationReq.token = token;
        valdationReq.user = user as TUser;

        console.log(user);

    } catch (e) {
        console.log('Error: ' + e);
        return res.status(500).json({ message: "Unauthorized: " + e });

    }
    next();

}

export default authMiddleware;