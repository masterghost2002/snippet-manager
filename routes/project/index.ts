import { Router } from "express";
import addProject from "./add-project";
const ProjectRouter = Router();
ProjectRouter.post('/add-project', addProject);
export default ProjectRouter;