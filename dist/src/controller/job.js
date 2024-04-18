"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateJob = exports.deleteJob = exports.postJob = exports.getSingleJob = exports.getJobs = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
const jobClient = new client_1.PrismaClient().job;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield prisma_1.default.job.findMany({
            include: {
                jobOwner: true,
                jobField: true
            }
        });
        return res.status(200).json({ message: jobs, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getJobs = getJobs;
const getSingleJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jobID } = req.params;
    try {
        const job = yield jobClient.findUnique({
            where: {
                jobID
            },
            include: {
                jobOwner: true,
                jobField: true
            }
        });
        if (!job) {
            return res.status(404).json({ message: 'Job Not Found', status: 404 });
        }
        return res.status(200).json({ message: job, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getSingleJob = getSingleJob;
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobName, jobType, jobDesc, jobOwnerID, jobPriority, jobFieldID, jobDate, jobMembers, jobMachinesID } = req.body;
        const job = yield prisma_1.default.job.create({
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
        });
        return res.status(201).json({ message: 'Successfully Created Task', status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postJob = postJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobID } = req.params;
        const findJob = yield prisma_1.default.job.findFirst({
            where: {
                jobID
            }
        });
        if (!findJob) {
            return res.status(404).json({
                message: "Job not found: " + jobID,
                status: 404
            });
        }
        yield prisma_1.default.job.deleteMany({
            where: {
                jobID: jobID
            }
        });
        return res.status(200).json({ message: "Job Deleted: " + jobID, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteJob = deleteJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobID } = req.params;
        const { jobName, jobType, jobDesc, jobOwnerID, jobPriority, jobMachinesID, jobMembers } = req.body;
        const findJob = yield prisma_1.default.job.findFirst({
            where: {
                jobID
            }
        });
        if (!findJob) {
            return res.status(404).json({
                message: "Job not found: " + jobID,
                status: 404
            });
        }
        const newJob = yield prisma_1.default.job.update({
            where: {
                jobID
            },
            data: {
                jobMachinesID,
                jobMembers
            }
        });
        return res.status(201).json({ message: newJob, status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.updateJob = updateJob;
