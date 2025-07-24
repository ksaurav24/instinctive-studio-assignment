import { prisma } from "../prisma/client.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { errorResponse, successResponse } from "../utils/response.js";

/**
 * GET /api/incidents?resolved=false
 */
export const getIncidents = asyncHandler(async (req: any, res: any) => {
	const resolved = req.query.resolved === "true";

	try {
		const incidents = await prisma.incident.findMany({
			where: { resolved },
			include: { camera: true },
			orderBy: { tsStart: "desc" },
		});
		return res
			.status(200)
			.send(successResponse(incidents, "Incidents fetched successfully", 200));
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.send(
				errorResponse("Failed to fetch incidents", 500, ["Database error"])
			);
	}
});

/**
 * PATCH /api/incidents/:id/resolve
 */
export const resolveIncident = asyncHandler(async (req: any, res: any) => {
	const id = parseInt(req.params.id);
	if (isNaN(id))
		return res
			.status(400)
			.send(errorResponse("Invalid body", 400, ["ID must be a number"]));

	try {
		const updated = await prisma.incident.update({
			where: { id },
			data: { resolved: true },
		});
		if (!updated) {
			return res
				.status(404)
				.json(
					errorResponse("Incident not found", 404, [
						"No incident found with the given ID",
					])
				);
		}
		return res
			.status(200)
			.json(successResponse(updated, "Incident resolved successfully", 200));
	} catch (err) {
		return res
			.status(500)
			.json(
				errorResponse("Incident not found or already resolved", 500, [
					"Database error",
				])
			);
	}
});
