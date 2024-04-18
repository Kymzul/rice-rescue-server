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
exports.deleteForum = exports.postForum = exports.getForums = void 0;
const client_1 = require("@prisma/client");
const forumClient = new client_1.PrismaClient().forum;
const getForums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forums = yield forumClient.findMany({
            include: {
                forumBy: true
            }
        });
        return res.status(200).json({ message: forums, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getForums = getForums;
const postForum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { forumContent, forumByID, forumLocation } = req.body;
    try {
        yield forumClient.create({
            data: {
                forumContent,
                forumByID,
                forumLocation
            }
        });
        return res.status(201).json({ message: 'Successfully Posted', status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postForum = postForum;
const deleteForum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { forumID } = req.params;
    try {
        const findForum = yield forumClient.findUnique({
            where: {
                forumID
            }
        });
        if (!findForum) {
            return res.status(404).json({ message: 'Unable to delete', status: 404 });
        }
        yield forumClient.delete({
            where: {
                forumID
            }
        });
        return res.status(200).json({ message: 'Successfully Deleted', status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteForum = deleteForum;
