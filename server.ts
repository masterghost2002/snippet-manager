import dotenv from 'dotenv';
dotenv.config();
import express, {Request, Response} from 'express';
import cors from 'cors';
import SnippetRouter from './routes/snippets';
import workspaceRouter from './routes/workspace';
import ProjectRouter from './routes/project';
const PORT = process.env.PORT || 5000;
const server = express();
server.use(cors());
server.use(express.json());
server.use('/api/snippets', SnippetRouter);
server.use('/api/workspace', workspaceRouter);
server.use('/api/projects', ProjectRouter);
server.get('/', (_:Request, res:Response)=>res.status(200).json('Hello world'))
server.listen(PORT, ()=>console.log('Listening  to port ', PORT));
