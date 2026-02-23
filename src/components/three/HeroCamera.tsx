'use client';

import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Underwater camera journey ─────────────────────────────────────────────────
// Start: deep underwater, looking up through the surface at ~50° angle.
// End:   rising close to the surface — more of the caustic ceiling is visible,
//        god rays expand outward, light floods the frame.
const START_POS    = new THREE.Vector3(0, -4.0, 3.2);
const END_POS      = new THREE.Vector3(0, -1.4, 2.0);
const START_TARGET = new THREE.Vector3(0, 0.4, -0.8);
const END_TARGET   = new THREE.Vector3(0, 1.2, -0.4);
const _pos         = new THREE.Vector3();
const _target      = new THREE.Vector3();

interface HeroCameraProps {
  scrollProgress: number;
}

export function HeroCamera({ scrollProgress }: HeroCameraProps) {
  const { camera } = useThree();

  useFrame(() => {
    _pos.lerpVectors(START_POS, END_POS, scrollProgress);
    camera.position.copy(_pos);

    _target.lerpVectors(START_TARGET, END_TARGET, scrollProgress);
    camera.lookAt(_target);

    // Slightly widen FOV as we approach the surface (more dramatic immersion)
    (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.lerp(
      68,   // deeper water — wider, more claustrophobic
      76,   // near surface — wider still, light flooding in
      scrollProgress
    );
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  });

  return null;
}
