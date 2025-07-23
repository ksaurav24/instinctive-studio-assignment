'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowForward } from 'react-icons/io';

import door_open from '@/assets/door-open.svg';
import gun from '@/assets/gun.svg';
import userSearch from '@/assets/user-search.svg';
import clock from "@/assets/clock.svg";
import cctv from '@/assets/nav_icons/cctv.svg';

const incidentIcons: Record<string, StaticImageData> = {
  'Gun Threat': gun,
  'Unauthorized Access': door_open,
  'Face Recognised': userSearch
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
  const [exiting, setExiting] = useState(false);

  const handleClick = () => {
    setExiting(true);
    setTimeout(() => onResolve(incident.id), 300); // match exit duration
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between w-full rounded-lg px-1 py-0 mb-6 shadow"
    >
      {/* Thumbnail */}
      <div className="h-20 w-36 relative shrink-0 rounded-md overflow-hidden border border-zinc-600">
        <Image
          src={incident.thumbnailUrl}
          alt="Incident thumbnail"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-between gap-2 text-white text-sm ml-3 w-full">
        {/* Type */}
        <div className="flex items-center font-semibold">
          {incidentIcons[incident.type] && (
            <Image
              src={incidentIcons[incident.type]}
              alt={incident.type}
              width={16}
              height={16}
              className="mr-1"
            />
          )}
          {incident.type}
        </div>

        {/* Location + Time */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-xs text-zinc-300">
            <Image src={cctv} alt="Camera" width={14} height={14} className="mr-1" />
            {incident.camera.name}
          </div>
          <div className="flex items-center text-xs font-bold text-zinc-400">
            <Image src={clock} alt="Clock" width={10} height={10} className="mr-1" />
            {formatTime(incident.tsStart)} – {formatTime(incident.tsEnd)} on {formatDate(incident.tsStart)}
          </div>
        </div>
      </div>

      {/* Resolve Button */}
      <button
        onClick={handleClick}
        className="text-amber-400 text-sm font-semibold flex items-center gap-1 hover:underline ml-4 shrink-0"
      >
        Resolve
        <IoIosArrowForward className="text-lg" />
      </button>
    </motion.div>
  );
}

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
