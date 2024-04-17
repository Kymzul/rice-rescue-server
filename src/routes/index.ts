import { Router } from "express";
import authRoute from "./auth";
import userRoute from "./user";
import machineRoute from "./machine";
import jobRoute from "./job";
import cropRoute from "./crop";
import fieldRoute from "./field";
import forumRoute from "./forum";
import teamRoute from "./team";

const rootRoute: Router = Router();
rootRoute.use('/auth', authRoute);
rootRoute.use(userRoute);
rootRoute.use(machineRoute);
rootRoute.use(jobRoute);
rootRoute.use(cropRoute);
rootRoute.use(fieldRoute);
rootRoute.use(forumRoute);
rootRoute.use(teamRoute);

export default rootRoute;