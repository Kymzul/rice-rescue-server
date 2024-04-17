import { Request, Response } from "express";
import { TForum } from "../types";
import { PrismaClient } from "@prisma/client";

const forumClient = new PrismaClient().forum;

export const getForums = async (req: Request, res: Response) => {
    try {
        const forums: TForum[] = await forumClient.findMany(
            {
                include: {
                    forumBy: true
                }
            }
        );

        return res.status(200).json({ message: forums, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const postForum = async (req: Request, res: Response) => {
    const { forumContent, forumByID, forumLocation } = req.body;
    try {

        await forumClient.create({
            data: {
                forumContent,
                forumByID,
                forumLocation
            }
        });

        return res.status(201).json({ message: 'Successfully Posted', status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const deleteForum = async (req: Request, res: Response) => {
    const { forumID } = req.params;
    try {

        const findForum = await forumClient.findUnique({
            where: {
                forumID
            }
        });

        if (!findForum) {
            return res.status(404).json({ message: 'Unable to delete', status: 404 });
        }

        await forumClient.delete({
            where: {
                forumID
            }
        })

        return res.status(200).json({ message: 'Successfully Deleted', status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


