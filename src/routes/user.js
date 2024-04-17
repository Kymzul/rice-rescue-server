"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_1 = require("../controller/user");
const auth_1 = __importDefault(require("../middleware/auth"));
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get('/user', user_1.getUsers);
exports.userRoute.get('/getMe', auth_1.default, user_1.getMe);
exports.userRoute.get('/user/:userID', auth_1.default, user_1.getSingleUser);
exports.userRoute.delete('/user/:userID', auth_1.default, user_1.deleteUser);
exports.default = exports.userRoute;
