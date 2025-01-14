import { Request, Response } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';
import Todo from './todo.model';
import errors from './../../errors/index';

// Create a new todo
export const createTodo = asyncHandler(async (req: Request, res: Response) => {
  const { title, priority, description } = req.body;

  if (!title) {
    throw new errors.BadRequestError('Please provide title');
  }

  const todo = await Todo.create({ title, priority, description, user: res.locals.user._id });
  res.status(201).json(todo);
});

// Get all todos
export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos = await Todo.find({ user: res.locals.user._id });
  res.status(200).json(todos);
});

// Get a single todo by ID
export const getTodoById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!todo) {
    throw new errors.NotFoundError('Todo not found');
  }

  res.status(200).json(todo);
});

// Update a todo by ID
export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, priority, completed, description } = req.body;

  const todo = await Todo.findOne({
    _id: id,
    user: res.locals.user._id,
  });

  if (!todo) {
    throw new errors.NotFoundError('Todo not found');
  }

  todo.title = title || todo.title;
  todo.priority = priority || todo.priority;
  todo.completed = completed !== undefined ? completed : todo.completed;
  todo.description = description || todo.description;

  await todo.save();

  res.status(200).json(todo);
});

// Delete a todo by ID
export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findOne({
    _id: id,
    user: res.locals.user._id,
  });
  
  if (!todo) {
    throw new errors.NotFoundError('Todo not found');
  }

  await todo.deleteOne();

  res.status(200).json({ message: 'Todo deleted successfully' });
}); 