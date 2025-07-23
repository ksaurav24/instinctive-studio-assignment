import express from 'express';
import incidentRoutes from './routes/incident.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', incidentRoutes);

export default app;
