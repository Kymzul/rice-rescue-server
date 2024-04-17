import { Request, Response } from "express"
import { TAvatar, TCrop } from "../types";
import prisma from "../../prisma";



export const getCrops = async (req: Request, res: Response) => {
    try {

        const crops: TCrop[] = await prisma.crop.findMany({
            include: {
                cropOwner: true
            }
        });

        return res.status(200).json({ message: crops, status: 200 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const postCrop = async (req: Request, res: Response) => {



    try {
        const { cropCA, cropDisease, cropNutrient, cropPrecaution, cropOwnerID, cropImage } = req.body;

        const crop = await prisma.crop.create(
            {
                data: {
                    cropImage,
                    cropCA,
                    cropDisease,
                    cropNutrient,
                    cropPrecaution,
                    cropOwner: {
                        connect: {
                            userID: cropOwnerID
                        }
                    },

                }
            }
        );

        return res.status(201).json({ message: 'Successfully Upload Crop', status: 201 });


    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const deleteCrop = async (req: Request, res: Response) => {
    try {
        const { cropID } = req.params;

        const findCrop = await prisma.crop.findFirst({
            where: {
                cropID
            }
        });

        if (!findCrop) {
            return res.status(404).json({
                message: "Crop not found", status: 404
            })
        }

        await prisma.crop.deleteMany({
            where: {
                cropID: cropID
            }
        });

        return res.status(200).json({ message: "Crop Deleted", status: 200 })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


