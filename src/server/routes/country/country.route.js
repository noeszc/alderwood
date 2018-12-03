import express from 'express';
import homeController from 'server/controllers/home.controller';
import playerRoutes from 'server/routes/player/main.player.route';
import vcartRoutes from 'server/routes/Vcard/Vcard.route';

const router = express.Router();

router.use('/player', playerRoutes);
router.use('/vcard', vcartRoutes);
router.get('*', homeController);

export default router;
