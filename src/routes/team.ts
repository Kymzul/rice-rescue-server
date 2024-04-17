import { Router } from "express";
import { deleteTeam, getSingleTeam, getTeams, postTeam, updateTeam } from "../controller/team";



export const teamRoute: Router = Router();
teamRoute.get('/team', getTeams);
teamRoute.post('/team', postTeam);
teamRoute.delete('/team/:teamID', deleteTeam);
teamRoute.get('/team/:teamByID', getSingleTeam);
teamRoute.put('/team/:teamID', updateTeam);

export default teamRoute;