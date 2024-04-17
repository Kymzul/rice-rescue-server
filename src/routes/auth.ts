import { Router } from "express";
import { signin, signup } from "../controller/auth";

export const authRoute: Router = Router();
authRoute.post('/signup', signup);
authRoute.post('/signin', signin);
export default authRoute;