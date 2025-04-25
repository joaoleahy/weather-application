import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes';
import { config } from './config';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Weather App Server is running!');
});

app.use('/api/weather', weatherRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
