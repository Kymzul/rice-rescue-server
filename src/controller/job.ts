import { Request, Response } from "express"
import { TJob } from "../types";
import prisma from "../../prisma";
import { PrismaClient } from "@prisma/client";


const jobClient = new PrismaClient().job;

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs: TJob[] = await prisma.job.findMany({
            include: {
                jobOwner: true,
                jobField: true

            }
        });

        return res.status(200).json({ message: jobs, status: 200 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const getSingleJob = async (req: Request, res: Response) => {
    const { jobID } = req.params;
    try {
        const job = await jobClient.findUnique({
            where: {
                jobID
            }
            , include: {
                jobOwner: true,
                jobField: true
            }
        });

        if (!job) {
            return res.status(404).json({ message: 'Job Not Found', status: 404 });
        }
        return res.status(200).json({ message: job, status: 200 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const postJob = async (req: Request, res: Response) => {
    try {
        const { jobName, jobType, jobDesc, jobOwnerID, jobPriority, jobFieldID, jobDate, jobMembers, jobMachinesID } = req.body;

        const job = await prisma.job.create({
            data: {
                jobName,
                jobType,
                jobDesc,
                jobOwner: {
                    connect: {
                        userID: jobOwnerID
                    }
                },
                jobMembers,
                jobMachinesID,
                jobPriority,
                jobDate,
                jobField: {
                    connect: {
                        fieldID: jobFieldID
                    }
                }
            }
        })
        return res.status(201).json({ message: 'Successfully Created Task', status: 201 });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { jobID } = req.params;

        const findJob = await prisma.job.findFirst({
            where: {
                jobID
            }
        });

        if (!findJob) {
            return res.status(404).json({
                message: "Job not found: " + jobID,
                status: 404
            })
        }

        await prisma.job.deleteMany({
            where: {
                jobID: jobID
            }
        });

        return res.status(200).json({ message: "Job Deleted: " + jobID, status: 200 })

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


export const updateJob = async (req: Request, res: Response) => {
    try {
        const { jobID } = req.params;

        const { jobName, jobType, jobDesc, jobOwnerID, jobPriority, jobMachinesID, jobMembers } = req.body;

        const findJob = await prisma.job.findFirst({
            where: {
                jobID
            }
        });

        if (!findJob) {
            return res.status(404).json({
                message: "Job not found: " + jobID,
                status: 404
            })
        }

        const newJob = await prisma.job.update({
            where: {
                jobID
            },
            data: {
                jobMachinesID,
                jobMembers
            }
        })

        return res.status(201).json({ message: newJob, status: 201 });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
}


