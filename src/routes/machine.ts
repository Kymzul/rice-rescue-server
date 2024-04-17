import { Router } from "express";
import { signin, signup } from "../controller/auth";
import { deleteMachine, getMachines, postMachine, updateMachine } from "../controller/machine";
import { get } from "http";

export const machineRoute: Router = Router();
machineRoute.get('/machine', getMachines);
machineRoute.post('/machine', postMachine);
machineRoute.delete('/machine/:machineID', deleteMachine);
machineRoute.put('/machine/:machineID', updateMachine);
export default machineRoute;