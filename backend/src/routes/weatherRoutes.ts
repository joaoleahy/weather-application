import express, { RequestHandler } from 'express';
import { weatherController } from '../controllers/weatherController';

const router = express.Router();

router.get('/city', weatherController.getWeatherByCity as RequestHandler);
router.get('/coords', weatherController.getWeatherByCoords as RequestHandler);
router.get('/cities', weatherController.getCitySuggestions as RequestHandler);

export default router;
