'use client';
import Image from 'next/image';
import calendar from '@/assets/calendar.svg';
import camera_red_icon from '@/assets/camera_red_icon.svg';
import ellipsis_vertical from '@/assets/ellipsis_vertical.svg';

export default function IncidentPlayer() {
  return (
    <div className="relative w-7/12 h-fit aspect-video bg-black rounded-lg overflow-hidden shadow-lg border border-zinc-800">
      {/* Video Element */}
      <Image
              src="/mainPlayerBg.png"
              layout="fill"
              className="w-full h-full object-cover" alt={''}      />

      {/* Top-Left Timestamp Overlay */}
      <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
        <Image src={calendar} alt="Calendar" width={10} height={10} />
        <span>11/7/2025 - 03:12:37</span>
      </div>

      {/* Bottom-Left Camera Label */}
      <div className="absolute bottom-2 left-2 bg-black border-[#404040] border-[1px] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
        <Image src={camera_red_icon} alt="Camera" width={10} height={10} />
        <span>Camera - 01</span>
      </div>

      {/* Bottom-Right Mini Feeds */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        {/* Feed 1 */}
        <div className="w-28 bg-black  text-white text-[10px] rounded shadow    ">
          <div className="px-2 py-[1px] border-b flex justify-between border-zinc-700 text-left">
            <span className="text-[10px]">Camera - 02</span>
            <Image
              src={ellipsis_vertical}
              alt="More Options"
              width={12}
              height={12}
            />
          </div>
          <Image
            src="/thumbnails/thumb1.png"
            alt="Cam 2"
            width={112}
            height={64}
            className="rounded-b object-cover"
          />
        </div>

        {/* Feed 2 */}
        <div className="w-28 bg-black  text-white text-[10px] rounded shadow    ">
          <div className="px-2 py-[1px] border-b flex justify-between border-zinc-700 text-left">
            <span className="text-[10px]">Camera - 03</span>
            <Image
              src={ellipsis_vertical}
              alt="More Options"
              width={12}
              height={12}
            />
          </div>
          <Image
            src="/thumbnails/thumb2.png"
            alt="Cam 3"
            width={112}
            height={64}
            className="rounded-b object-cover"
          />
        </div>
      </div>
    </div>
  );
}
