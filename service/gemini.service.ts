import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });

export const generateResumeSummary = async (prompt: string): Promise<string> => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

export const generateJobDescription = async (title: string): Promise<string> => {
    const prompt = `Buatkan deskripsi pekerjaan yang menarik, persuasif, dan terasa seperti ditulis oleh manusia untuk posisi ${title} di perusahaan teknologi modern.\nGunakan bahasa yang hangat, profesional, dan menginspirasi.\nHindari format template atau placeholder seperti [Nama Perusahaan], [email address], [Tanggal Deadline], dll.\nFokus pada keunikan, peluang berkembang, dan suasana kerja yang positif.\nTulis dalam 2-3 paragraf naratif, tanpa bagian 'Kualifikasi' atau 'Penawaran'.\nGunakan bahasa Indonesia yang natural dan mudah dipahami.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}; 