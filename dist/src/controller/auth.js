"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signin = exports.signup = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = __importDefault(require("../../prisma"));
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword, userName, userAge, userDesc, userType, userRole, userExp } = req.body;
    const userSocialMedia = [];
    const userAvatar = {
        avatarURL: 'https://media.timeout.com/images/105805277/750/422/image.jpg',
        avatarURLName: 'https://media.timeout.com/images/105805277/750/422/image.jpg'
    };
    try {
        const hashedPassword = (0, bcrypt_1.hashSync)(userPassword, 10);
        const isExist = yield prisma_1.default.user.findFirst({ where: { userEmail: userEmail } });
        if (isExist) {
            return res.status(403).json({ data: { message: 'Email already exist', status: 403 } });
        }
        else {
            const user = yield prisma_1.default.user.create({
                data: {
                    userEmail,
                    userPassword: hashedPassword,
                    userName,
                    userAge,
                    userDesc,
                    userType,
                    userSocialMedia,
                    userRole,
                    userAvatar,
                    userExp
                }
            });
            const token = jwt.sign({ userID: user.userID }, secret_1.JWT_SECRET);
            return res.status(201).json({ data: { message: 'Successfully Register', status: 201 }, token: token });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ data: { message: 'Internal Server Error: ' + e, status: 500 } });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword } = req.body;
    try {
        if (!userEmail || !userPassword) {
            return res.status(403).json({ message: 'Uncompleted Filled', status: 403 });
        }
        console.log(userEmail);
        const findUser = yield prisma_1.default.user.findUnique({ where: { userEmail: userEmail } });
        if (!findUser) {
            return res.status(404).json({ message: 'Email not found', status: 404 });
        }
        if (!(0, bcrypt_1.compareSync)(userPassword, findUser.userPassword)) {
            return res.status(401).json({ 'message': 'Password not matched', status: 401 });
        }
        const token = jwt.sign({ userID: findUser.userID }, secret_1.JWT_SECRET);
        return res.status(200).json({ message: 'Successfully Login', token: token });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e });
    }
});
exports.signin = signin;
