'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Each shaft: a tapered cylinder anchored at the water surface (y = 0),
// extending downward. Additive blending adds brightness without occluding
// the caustic ceiling behind it.
interface RayConfig {
  x:        number; // horizontal offset from centre
  z:        number;
  tiltX:    number; // slight lean angle
  tiltZ:    number;
  opacity:  number;
  height:   number;
  radBot:   number; // wide end (depth)
  phase:    number; // breathing phase offset
}

const RAYS: RayConfig[] = [
  { x:  0.0, z:  0.0, tiltX:  0.00, tiltZ:  0.00, opacity: 0.16, height: 8.5, radBot: 0.55, phase: 0.0  },
  { x:  0.6, z: -0.3, tiltX:  0.10, tiltZ:  0.14, opacity: 0.10, height: 7.0, radBot: 0.38, phase: 1.3  },
  { x: -0.5, z:  0.4, tiltX: -0.08, tiltZ: -0.12, opacity: 0.09, height: 7.5, radBot: 0.42, phase: 2.6  },
  { x:  0.3, z:  0.6, tiltX:  0.12, tiltZ: -0.07, opacity: 0.08, height: 6.5, radBot: 0.30, phase: 3.9  },
  { x: -0.7, z: -0.5, tiltX: -0.13, tiltZ:  0.09, opacity: 0.07, height: 6.0, radBot: 0.28, phase: 0.7  },
  { x:  0.9, z:  0.2, tiltX:  0.07, tiltZ:  0.18, opacity: 0.07, height: 7.0, radBot: 0.32, phase: 2.1  },
  { x: -0.2, z: -0.8, tiltX: -0.05, tiltZ: -0.16, opacity: 0.08, height: 5.5, radBot: 0.25, phase: 4.4  },
  { x:  0.1, z:  0.1, tiltX:  0.04, tiltZ:  0.05, opacity: 0.12, height: 9.0, radBot: 0.60, phase: 1.8  },
  { x: -0.4, z:  0.7, tiltX:  0.09, tiltZ: -0.10, opacity: 0.06, height: 6.0, radBot: 0.22, phase: 3.2  },
  { x:  0.5, z: -0.6, tiltX: -0.06, tiltZ:  0.11, opacity: 0.07, height: 6.5, radBot: 0.26, phase: 0.4  },
];

// Individual light shaft — a tall tapered cylinder.
// radiusTop is tiny (light source at surface), radiusBottom is wider (diverges with depth).
function GodRay({ x, z, tiltX, tiltZ, opacity, height, radBot, phase }: RayConfig) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mat = meshRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (!mat) return;
    // Slow "breathing" opacity — makes the shafts feel alive
    mat.opacity = opacity * (0.55 + Math.sin(state.clock.elapsedTime * 0.28 + phase) * 0.45);
  });

  // Center the cylinder so its TOP edge sits at y = 0 (water surface)
  const yCenter = -(height / 2);

  return (
    <mesh
      ref={meshRef}
      position={[x, yCenter, z]}
      rotation={[tiltX, 0, tiltZ]}
    >
      {/* radiusTop = near-zero (light enters as a point), radiusBottom = fan out */}
      <cylinderGeometry args={[0.025, radBot, height, 6, 1, true]} />
      <meshBasicMaterial
        color="#b8e8ff"
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function GodRays() {
  return (
    <group>
      {RAYS.map((r, i) => (
        <GodRay key={i} {...r} />
      ))}
    </group>
  );
}
