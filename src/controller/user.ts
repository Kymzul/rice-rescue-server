import { Request, Response } from "express"
import prisma from "../../prisma";
import { ValdationRequest } from "../middleware/auth";
import { TUser } from "../types";


export const getMe = async (req: Request, res: Response) => {
    const validationReq = req as ValdationRequest;
    const authenticatedUserID = validationReq.user.userID;

    try {
        const findUser = await prisma.user.findFirst({ where: { userID: authenticatedUserID } });

        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }

        return res.status(200).json(findUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const findUsers = await prisma.user.findMany();
        return res.status(200).json({ 'message': findUsers });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    const validationReq = req as ValdationRequest;
    const authenticatedUserID = validationReq.user.userID;

    try {
        if (authenticatedUserID !== userID) {
            return res.status(403).json({ 'message': 'You are not authorized yet' });
        }

        const findUser = await prisma.user.findFirst({ where: { userID: userID } });

        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }

        return res.status(200).json({ message: findUser });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    const validationReq = req as ValdationRequest;
    const authenticatedUserID = validationReq.user.userID;
    try {
        if (authenticatedUserID !== userID) {
            return res.status(403).json({ 'message': 'You are not authorized yet' });
        }

        const findUser = await prisma.user.findFirst({ where: { userID: userID } });

        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }

        await prisma.user.deleteMany({
            where: {
                userID: userID
            }
        });


        return res.status(200).json({ 'message': 'User has been deleted: ' + userID });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
}