import { Router } from "express";
import { deleteForum, getForums, postForum } from "../controller/forum";


export const forumRoute: Router = Router();
forumRoute.get('/forum', getForums);
forumRoute.post('/forum', postForum);
forumRoute.delete('/forum/:forumID', deleteForum);
export default forumRoute;