import prisma from "../../prisma";
import { Request, Response } from "express";
const createWorkSpace = async (req:Request, res:Response)=>{
    const data = req.body;
    try {
        const result = await prisma.workspace.create({
            data:{
                name:data.name
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json('Server Error');
    }
}
export default createWorkSpace;