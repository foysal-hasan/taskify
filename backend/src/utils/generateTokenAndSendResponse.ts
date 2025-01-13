import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from '../modules/user/user.model';

const generateTokenAndSendResponse = (res: Response, user: IUser) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });

  // set JWT as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(200).json({
    user,
    token,
  });
};

export default generateTokenAndSendResponse;