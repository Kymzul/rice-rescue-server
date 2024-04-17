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
exports.deleteUser = exports.getSingleUser = exports.getUsers = exports.getMe = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationReq = req;
    const authenticatedUserID = validationReq.user.userID;
    try {
        const findUser = yield prisma_1.default.user.findFirst({ where: { userID: authenticatedUserID } });
        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        return res.status(200).json(findUser);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
});
exports.getMe = getMe;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUsers = yield prisma_1.default.user.findMany();
        return res.status(200).json({ 'message': findUsers });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
});
exports.getUsers = getUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const validationReq = req;
    const authenticatedUserID = validationReq.user.userID;
    try {
        if (authenticatedUserID !== userID) {
            return res.status(403).json({ 'message': 'You are not authorized yet' });
        }
        const findUser = yield prisma_1.default.user.findFirst({ where: { userID: userID } });
        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        return res.status(200).json({ message: findUser });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
});
exports.getSingleUser = getSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const validationReq = req;
    const authenticatedUserID = validationReq.user.userID;
    try {
        if (authenticatedUserID !== userID) {
            return res.status(403).json({ 'message': 'You are not authorized yet' });
        }
        const findUser = yield prisma_1.default.user.findFirst({ where: { userID: userID } });
        if (!findUser) {
            return res.status(404).json({ 'message': 'User not found' });
        }
        yield prisma_1.default.user.deleteMany({
            where: {
                userID: userID
            }
        });
        return res.status(200).json({ 'message': 'User has been deleted: ' + userID });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
});
exports.deleteUser = deleteUser;
