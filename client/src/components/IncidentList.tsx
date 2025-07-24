

import React from "react";
import IncidentCard from "./IncidentCard";
import { AnimatePresence } from "framer-motion";

import BadgeBase from "@/assets/Badgebase.svg";
import BadgeBase1 from "@/assets/Badgebase1.svg";
import BadgeBase2 from "@/assets/Badgebase2.svg";
import Image from "next/image";

import unresolvedIncidents from "@/assets/unresolvedIncidents.svg";
import checkbox from "@/assets/check-check.svg";

export interface Incident {
	id: number;
	type: string;
	tsStart: string;
	tsEnd: string;
	thumbnailUrl: string;
	camera: {
		name: string;
		location: string;
	};
}

export interface IncidentCardProps {
	incident: Incident;
	onResolve: (id: number) => Promise<void>;
}

export default function IncidentList({
	incidents,
	loading,
	setIncidents,
	resolvedCount,
	setResolvedCount
}: {
	incidents: Incident[];
	loading: boolean;
	setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
	resolvedCount: number;
	setResolvedCount: React.Dispatch<React.SetStateAction<number>>;
}) {

	const handleResolve = async (id: number) => {
		// Optimistic UI: remove from UI immediately
        setIncidents((prev) => prev.filter((incident) => incident.id !== id)); 
        // Async call to resolve the incident
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/incidents/${id}/resolve`,
                { method: "PATCH" }
            );
            if (!res.ok) {
                throw new Error("Failed to resolve incident");
            }
            // Update resolved count
            setResolvedCount((prev: number) => prev + 1);
        } catch (error) {
            console.error("Error resolving incident:", error);
            // If there's an error, re-add the incident to the list
            setIncidents((prev) => [...prev, incidents.find((i) => i.id === id)!]);
        }
	};
 
	return (
		<div className="w-2/5 h-full bg-[#131313] rounded-lg py-4 px-2 overflow-hidden relative">
			<div className="flex items-center justify-between mb-4 px-1">
				{/* Left: Unresolved */}
				<div className="flex items-center gap-2 text-white font-semibold">
					<Image
						src={unresolvedIncidents}
						alt="Unresolved Incidents"
						width={24}
						height={24}
					/>
					<span>{incidents.length} Unresolved Incidents</span>
				</div>

				{/* Right: User + Cameras + Resolved */}
				<div className="flex items-center   text-xs">
					{/* three icons badges */}

					<Image src={BadgeBase} alt="Badge" width={20} height={20} />

					<Image
						src={BadgeBase1}
						alt="Badge"
						className="-ml-1 "
						width={20}
						height={20}
					/>

					<Image
						src={BadgeBase2}
						alt="Badge"
						className="-ml-1 mr-2"
						width={20}
						height={20}
					/>

					<div className="bg-zinc-950 text-zinc-50 px-2 py-[2px] rounded-full border border-zinc-700 flex items-center gap-1">
						<Image src={checkbox} alt="Resolved" width={16} height={16} />
						<span>{resolvedCount} resolved incidents</span>
					</div>
				</div>
			</div>

			<div className="overflow-y-auto scrollbar-none max-h-full w-full">
				{/* Loading state */}
				{loading ? (
					<div className="flex items-center justify-center h-full">
						<span className="text-gray-400">Loading incidents...</span>
					</div>
				) : incidents.length === 0 ? (
					<div className="text-sm text-gray-400">No unresolved incidents</div>
				) : (
					<AnimatePresence>
						{incidents.map((incident) => (
							<IncidentCard  
								key={incident.id}
								incident={incident}
								onResolve={handleResolve}
							/>
						))}
					</AnimatePresence>
				)}
			</div>
		</div>
	);
}
