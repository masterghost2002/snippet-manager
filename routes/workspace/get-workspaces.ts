import prisma from "../../prisma";
import { Request, Response } from "express";
const getWorkspaces = async (_:Request, res:Response)=>{
    try {
        const result = await prisma.workspace.findMany({
            include:{
                projects:true
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json('Server Error');
    }
}
export default getWorkspaces;