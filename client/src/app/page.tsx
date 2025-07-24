import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-zinc-950 relative w-full min-h-screen overflow-hidden">
      
      {/* Background image with non-blocking overlay */}
      <div className="absolute -top-[130vh] inset-0 z-0  pointer-events-none select-none">
        <Image
          src="/Gradient.svg"
          alt="Background"
          fill
          className=""
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Navbar />
        <Dashboard />
        
      </div>
    </main>
  );
}
