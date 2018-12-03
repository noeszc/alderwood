import express from 'express';
import index from 'server/controllers/Vcard/Vcard.controller';

const router = express.Router();

router.get('/:title/:id', index);

export default router;
