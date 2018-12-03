import express from 'express';
import playerVodRoute from 'server/routes/player/playervod.route';
import playerLiveRoute from 'server/routes/player/playerlive.route';
import trailerRoute from 'server/routes/player/trailer.route';

const router = express.Router();

router.use('/vod/:title', playerVodRoute);
router.use('/live/:title', playerLiveRoute);
router.use('/preview/:title', trailerRoute);

export default router;
