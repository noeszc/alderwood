import express from 'express';
import index from 'server/controllers/player/playervod.controller';

const router = express.Router();

router.get('/:groupId', index);

export default router;
