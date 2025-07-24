"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Environment, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

function MandlacXModel() {
	const { scene } = useGLTF("/models/SmartSightProductModel.glb");
	const ref = useRef<THREE.Group>(null);

	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.y += 0; // self-rotation on local Y-axis
		}
	});

	// lock model position to center
	scene.position.set(-0.6, -0.07, 0);

	return <primitive object={scene} ref={ref} scale={10} />;
}

// Loading component for better UX
function ModelLoader() {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#000" wireframe />
        </mesh>
    );
}

export default function MandlacXShowcase() {
    return (
        <div className="w-screen h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white font-sans overflow-hidden relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-20 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div> 
            </div>
            {/* Header */}
            <div className="absolute top-8 w-full text-center z-20">
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className={`text-sm tracking-widest text-amber-500 font-medium ${plusJakartaSans.className}`}
                >
                    THE FUTURE OF ON-SITE AI SURVEILLANCE
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className={`text-6xl font-semibold mt-2 ${plusJakartaSans.className}`}
                >
                    MandlacX Edge <span className="italic font-light  ">Processor</span>
                </motion.h1>
            </div>

            {/* Enhanced 3D Model Container */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="absolute   ml-36  w-full h-full   z-10"
            >
                <Canvas 
                    camera={{ position: [0, 0, 4], fov: 35 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Enhanced Lighting Setup */}
                    <ambientLight intensity={0.4} />
                    <directionalLight 
                        position={[10, 10, 5]} 
                        intensity={1.5} 
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                    />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
                    <spotLight 
                        position={[0, 10, 0]} 
                        intensity={0.3} 
                        angle={0.6} 
                        penumbra={1} 
                        color="#ffcc00" 
                    />
                    
                    {/* Environment for better reflections */}
                    <Environment preset="studio" />
                    
                    <Suspense fallback={<ModelLoader />}>
                        <MandlacXModel />
                        <ContactShadows
                            position={[0, -2, 0]}
                            opacity={0.4}
                            width={20}
                            height={20}
                            blur={2}
                            far={8}
                            color="#000000"
                        />
                    </Suspense>
                    
                    {/* Enhanced OrbitControls */}
                    <OrbitControls 
                        enablePan={false} 
                        enableZoom={false}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI - Math.PI / 3}
                        autoRotate={false}
                        enableDamping={true}
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                    />
                </Canvas>
            </motion.div>

            {/* Top Feature Cards with improved animations */}
            <div className="absolute z-20 w-full px-12 top-[30%] flex justify-between text-left text-sm">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <CardContainer title="MandlacX Edge Processor" keypoints={[
                        "Multi-domain AI-powered device for real-time threat detection",
                        "First-generation edge computing surveillance solution"
                    ]} />
                </motion.div>
                
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <CardContainer title="Key Specifications" keypoints={[
                        "USB 3.0 Support with fast data transfer",
                        "16 GB RAM for seamless processing",
                        "A7 Cortex Processor for efficient computing",
                        "Three multi-axis surveillance lenses"
                    ]} />
                </motion.div>
            </div>

            {/* Bottom Feature Cards with staggered animations */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full justify-center px-20 py-10 flex gap-48 z-20 text-sm">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <CardContainer title="Real-Time Threat Detection" keypoints={[
                        "Advanced intrusion detection",
                        "Firearms & sharp objects identification",
                        "Human fall detection system",
                        "Unusual behavior pattern recognition"
                    ]} />
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                >
                    <CardContainer title="On-Device Intelligence" keypoints={[
                        "Cloud-independent processing",
                        "Enhanced privacy and security",
                        "Low-latency response times",
                        "Reliable offline operation"
                    ]} />
                </motion.div>
 
            </div>

            {/* Enhanced Footer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className={`absolute bottom-4 right-8 z-20 text-right text-zinc-400 text-sm italic ${plusJakartaSans.className}`}
            >
                <span className="text-amber-400">Built for Speed.</span> <br /> 
                <span className="text-blue-400">Designed for Action.</span>
            </motion.div>

            {/* Interaction Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-4 left-8 z-20 text-zinc-500 text-xs"
            >
                <span className="animate-pulse">🖱️ Drag to rotate • View from all angles</span>
            </motion.div>
        </div>
    );
}

// Enhanced CardContainer with better styling and animations
const CardContainer = ({ title, keypoints }: {
    title: string;
    keypoints: string[];
}) => {
    return (
        <div className="border border-neutral-700/50 rounded-xl p-5 bg-gradient-to-br from-neutral-900/80 to-black/60 backdrop-blur-md flex flex-col gap-3 max-w-sm hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 w-1 h-8 rounded-full"></div>
                <h3 className={`text-lg font-bold text-white ${plusJakartaSans.className}`}>
                    {title}
                </h3>
            </div>
            <div className="space-y-2">
                {keypoints.map((point, index) => (
                    <motion.p 
                        key={index} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={`text-neutral-300 text-sm leading-relaxed ${plusJakartaSans.className}`}
                    >
                        <span className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mr-3 mb-0.5"></span>
                        {point}
                    </motion.p>
                ))}
            </div>
        </div>
    );
};
