import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Project from './project.model';
import errors from '../../errors';
import Status from '../status/status.model';
import Priority from '../priority/priority.model';
import Tag from '../tag/tag.model';

// Create a new project
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const { title, status, priority, budget, startsAt, endsAt, taskAccessibility, users, clients, tags, description, note, clientCanDiscuss } = req.body;

  if (!title || !status) {
    throw new errors.BadRequestError('Please provide title and status');
  }

  if (!await Status.findById(status)) {
    throw new errors.BadRequestError('Invalid status');
  }

  if (priority && !await Priority.findById(priority)) {
    throw new errors.BadRequestError('Invalid priority');
  }

  if (tags && tags.length > 0) {
    for (const tag of tags) {
      if (!await Tag.findById(tag)) {
        throw new errors.BadRequestError('Invalid tag list');
      }
    }
  }

  const project = await Project.create({
    title,
    status,
    priority,
    budget,
    startsAt,
    endsAt,
    taskAccessibility,
    users,
    clients,
    tags,
    description,
    note,
    clientCanDiscuss,
    user: res.locals.user._id,
  });

  res.status(201).json(project);
});

// Get all projects
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find({
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });
  res.status(200).json(projects);
});

// Get a single project by ID
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await Project.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!project) {
    throw new errors.NotFoundError('Project not found');
  }

  res.status(200).json(project);
});

// Update a project by ID
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, status, priority, budget, startsAt, endsAt, taskAccessibility, users, clients, tags, description, note, clientCanDiscuss } = req.body;

  const project = await Project.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!project) {
    throw new errors.NotFoundError('Project not found');
  }

  if (status && !await Status.findById(status)) {
    throw new errors.BadRequestError('Invalid status');
  }

  if (priority && !await Priority.findById(priority)) {
    throw new errors.BadRequestError('Invalid priority');
  }

  if (tags && tags.length > 0) {
    for (const tag of tags) {
      if (!await Tag.findById(tag)) {
        throw new errors.BadRequestError('Invalid tag list');
      }
    }
  }

  project.title = title || project.title;
  project.status = status || project.status;
  project.priority = priority || project.priority;
  project.budget = budget || project.budget;
  project.startsAt = startsAt || project.startsAt;
  project.endsAt = endsAt || project.endsAt;
  project.taskAccessibility = taskAccessibility || project.taskAccessibility;
  project.users = users || project.users;
  project.clients = clients || project.clients;
  project.tags = tags || project.tags;
  project.description = description || project.description;
  project.note = note || project.note;
  project.clientCanDiscuss = clientCanDiscuss !== undefined ? clientCanDiscuss : project.clientCanDiscuss;

  await project.save();

  res.status(200).json(project);
});

// Delete a project by ID
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await Project.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!project) {
    throw new errors.NotFoundError('Project not found');
  }

  await project.deleteOne();

  res.status(200).json({ message: 'Project deleted successfully' });
});