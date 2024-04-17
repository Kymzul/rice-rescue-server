import { Request, Response } from "express";
import { TTeam, TUser } from "../types";
import { PrismaClient } from "@prisma/client";

const teamPrisma = new PrismaClient().team;

export const getTeams = async (req: Request, res: Response) => {
    try {
        const teams = await teamPrisma.findMany({
            include: {
                teamBy: true
            }
        });

        return res.status(200).json({ message: teams, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const getSingleTeam = async (req: Request, res: Response) => {
    const { teamByID } = req.params;
    try {
        const findTeam = await teamPrisma.findFirst({
            where: { teamByID }, include: {
                teamBy: true
            }
        },);

        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find your team', status: 404 });
        }

        return res.status(200).json({ message: findTeam, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const postTeam = async (req: Request, res: Response) => {
    try {
        const { teamByID, teamMember, teamName } = req.body;

        await teamPrisma.create({
            data: {
                teamBy: {
                    connect: {
                        userID: teamByID
                    }
                },
                teamMember,
                teamName
            }
        });

        return res.status(201).json({ message: 'Successfully Created Team', status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const updateTeam = async (req: Request, res: Response) => {
    const { teamID } = req.params;


    const { teamMember } = req.body;

    try {

        const findTeam = await teamPrisma.findUnique({
            where: {
                teamID
            }
        });

        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find your team', status: 404 });
        }

        await teamPrisma.update({
            where: {
                teamID
            }, data: {
                teamMember,
                teamUpdatedAt: new Date()
            }
        });

        return res.status(201).json({ message: 'Successfully Updated', status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const deleteTeam = async (req: Request, res: Response) => {
    const { teamID } = req.params;

    try {

        const findTeam = await teamPrisma.findUnique({ where: { teamID } });

        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find team', status: 404 });
        }

        await teamPrisma.delete({
            where: {
                teamID
            }
        });

        return res.status(200).json({ message: 'Successfully Deleted Team', status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}






