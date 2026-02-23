'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// More particles, spread across a wider/deeper underwater volume
const COUNT = 250;

export function BubbleParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    const phs = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22; // x: spread wide
      pos[i * 3 + 1] = Math.random() * 8 - 7;       // y: −7 to +1 (mostly below surface)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22; // z
      spd[i]         = 0.2 + Math.random() * 0.45;   // rise speed
      phs[i]         = Math.random() * Math.PI * 2;   // drift phase offset
    }
    return { positions: pos, speeds: spd, phases: phs };
  }, []);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const pos = pts.geometry.attributes.position;

    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i);
      y += delta * speeds[i];

      // Gentle sinusoidal horizontal drift
      const x = pos.getX(i) + Math.sin(state.clock.elapsedTime * 0.35 + phases[i]) * delta * 0.09;

      // Reset well below camera so we never see a "pop-in"
      if (y > 1.2) y = -7.5;

      pos.setXYZ(i, x, y, pos.getZ(i));
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#7adeff"
        transparent
        opacity={0.45}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
