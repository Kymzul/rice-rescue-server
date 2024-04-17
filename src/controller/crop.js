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
exports.deleteCrop = exports.postCrop = exports.getCrops = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getCrops = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crops = yield prisma_1.default.crop.findMany({
            include: {
                cropOwner: true
            }
        });
        return res.status(200).json({ message: crops, status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.getCrops = getCrops;
const postCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cropCA, cropDisease, cropNutrient, cropPrecaution, cropOwnerID, cropImage } = req.body;
        const crop = yield prisma_1.default.crop.create({
            data: {
                cropImage,
                cropCA,
                cropDisease,
                cropNutrient,
                cropPrecaution,
                cropOwner: {
                    connect: {
                        userID: cropOwnerID
                    }
                },
            }
        });
        return res.status(201).json({ message: 'Successfully Upload Crop', status: 201 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.postCrop = postCrop;
const deleteCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cropID } = req.params;
        const findCrop = yield prisma_1.default.crop.findFirst({
            where: {
                cropID
            }
        });
        if (!findCrop) {
            return res.status(404).json({
                message: "Crop not found", status: 404
            });
        }
        yield prisma_1.default.crop.deleteMany({
            where: {
                cropID: cropID
            }
        });
        return res.status(200).json({ message: "Crop Deleted", status: 200 });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal Server Error: ' + e, status: 500 });
    }
});
exports.deleteCrop = deleteCrop;
