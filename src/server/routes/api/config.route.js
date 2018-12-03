import express from "express";
import { index } from 'server/controllers/api/config.controller';

const router = express.Router();

router.get('/config/:country', index);

export default router;
