'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import dashboard from '@/assets/nav_icons/dashboard.svg';
import settings from '@/assets/nav_icons/settings.svg';
import users from '@/assets/nav_icons/users.svg';
import alerts from '@/assets/nav_icons/alert.svg';
import cctv from '@/assets/nav_icons/cctv.svg';
// Plus Jakarta Sans font
import { Plus_Jakarta_Sans } from 'next/font/google';
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const navItems = [
    { name: 'Dashboard', icon: dashboard, href: '/dashboard' },
    { name: 'Camera', icon: cctv, href: '/cctv' },
    { name: 'Scenes', icon: settings, href: '/settings' },
    { name: 'Incidents', icon: alerts, href: '/alerts' },
    { name: 'Users', icon: users, href: '/users' },
]


export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-transparent z-30 text-white px-6 py-3 shadow-md flex items-center justify-between border-b border-white/15 ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={20} height={26} className="rounded" />
        <span className={`text-[length:1rem] font-normal tracking-widest ${plusJakartaSans.className}`}>MANDLAC<span className='font-bold'>X</span></span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-4  ">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} className={`flex items-center gap-1.5 px-3 py-2.5 hover:text-[#FFCC00] transition text-xs font-bold ${plusJakartaSans.className}`}>
            <Image src={item.icon} alt={item.name} width={16} height={16} />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 focus:outline-none"
        >
          <Image src="/user_icon.png" alt="User" width={32} height={32} className="rounded-full" />
          <div className="flex flex-col items-start  md:flex">
            <div className="hidden md:inline text-sm">Mohammed Ajhas</div>
          <div className="hidden md:inline text-xs">ajhas@mandlac.com</div>
          </div>
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50 text-sm">
            <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100">Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
}
