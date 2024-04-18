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
exports.updateField = exports.deleteField = exports.postField = exports.getSingleField = exports.getFields = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = yield prisma_1.default.field.findMany({
            include: {
                fieldOwner: true,
            }
        });
        return res.status(200).json({ message: fields, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getFields = getFields;
const getSingleField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fieldID } = req.params;
    try {
        const findField = yield prisma_1.default.field.findUnique({
            where: {
                fieldID
            }
        });
        if (!findField) {
            return res.status(404).json({ message: 'Field not found', status: 404 });
        }
        return res.status(200).json({ message: findField, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getSingleField = getSingleField;
const postField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldName, fieldCA, fieldOwnerID, fieldPCT, fieldSeedDate, fieldLocation } = req.body;
        const fieldExist = yield prisma_1.default.field.findFirst({
            where: {
                fieldName
            }
        });
        if (!fieldName || !fieldCA || !fieldOwnerID || !fieldSeedDate) {
            return res.status(400).json({ message: 'Missing required fields', status: 400 });
        }
        if (fieldExist) {
            return res.status(400).json({ message: 'Field Name Already Existed', status: 400 });
        }
        yield prisma_1.default.field.create({
            data: {
                fieldName,
                fieldCA,
                fieldPCT,
                fieldSeedDate,
                fieldLocation,
                fieldOwner: {
                    connect: {
                        userID: fieldOwnerID
                    }
                },
                fieldST: {
                    stLocation: fieldLocation
                },
                fieldSM: {
                    smLocation: fieldLocation
                }
            }
        });
        return res.status(201).json({ message: 'Successfully Created Field', status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ 'message': 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postField = postField;
const deleteField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fieldID } = req.params;
    try {
        const isExist = yield prisma_1.default.field.findFirst({
            where: {
                fieldID: fieldID
            }
        });
        if (!isExist) {
            return res.status(404).json({ message: "Field Not Exist: " + fieldID, status: 404 });
        }
        yield prisma_1.default.field.delete({
            where: {
                fieldID
            },
        });
        return res.status(200).json({ message: "Successfully Deleted Field: " + fieldID, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteField = deleteField;
const updateField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fieldID } = req.params;
    try {
        const { fieldST } = req.body;
        const soilTemp = fieldST;
        const isExist = yield prisma_1.default.field.findUnique({
            where: {
                fieldID: fieldID
            }
        });
        if (!isExist) {
            return res.status(404).json({ message: "Field Not Exist: " + fieldID, status: 404 });
        }
        const newField = yield prisma_1.default.field.update({
            where: {
                fieldID
            },
            data: {
                fieldST
            }
        });
        return res.status(200).json({
            message: newField,
            status: 200
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.updateField = updateField;
