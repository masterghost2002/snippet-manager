import addSnippet from "./add-snippet.route";
import getSnippets from "./get-snippets.route";
import { Router } from "express";
const SnippetRouter = Router();
SnippetRouter.post('/add-snippet', addSnippet);
SnippetRouter.get('/', getSnippets)
export default SnippetRouter;