import { Request, Response } from "express"
import { TAvatar, TMachine } from "../types";
import prisma from "../../prisma";
import { machine } from "os";
import { PrismaClient } from "@prisma/client";

const machineClient = new PrismaClient().machine;

export const getMachines = async (req: Request, res: Response) => {
    try {
        const machines: TMachine[] = await prisma.machine.findMany({
            include: {
                machineOwner: true
            }
        });

        return res.status(200).json({ message: machines, status: 200 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const postMachine = async (req: Request, res: Response) => {


    try {
        const {
            machineName,
            machineDesc,
            machineOwnerID,
            machineImage,
            machinePICsID,
            machineStatus
        } = req.body;

        if (!machineName || !machineDesc || !machineOwnerID || !machineImage || !machinePICsID || !machineStatus) {
            return res.status(400).json({ message: 'Missing required fields', status: 400 });
        }

        await prisma.machine.create({
            data: {
                machineName,
                machineDesc,
                machineImage,
                machineOwner: {
                    connect: {
                        userID: machineOwnerID
                    }
                },
                machinePICsID,
                machineStatus

            }
        });

        return res.status(201).json({ message: 'Successfully Created Machine', status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const deleteMachine = async (req: Request, res: Response) => {
    const { machineID } = req.params;
    try {

        const findMachine = await prisma.machine.findFirst({
            where: {
                machineID
            }
        });

        if (!findMachine) {
            return res.status(404).json({ message: 'Machine not found: ' + machineID, status: 404 });
        }

        await prisma.machine.delete({
            where: {
                machineID: machineID
            }
        });

        return res.status(200).json({ 'message': 'Machine has been deleted', status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }


}

export const updateMachine = async (req: Request, res: Response) => {
    const { machineID } = req.params;
    try {
        const {
            machineName,
            machineDesc,
            machineOwnerID,
            machineImage,
            machinePICsID,
            machineStatus
        } = req.body;

        const status: boolean = machineStatus != machineStatus;

        const isExist = await machineClient.findFirst({ where: { machineID: machineID } });

        if (!isExist) {
            return res.status(404).json({ message: 'Machine not found', status: 404 });
        }

        await machineClient.update({
            where: {
                machineID
            },
            data: {
                machineStatus
            }
        });

        return res.status(200).json({ 'message': 'Updated', status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}
