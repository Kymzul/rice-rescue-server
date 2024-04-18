"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
exports.PORT = process.env.PORT;
//export const JWT_SECRET = process.env.JWT_SECRET!
exports.JWT_SECRET = 'HAFJKHFSKDFKHSDMFKSHFQJHKWADSJASKDJHASKHDAKSHD';
