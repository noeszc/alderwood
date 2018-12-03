import express from 'express';
import configRoute from 'server/routes/api/config.route';

const router = express.Router();

router.use('/', configRoute);

export default router;