'use client';

import Image from 'next/image'; 
import { IoIosArrowForward } from 'react-icons/io';
import door_open from '@/assets/door-open.svg';
import gun from '@/assets/gun.svg';
import userSearch from '@/assets/user-search.svg';

import clock from "@/assets/clock.svg";
import cctv from '@/assets/nav_icons/cctv.svg';
// map of icon according to incident type
const incidentIcons: Record<string, string> = {
  'Gun Threat': gun,
  'Unauthorized Access': door_open,
  'Face Recognised': userSearch,
  // Add more mappings as needed
};

export default function IncidentCard({
  incident,
  onResolve
}: {
  incident: {
    id: number;
    type: string;
    tsStart: string;
    tsEnd: string;
    thumbnailUrl: string;
    camera: { name: string; location: string };
  };
  onResolve: (id: number) => void;
}) {
  return (
    <div className="flex  items-center justify-between w-full  rounded-lg px-1 py-0 mb-6  shadow">
      
      {/* Thumbnail */}
      <div className="h-18 w-34 relative shrink-0 rounded-md overflow-hidden border border-zinc-600">
        <Image
          src={incident.thumbnailUrl}
          alt="Incident thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Info */}
      <div className="flex flex-col items-start justify-between h-full gap-3 -mt-0 text-white text-sm ml-3 w-full">
        {/* Type */}
        <div className="flex items-center font-semibold mb-1 text-white">
            <Image
              src={incidentIcons[incident.type]}
              alt={incident.type}
              className="mr-1"
              width={16}
              height={16}
            />
          {incident.type}
        </div>

        {/* Location */}
      <div className="flex flex-col ">
          <div className="flex items-center text-xs text-zinc-300 mb-0.5">
            <Image
              src={cctv}
              alt="Camera"
              width={14}
              height={14}
              className="mr-1"
            />
          {incident.camera.name}
        </div>

        {/* Timestamp */}
        <div className="flex items-center text-xs font-bold text-zinc-400">
          <Image src={clock} alt="Clock" width={10} height={10} className="mr-1" />
          {formatTime(incident.tsStart)} – {formatTime(incident.tsEnd)} on {formatDate(incident.tsStart)}
        </div>
      </div>
      </div>

      {/* Resolve Button */}
      <button
        onClick={() => onResolve(incident.id)}
        className="text-amber-400 text-sm font-semibold flex items-center gap-1 hover:underline ml-4 shrink-0"
      >
        Resolve
        <IoIosArrowForward className="text-lg" />
      </button>
    </div>
  );
}

// Helpers
function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp: string): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
