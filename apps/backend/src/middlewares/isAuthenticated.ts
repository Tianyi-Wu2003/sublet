import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    const error = new Error('Unauthorized');
    next(error);
  }
};

export default isAuthenticated;
