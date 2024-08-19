import express from 'express';
import { SnapController } from '../controller/index.js';
import { SnapMiddleware } from '../middleware/index.js';

const router = express.Router();

router.get('/snaps', SnapController.snaps);
router.get('/snaps/:id', SnapController.snap);
router.post('/snaps', SnapController.create);
router.delete('/snaps/:id', SnapMiddleware.deleteSnap, SnapController.destroy);

export default router;
