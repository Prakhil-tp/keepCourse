import express from 'express';
import { login, signup } from './routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'authentication page' })
})
router.post('/login', login);
router.post('/signup', signup);

export { router as authRouter };