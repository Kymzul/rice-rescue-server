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
exports.updateMachine = exports.deleteMachine = exports.postMachine = exports.getMachines = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
const machineClient = new client_1.PrismaClient().machine;
const getMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machines = yield prisma_1.default.machine.findMany({
            include: {
                machineOwner: true
            }
        });
        return res.status(200).json({ message: machines, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getMachines = getMachines;
const postMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { machineName, machineDesc, machineOwnerID, machineImage, machinePICsID, machineStatus } = req.body;
        if (!machineName || !machineDesc || !machineOwnerID || !machineImage || !machinePICsID || !machineStatus) {
            return res.status(400).json({ message: 'Missing required fields', status: 400 });
        }
        yield prisma_1.default.machine.create({
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
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postMachine = postMachine;
const deleteMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { machineID } = req.params;
    try {
        const findMachine = yield prisma_1.default.machine.findFirst({
            where: {
                machineID
            }
        });
        if (!findMachine) {
            return res.status(404).json({ message: 'Machine not found: ' + machineID, status: 404 });
        }
        yield prisma_1.default.machine.delete({
            where: {
                machineID: machineID
            }
        });
        return res.status(200).json({ 'message': 'Machine has been deleted', status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteMachine = deleteMachine;
const updateMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { machineID } = req.params;
    try {
        const { machineName, machineDesc, machineOwnerID, machineImage, machinePICsID, machineStatus } = req.body;
        const status = machineStatus != machineStatus;
        const isExist = yield machineClient.findFirst({ where: { machineID: machineID } });
        if (!isExist) {
            return res.status(404).json({ message: 'Machine not found', status: 404 });
        }
        yield machineClient.update({
            where: {
                machineID
            },
            data: {
                machineStatus
            }
        });
        return res.status(200).json({ 'message': 'Updated', status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.updateMachine = updateMachine;
