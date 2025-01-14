import { Router } from 'express';
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from './tag.controller';
import authenticate from '../../middlewares/authenticate';

const router = Router();

router.use(authenticate);

router.post('/', createTag);
router.get('/', getTags);
router.get('/:id', getTagById);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;