import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from './user.controller';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;