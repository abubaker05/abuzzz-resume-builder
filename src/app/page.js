"use client"; 
    
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'; // <--- NEW IMPORT for routing
    
export default function HomePage() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null); 
    
  useEffect(() => {
    if (typeof window !== "undefined" && !vantaEffect && vantaRef.current) {
      
      // === THE JAVASCRIPT FIX (Vanta Setup) ===
      const THREE = require('three');
      window.THREE = THREE; 
      const vantaModule = require('vanta/dist/vanta.net.min');
      const NET = vantaModule.default || vantaModule; 
      
      setVantaEffect(
        NET({ 
          el: vantaRef.current, 
          THREE: THREE, 
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0a3a46, // darker cyan (reduced brightness)
          backgroundColor: 0x030712, // dark navy background
          points: 8.0,
          maxDistance: 25.0,
          spacing: 18.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
    
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* LAYER 0: VANTA BACKGROUND */}
      <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
    
      {/* LAYER 1: SEMI-TRANSPARENT OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-[1px] z-[1]"></div>
    
      {/* LAYER 2: MAIN CONTENT */}
      <div className="relative z-[10] flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1
          className="text-6xl md:text-7xl font-extrabold text-white mb-6"
          style={{
            textShadow:
              "0 0 25px rgba(255,255,255,0.6), 0 0 15px rgba(6,182,212,0.8)",
          }}
        >
          WELCOME TO ABUZZZ RESUME BUILDER
        </h1>
    
        <p
          className="text-xl md:text-2xl text-gray-300 mb-10"
          style={{
            textShadow: "0px 4px 10px rgba(0,0,0,0.8)",
          }}
        >
          Create and share your professional resume in minutes.
        </p>
    
        {/* === BUTTON FIX: Wrapped in Next/Link === */}
        <Link href="/register" passHref>
          <button className="bg-indigo-600 text-white text-xl py-3 px-10 rounded-xl font-bold hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
            GET STARTED
          </button>
        </Link>
        {/* ======================================= */}
        
      </div>
    </main>
  );
}
