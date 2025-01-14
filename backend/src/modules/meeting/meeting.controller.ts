import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Meeting from './meeting.model';
import errors from '../../errors';

// Create a new meeting
export const createMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { title, startsAt, startTime, endsAt, endTime, users, clients } = req.body;

  if (!title || !startsAt || !startTime || !endsAt || !endTime) {
    throw new errors.BadRequestError('Please provide title, startsAt, startTime, endsAt, and endTime');
  }

  const meeting = await Meeting.create({
    title,
    startsAt,
    startTime,
    endsAt,
    endTime,
    users,
    clients,
    user: res.locals.user._id,
  });

  res.status(201).json(meeting);
});

// Get all meetings
export const getMeetings = asyncHandler(async (req: Request, res: Response) => {
  const meetings = await Meeting.find({
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });
  res.status(200).json(meetings);
});

// Get a single meeting by ID
export const getMeetingById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const meeting = await Meeting.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!meeting) {
    throw new errors.NotFoundError('Meeting not found');
  }

  res.status(200).json(meeting);
});

// Update a meeting by ID
export const updateMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, startsAt, startTime, endsAt, endTime, users, clients } = req.body;

  const meeting = await Meeting.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!meeting) {
    throw new errors.NotFoundError('Meeting not found');
  }

  meeting.title = title || meeting.title;
  meeting.startsAt = startsAt || meeting.startsAt;
  meeting.startTime = startTime || meeting.startTime;
  meeting.endsAt = endsAt || meeting.endsAt;
  meeting.endTime = endTime || meeting.endTime;
  meeting.users = users || meeting.users;
  meeting.clients = clients || meeting.clients;

  await meeting.save();

  res.status(200).json(meeting);
});

// Delete a meeting by ID
export const deleteMeeting = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const meeting = await Meeting.findOne({
    _id: id,
    $or: [
      { user: res.locals.user._id },
      { users: res.locals.user._id },
      { clients: res.locals.user._id }
    ]
  });

  if (!meeting) {
    throw new errors.NotFoundError('Meeting not found');
  }

  await meeting.deleteOne();

  res.status(200).json({ message: 'Meeting deleted successfully' });
});