import { Router } from "express";
import { deleteJob, getJobs, getSingleJob, postJob, updateJob } from "../controller/job";
import { getSingleField } from "../controller/field";


export const jobRoute: Router = Router();
jobRoute.get('/job', getJobs);
jobRoute.get('/job/:jobID', getSingleJob);
jobRoute.post('/job', postJob);
jobRoute.delete('/job/:jobID', deleteJob);
jobRoute.put('/job/:jobID', updateJob);

export default jobRoute;