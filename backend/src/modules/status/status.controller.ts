import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Status from './status.model';
import errors from '../../errors';

// Create a new status
export const createStatus = asyncHandler(async (req: Request, res: Response) => {
  const { title, color, whoCanChange } = req.body;

  if (!title || !color) {
    throw new errors.BadRequestError('Please provide title and color');
  }

  const status = await Status.create({ title, color, whoCanChange, user: res.locals.user._id });
  res.status(201).json(status);
});

// Get all statuses
export const getStatuses = asyncHandler(async (req: Request, res: Response) => {
  const statuses = await Status.find({ user: res.locals.user._id });
  res.status(200).json(statuses);
});

// Get a single status by ID
export const getStatusById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const status = await Status.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!status) {
    throw new errors.NotFoundError('Status not found');
  }

  res.status(200).json(status);
});

// Update a status by ID
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, whoCanChange } = req.body;

  const status = await Status.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!status) {
    throw new errors.NotFoundError('Status not found');
  }

  status.title = title || status.title;
  status.color = color || status.color;
  status.whoCanChange = whoCanChange || status.whoCanChange;

  await status.save();

  res.status(200).json(status);
});

// Delete a status by ID
export const deleteStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const status = await Status.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!status) {
    throw new errors.NotFoundError('Status not found');
  }

  await status.deleteOne();

  res.status(200).json({ message: 'Status deleted successfully' });
});