import { Router } from 'express';
import {
  createStatus,
  getStatuses,
  getStatusById,
  updateStatus,
  deleteStatus,
} from './status.controller';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.use(authenticate);

router.post('/', createStatus);
router.get('/', getStatuses);
router.get('/:id', getStatusById);
router.put('/:id', updateStatus);
router.delete('/:id', deleteStatus);

export default router;