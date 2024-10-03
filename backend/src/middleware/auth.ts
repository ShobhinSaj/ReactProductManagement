import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret');
      (req as any).user = decoded;
      next();
    } catch (err) {
      res.status(401).send('Invalid token');
    }
  } else {
    res.status(401).send('No token provided');
  }
};
export default authMiddleware;