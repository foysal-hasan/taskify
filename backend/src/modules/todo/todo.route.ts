import express from 'express';
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from './todo.controller';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.route('/')
  .post(authenticate, createTodo)
  .get(authenticate, getTodos);

router.route('/:id')
  .get(authenticate, getTodoById)
  .put(authenticate, updateTodo)
  .delete(authenticate, deleteTodo);

export default router;