import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Workspace from './workspace.model';
import errors from '../../errors';

// Create a new workspace
export const createWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const { title, users, clients } = req.body;

  if (!title) {
    throw new errors.BadRequestError('Please provide title');
  }

  const workspace = await Workspace.create({
    title,
    users,
    clients,
    user: res.locals.user._id,
  });

  res.status(201).json(workspace);
});

// Get all workspaces
export const getWorkspaces = asyncHandler(async (req: Request, res: Response) => {
  const workspaces = await Workspace.find({
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });
  res.status(200).json(workspaces);
});

// Get a single workspace by ID
export const getWorkspaceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const workspace = await Workspace.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!workspace) {
    throw new errors.NotFoundError('Workspace not found');
  }

  res.status(200).json(workspace);
});

// Update a workspace by ID
export const updateWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, users, clients } = req.body;

  const workspace = await Workspace.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!workspace) {
    throw new errors.NotFoundError('Workspace not found');
  }

  workspace.title = title || workspace.title;
  workspace.users = users || workspace.users;
  workspace.clients = clients || workspace.clients;

  await workspace.save();

  res.status(200).json(workspace);
});

// Delete a workspace by ID
export const deleteWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const workspace = await Workspace.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!workspace) {
    throw new errors.NotFoundError('Workspace not found');
  }

  await workspace.deleteOne();

  res.status(200).json({ message: 'Workspace deleted successfully' });
});