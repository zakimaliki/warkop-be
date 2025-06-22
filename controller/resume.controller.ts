import { Request, Response } from 'express';
import { getResumeData } from '../repository/resume.repository';

export const getResume = async (req: Request, res: Response) => {
    try {
        const { resumeText } = req.body;
        if (!resumeText) {
            return res.status(400).json({ error: 'resumeText is required in request body' });
        }
        const resumeData = await getResumeData(resumeText);
        res.json(resumeData);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}; 