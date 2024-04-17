import { Router } from "express";
import { deleteField, getFields, getSingleField, postField, updateField } from "../controller/field";

export const fieldRoute: Router = Router();
fieldRoute.get('/field', getFields);
fieldRoute.post('/field', postField);
fieldRoute.delete('/field/:fieldID', deleteField);
fieldRoute.get('/field/:fieldID', getSingleField);
fieldRoute.put('/field/:fieldID', updateField);




export default fieldRoute;