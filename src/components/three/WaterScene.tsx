'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WaterMesh } from './WaterMesh';
import { HeroCamera } from './HeroCamera';
import { BubbleParticles } from './BubbleParticles';

interface WaterSceneProps {
  scrollProgress: number;
}

export function WaterScene({ scrollProgress }: WaterSceneProps) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,          // solid background — no bleed-through
        toneMapping: 3,        // ACESFilmicToneMapping
        toneMappingExposure: 1.15,
      }}
      camera={{
        position: [0, -4, 3.2],
        fov: 68,
        near: 0.05,
        far: 60,
      }}
      dpr={[1, 1.5]}
    >
      {/* ── Deep-water background colour ─── */}
      <color attach="background" args={['#030c18']} />

      <Suspense fallback={null}>
        {/* Very dim ambient — underwater has almost no scattered light */}
        <ambientLight intensity={0.12} color="#0a2850" />

        {/* Sun shaft — strong directional from above simulating sunlight entering water */}
        <directionalLight
          position={[1, 10, -2]}
          intensity={3.5}
          color="#d0f0ff"
        />

        {/* Focal point glow just below the surface centre */}
        <pointLight
          position={[0, -0.3, -0.5]}
          intensity={4.0}
          color="#ffffff"
          distance={10}
        />

        {/* Soft fill light — gives a slight lateral cyan tint to the water column */}
        <pointLight
          position={[6, -3, 3]}
          intensity={0.7}
          color="#1a6080"
          distance={18}
        />

        {/* Water surface ceiling — viewed from below */}
        <WaterMesh scrollProgress={scrollProgress} />

        {/* Air bubbles rising toward the surface */}
        <BubbleParticles />

        {/* Scroll-driven camera journey */}
        <HeroCamera scrollProgress={scrollProgress} />

        {/* Dense underwater fog — creates depth and hide the geometry edges */}
        <fog attach="fog" args={['#030c18', 6, 28]} />
      </Suspense>
    </Canvas>
  );
}
