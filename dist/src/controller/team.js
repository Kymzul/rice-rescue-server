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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeam = exports.updateTeam = exports.postTeam = exports.getSingleTeam = exports.getTeams = void 0;
const client_1 = require("@prisma/client");
const teamPrisma = new client_1.PrismaClient().team;
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield teamPrisma.findMany({
            include: {
                teamBy: true
            }
        });
        return res.status(200).json({ message: teams, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getTeams = getTeams;
const getSingleTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamByID } = req.params;
    try {
        const findTeam = yield teamPrisma.findFirst({
            where: { teamByID }, include: {
                teamBy: true
            }
        });
        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find your team', status: 404 });
        }
        return res.status(200).json({ message: findTeam, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getSingleTeam = getSingleTeam;
const postTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamByID, teamMember, teamName } = req.body;
        yield teamPrisma.create({
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
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postTeam = postTeam;
const updateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamID } = req.params;
    const { teamMember } = req.body;
    try {
        const findTeam = yield teamPrisma.findUnique({
            where: {
                teamID
            }
        });
        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find your team', status: 404 });
        }
        yield teamPrisma.update({
            where: {
                teamID
            }, data: {
                teamMember,
                teamUpdatedAt: new Date()
            }
        });
        return res.status(201).json({ message: 'Successfully Updated', status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.updateTeam = updateTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamID } = req.params;
    try {
        const findTeam = yield teamPrisma.findUnique({ where: { teamID } });
        if (!findTeam) {
            return res.status(404).json({ message: 'Cannot find team', status: 404 });
        }
        yield teamPrisma.delete({
            where: {
                teamID
            }
        });
        return res.status(200).json({ message: 'Successfully Deleted Team', status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteTeam = deleteTeam;
