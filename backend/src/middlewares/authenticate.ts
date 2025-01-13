import jwt from 'jsonwebtoken';
import e, { Request, Response, NextFunction } from 'express';
import asyncHandler from './asyncHandler';
import User from '../modules/user/user.model';
import errors from '../errors/index';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authenticate = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token =
    req.cookies?.jwt ||
    req.body.token ||
    req.headers?.authorization?.split(' ')[1];

  if (!token) {
    throw new errors.UnauthenticatedError('Authentication invalid');
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new errors.UnauthenticatedError('Authentication invalid');
    }
    // req.user = {
    //   id: user._id,
    //   userId: user._id,
    //   email: user.email,
    // };
    req.user = user;
    next();
  } catch (err) {
    throw new errors.UnauthenticatedError('Authentication invalid');
  }
});

export default authenticate;