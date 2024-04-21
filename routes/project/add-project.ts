import { Request, Response } from "express";
import prisma from "../../prisma";
import simpleGit from "simple-git";
import path from "path";
function generateRandomChars(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars[randomIndex];
    }
    return randomString;
}
const handleSetupProjectFromGit = async (gitPath:string, folderPath:string)=>{
    const git = simpleGit();
    try {
        await git.clone(gitPath, folderPath, ['--depth=1', '--single-branch']);
    } catch (error) {
        console.log(error);
    }
};
const addProject = async (req:Request, res:Response)=>{
    const {workspaceId, snippetId, name} = req.body;
    try {
        const snippet = await prisma.snippets.findUnique({
            where:{
                id:snippetId
            }
        });
        if(!snippet) return res.status(404).json('Requested snippet not found');
        const folderNameWithRandomNess= name.replace(/\s/g, '').toLowerCase() + '_' + generateRandomChars(); 
        const folderPath = path.join('/media/rakeshssd/codespace/snippet-creator/' + '/test-temp' + '/'+ folderNameWithRandomNess);
        if(!snippet.git_path) return res.status(200).json('File not found');
        await handleSetupProjectFromGit(snippet.git_path, folderPath);
        const result = await prisma.projects.create({
            data:{
                name,
                path:folderPath,
                workspace:{connect:{id:workspaceId}},
                snippet_id:snippetId
            }
        })
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json('Internal server error');
    }
};
export default addProject;