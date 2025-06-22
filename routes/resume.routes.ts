import { Router } from 'express';
import { getResume } from '../controller/resume.controller';

const router = Router();

router.post('/', getResume);

export default router; 