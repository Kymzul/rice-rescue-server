import { Router } from "express";
import { deleteCrop, getCrops, postCrop } from "../controller/crop";

export const cropRoute: Router = Router();
cropRoute.get('/crop', getCrops);
cropRoute.post('/crop', postCrop);
cropRoute.delete('/crop/:cropID', deleteCrop);
export default cropRoute;