import prisma from "../../prisma";
import { Request, Response } from "express";
const getSnippets = async (_: Request, res: Response) => {
    try {
        const result = await prisma.snippets.findMany();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json('Server Error');
    }
}
export default getSnippets;