
import { Request, Response } from "express";
import prisma from "../../prisma";
const addSnippet = async (req:Request, res:Response)=>{
    const formData = req.body;
    try {
        const result = await prisma.snippets.create({
            data:{
                name:formData.name,
                desc:formData.desc,
                git_path:formData.git_path,
                type:formData.type
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal server error');
    }
};
export default addSnippet;
