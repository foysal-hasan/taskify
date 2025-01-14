import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Tag from './tag.model';
import errors from '../../errors';

// Create a new tag
export const createTag = asyncHandler(async (req: Request, res: Response) => {
  const { title, color } = req.body;

  if (!title || !color) {
    throw new errors.BadRequestError('Please provide title and color');
  }

  const tag = await Tag.create({ title, color, user: res.locals.user._id });
  res.status(201).json(tag);
});

// Get all tags
export const getTags = asyncHandler(async (req: Request, res: Response) => {
  const tags = await Tag.find({ user: res.locals.user._id });
  res.status(200).json(tags);
});

// Get a single tag by ID
export const getTagById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const tag = await Tag.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!tag) {
    throw new errors.NotFoundError('Tag not found');
  }

  res.status(200).json(tag);
});

// Update a tag by ID
export const updateTag = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color } = req.body;

  const tag = await Tag.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!tag) {
    throw new errors.NotFoundError('Tag not found');
  }

  tag.title = title || tag.title;
  tag.color = color || tag.color;

  await tag.save();

  res.status(200).json(tag);
});

// Delete a tag by ID
export const deleteTag = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const tag = await Tag.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!tag) {
    throw new errors.NotFoundError('Tag not found');
  }

  await tag.deleteOne();

  res.status(200).json({ message: 'Tag deleted successfully' });
});