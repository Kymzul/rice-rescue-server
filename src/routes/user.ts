import { Router } from "express";
import { deleteUser, getMe, getSingleUser, getUsers } from "../controller/user";
import authMiddleware from "../middleware/auth";

export const userRoute: Router = Router();
userRoute.get('/user', getUsers);
userRoute.get('/getMe', authMiddleware, getMe);
userRoute.get('/user/:userID', authMiddleware, getSingleUser);
userRoute.delete('/user/:userID', authMiddleware, deleteUser);
export default userRoute;