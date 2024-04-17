import { Request, Response } from "express"
import prisma from "../../prisma";
import { TField, TLocation, TSoilTemperature } from "../types";
import { v4 as uuid } from 'uuid';
import { PrismaClient } from "@prisma/client";



export const getFields = async (req: Request, res: Response) => {
    try {
        const fields: TField[] = await prisma.field.findMany({
            include: {
                fieldOwner: true,
            }
        });
        return res.status(200).json({ message: fields, status: 200 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
}

export const getSingleField = async (req: Request, res: Response) => {
    const { fieldID } = req.params;
    try {
        const findField = await prisma.field.findUnique({
            where: {
                fieldID
            }
        })

        if (!findField) {
            return res.status(404).json({ message: 'Field not found', status: 404 });
        }
        return res.status(200).json({ message: findField, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
}


export const postField = async (req: Request, res: Response) => {

    try {
        const { fieldName, fieldCA, fieldOwnerID, fieldPCT, fieldSeedDate, fieldLocation } = req.body;

        const fieldExist = await prisma.field.findFirst({
            where: {
                fieldName
            }
        });

        if (!fieldName || !fieldCA || !fieldOwnerID || !fieldSeedDate) {
            return res.status(400).json({ message: 'Missing required fields', status: 400 });
        }

        if (fieldExist) {
            return res.status(400).json({ message: 'Field Name Already Existed', status: 400 });
        }
        await prisma.field.create({
            data: {
                fieldName,
                fieldCA,
                fieldPCT,
                fieldSeedDate,
                fieldLocation,
                fieldOwner: {
                    connect: {
                        userID: fieldOwnerID
                    }
                },
                fieldST: {
                    stLocation: fieldLocation
                },
                fieldSM: {
                    smLocation: fieldLocation
                }


            }
        });

        return res.status(201).json({ message: 'Successfully Created Field', status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
}

export const deleteField = async (req: Request, res: Response) => {
    const { fieldID } = req.params;
    try {
        const isExist = await prisma.field.findFirst({
            where: {
                fieldID: fieldID
            }
        });

        if (!isExist) {
            return res.status(404).json({ message: "Field Not Exist: " + fieldID, status: 404 });
        }

        await prisma.field.delete({
            where: {
                fieldID
            },

        });

        return res.status(200).json({ message: "Successfully Deleted Field: " + fieldID, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const updateField = async (req: Request, res: Response) => {
    const { fieldID } = req.params;
    try {
        const { fieldST } = req.body;

        const soilTemp = fieldST as TSoilTemperature;

        const isExist = await prisma.field.findUnique({
            where: {
                fieldID: fieldID
            }
        });

        if (!isExist) {
            return res.status(404).json({ message: "Field Not Exist: " + fieldID, status: 404 });
        }

        const newField = await prisma.field.update({
            where: {
                fieldID
            },
            data: {
                fieldST
            }
        })

        return res.status(200).json({
            message: newField
            , status: 200
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}








