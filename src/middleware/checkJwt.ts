import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

declare module 'express' {
    interface Request {
        userId?: number;
    }
}
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError('Token missing', 401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        req.userId = payload.userId;
        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}
