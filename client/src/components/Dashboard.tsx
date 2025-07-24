"use client";
import IncidentPlayer from "./IncidentPlayer";
import IncidentList from "./IncidentList";
import { useEffect, useState } from "react";
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

export default function Dashboard() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [resolvedCount, setResolvedCount] = useState<number>(0);
    
    useEffect(() => {
            const fetchIncidents = async () => {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/incidents?resolved=false`
                );
                const data = await res.json();
                setIncidents(data);
            };
            const fetchResolved = async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/incidents?resolved=true`
			);
			const data = await res.json();
			setResolvedCount(data.length);
		};
            setLoading(true);
		    fetchResolved();
            fetchIncidents()
                .catch((err) => {
                    console.error("Failed to fetch incidents:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, []); 
     

  return (
    <div className="flex w-full p-6 gap-4 h-[500px]">
        <IncidentPlayer />
        <IncidentList incidents={incidents} setIncidents={setIncidents} loading={loading} resolvedCount={resolvedCount} setResolvedCount={setResolvedCount} />
    </div>
    
  );
}
