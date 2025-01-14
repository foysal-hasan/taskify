import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Priority from './priority.model';
import errors from '../../errors';

// Create a new priority
export const createPriority = asyncHandler(async (req: Request, res: Response) => {
  const { title, color } = req.body;

  if (!title || !color) {
    throw new errors.BadRequestError('Please provide title and color');
  }

  const priority = await Priority.create({ title, color, user: res.locals.user._id });
  res.status(201).json(priority);
});

// Get all priorities
export const getPriorities = asyncHandler(async (req: Request, res: Response) => {
  const priorities = await Priority.find({ user: res.locals.user._id });
  res.status(200).json(priorities);
});

// Get a single priority by ID
export const getPriorityById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const priority = await Priority.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!priority) {
    throw new errors.NotFoundError('Priority not found');
  }

  res.status(200).json(priority);
});

// Update a priority by ID
export const updatePriority = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color } = req.body;

  const priority = await Priority.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!priority) {
    throw new errors.NotFoundError('Priority not found');
  }

  priority.title = title || priority.title;
  priority.color = color || priority.color;

  await priority.save();

  res.status(200).json(priority);
});

// Delete a priority by ID
export const deletePriority = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const priority = await Priority.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!priority) {
    throw new errors.NotFoundError('Priority not found');
  }

  await priority.deleteOne();

  res.status(200).json({ message: 'Priority deleted successfully' });
});