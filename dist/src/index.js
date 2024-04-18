"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const secret_1 = require("./secret");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        'message': 'Success Connect',
        'data': 'Hello World'
    });
});
app.listen(secret_1.PORT, () => {
    console.log('Server run on port: ' + secret_1.PORT);
});
