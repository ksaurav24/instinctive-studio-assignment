'use client';

import Image from 'next/image';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { MdSecurity } from 'react-icons/md'; // generic threat icon

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
    <div className="flex items-center justify-between w-full bg-black/90 rounded-lg px-4 py-3 border border-zinc-700 shadow">
      
      {/* Thumbnail */}
      <div className="w-20 h-14 relative shrink-0 rounded overflow-hidden border border-zinc-600">
        <Image
          src={incident.thumbnailUrl}
          alt="Incident thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Info */}
      <div className="flex flex-col text-white text-sm ml-4 grow">
        {/* Type */}
        <div className="flex items-center font-semibold mb-1 text-white">
          <MdSecurity className="text-orange-500 mr-1" />
          {incident.type}
        </div>

        {/* Location */}
        <div className="flex items-center text-xs text-zinc-300 mb-0.5">
          <FaMapMarkerAlt className="text-zinc-400 mr-1" />
          {incident.camera.name}
        </div>

        {/* Timestamp */}
        <div className="flex items-center text-xs text-zinc-400">
          <FaClock className="mr-1" />
          {formatTime(incident.tsStart)} – {formatTime(incident.tsEnd)} on {formatDate(incident.tsStart)}
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
