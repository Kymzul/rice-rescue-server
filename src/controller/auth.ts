import { Request, Response } from "express"
import { compareSync, hashSync } from "bcrypt";
import prisma from "../../prisma";
import { TAvatar, TMachine, TSocialMedia } from "../types";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";

export const signup = async (req: Request, res: Response) => {
    const { userEmail,
        userPassword,
        userName,
        userAge,
        userDesc,
        userType,
        userRole,
        userExp } = req.body;

    const userSocialMedia: TSocialMedia[] = []

    const userAvatar: TAvatar = {
        avatarURL: 'https://media.timeout.com/images/105805277/750/422/image.jpg',
        avatarURLName: 'https://media.timeout.com/images/105805277/750/422/image.jpg'
    }

    try {
        const hashedPassword = hashSync(userPassword, 10);

        const isExist = await prisma.user.findFirst({ where: { userEmail: userEmail } });

        if (isExist) {
            return res.status(403).json({ data: { message: 'Email already exist', status: 403 } });
        } else {
            const user = await prisma.user.create({
                data: {
                    userEmail,
                    userPassword: hashedPassword,
                    userName,
                    userAge,
                    userDesc,
                    userType,
                    userSocialMedia,
                    userRole,
                    userAvatar,
                    userExp
                }
            });

            const token = jwt.sign({ userID: user.userID }, JWT_SECRET);

            return res.status(201).json({ data: { message: 'Successfully Register', status: 201 }, token: token });

        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({ data: { message: 'Internal Server Error: ' + e, status: 500 } });
    }
}

export const signin = async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;

    try {
        if (!userEmail || !userPassword) {
            return res.status(403).json({ message: 'Uncompleted Filled', status: 403 });
        }
        console.log(userEmail);

        const findUser = await prisma.user.findUnique({ where: { userEmail: userEmail } });

        if (!findUser) {
            return res.status(404).json({ message: 'Email not found', status: 404 });

        }
        if (!compareSync(userPassword, findUser.userPassword)) {
            return res.status(401).json({ 'message': 'Password not matched', status: 401 });
        }

        const token = jwt.sign({ userID: findUser.userID }, JWT_SECRET);

        return res.status(200).json({ message: 'Successfully Login', token: token });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
}