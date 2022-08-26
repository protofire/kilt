import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const handleError = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      res.status(500).send({ msg: err.message });
    });
};

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized'
    })
  }
  
  jwt.verify(token, process.env.SECRET as string,
    (err: any, payload: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: 'Unauthorized'
        });
      }
      req.params.user = JSON.parse(payload.sub);
      next();
    })
}