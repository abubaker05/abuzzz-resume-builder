"use client"; 
    
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export function VantaBackground() {
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null); 
    
    useEffect(() => {
        if (typeof window !== "undefined" && !vantaEffect && vantaRef.current) {
          
            const vantaModule = require('vanta/dist/vanta.net.min');
            const NET = vantaModule.default || vantaModule; 
            
            window.THREE = THREE;
          
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
                    color: 0x047481, // Dark, subtle cyan
                    backgroundColor: 0x030712, // Dark background
                    points: 5.0, // Reduced density further
                    maxDistance: 25.0,
                    spacing: 15.0,
                })
            );
        }

        return () => {
          if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]); 

    return (
        <div 
            ref={vantaRef} 
            className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        />
    );
}