"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_1 = require("../controller/auth");
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post('/signup', auth_1.signup);
exports.authRoute.post('/signin', auth_1.signin);
exports.default = exports.authRoute;
