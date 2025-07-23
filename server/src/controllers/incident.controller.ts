import { prisma } from '../prisma/client.js';

/**
 * GET /api/incidents?resolved=false
 */
export async function getIncidents(req: any, res: any) {
  const resolved = req.query.resolved === 'true';

  const incidents = await prisma.incident.findMany({
    where: { resolved },
    include: { camera: true },
    orderBy: { tsStart: 'desc' }
  });

  res.json(incidents);
}

/**
 * PATCH /api/incidents/:id/resolve
 */
export async function resolveIncident(req: any, res: any) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  try {
    const updated = await prisma.incident.update({
      where: { id },
      data: { resolved: true }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Incident not found or already resolved' });
  }
}
