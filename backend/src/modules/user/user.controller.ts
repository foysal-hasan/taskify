import { Request, Response } from 'express';
import errors from '../../errors';
import asyncHandler from '../../middlewares/asyncHandler';
import User from './user.model';
import generateTokenAndSendResponse from '../../utils/generateTokenAndSendResponse';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    role,
    email,
    phoneNumber,
    address,
    city,
    state,
    country,
    zipCode,
    dateOfBirth,
    dateOfJoining,
    password,
    profilePicture,
    status,
  } = req.body;

  if (!firstName || !lastName || !role || !password) {
    throw new errors.BadRequestError('Please provide first name, last name, role, and password');
  }

  if (await User.findOne({ email })) {
    throw new errors.BadRequestError('Email already taken');
  }

  const user = await User.create({
    firstName,
    lastName,
    role,
    email,
    phoneNumber,
    address,
    city,
    state,
    country,
    zipCode,
    dateOfBirth,
    dateOfJoining,
    password,
    profilePicture,
    status,
  });

  generateTokenAndSendResponse(res, user);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new errors.BadRequestError('Provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new errors.BadRequestError('Invalid email or password');
  }

  generateTokenAndSendResponse(res, user);
});

export const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
