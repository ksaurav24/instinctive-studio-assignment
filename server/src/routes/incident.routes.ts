import { Router } from 'express';
import { getIncidents, resolveIncident } from '../controllers/incident.controller.js';

const router = Router();

router.get('/incidents', getIncidents);
router.patch('/incidents/:id/resolve', resolveIncident);

export default router;
