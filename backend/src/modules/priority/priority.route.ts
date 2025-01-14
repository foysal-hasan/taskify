import { Router } from 'express';
import {
  createPriority,
  getPriorities,
  getPriorityById,
  updatePriority,
  deletePriority,
} from './priority.controller';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.use(authenticate);

router.post('/', createPriority);
router.get('/', getPriorities);
router.get('/:id', getPriorityById);
router.put('/:id', updatePriority);
router.delete('/:id', deletePriority);

export default router;