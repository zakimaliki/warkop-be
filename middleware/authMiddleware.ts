import { Request, Response, NextFunction } from 'express';
// import { auth } from '../config/firebaseConfig';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    // TODO: Implement token verification using your preferred auth provider
    // Sementara, lanjutkan saja tanpa verifikasi
    // req.user = { uid: 'dummy', email: 'dummy@example.com' };
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};