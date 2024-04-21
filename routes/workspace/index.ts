import { Router } from "express";
import getWorkspaces from "./get-workspaces";
import createWorkSpace from "./create-workspace.route";
const workspaceRouter = Router();
workspaceRouter.get('/', getWorkspaces);
workspaceRouter.post('/create-workspace', createWorkSpace);
export default workspaceRouter;