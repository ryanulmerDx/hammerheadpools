'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { createUnderwaterSurfaceMaterial } from './WaterShaderMaterial';

interface WaterMeshProps {
  scrollProgress: number;
}

export function WaterMesh({ scrollProgress }: WaterMeshProps) {
  const material = useMemo(() => createUnderwaterSurfaceMaterial(), []);

  useFrame((_state, delta) => {
    material.uniforms.uTime.value += delta;
    material.uniforms.uScrollProgress.value = scrollProgress;
  });

  return (
    // Water surface sits at y = 0. Camera is at y ≈ −3.5, looking up through it.
    // Rotation lays the XY-plane flat; surface normal points +Y (upward).
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={material}>
      <planeGeometry args={[28, 28, 128, 128]} />
    </mesh>
  );
}
