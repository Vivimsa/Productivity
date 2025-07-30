import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AppDataSource } from '../config/database';
import { AppError } from '../middleware/errorHandler';

const userRepo = AppDataSource.getRepository(User)

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findOne({ where: { email } });
        if (!user) throw new AppError('Invalid credentials', 401);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new AppError('Invalid credentials', 401);

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.json({ status: 'success', data: { token } });
    } catch (err) {
        next(err);
    }
}
