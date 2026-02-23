'use client';

import * as THREE from 'three';

// ─── Shared wave vertex shader ───────────────────────────────────────────────
// Displaces a 128×128-subdivided PlaneGeometry (flat in XY) along Z.
// After mesh rotation (−π/2 on X), the Z direction becomes +Y in world space.
export const VERTEX_SHADER = `
  uniform float uTime;
  uniform float uWaveStrength;
  uniform float uScrollProgress;

  varying vec2  vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    float wave1 = sin(position.x * 2.5 + uTime * 0.65)
                * cos(position.y * 1.8  + uTime * 0.45) * 0.07;

    float wave2 = sin(position.x * 4.2  - uTime * 1.0)
                * sin(position.y * 3.5  + uTime * 0.75) * 0.035;

    float wave3 = cos(position.x * 1.4  + position.y * 2.2 + uTime * 0.38) * 0.04;

    float elevation = (wave1 + wave2 + wave3) * uWaveStrength;
    vElevation = elevation;

    vec3 pos  = position;
    pos.z    += elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// ─── Fragment shader: underwater water surface (viewed from below) ────────────
// Simulates light refracting through moving water. Wave peaks act as convex
// lenses focusing sunlight into bright caustic patches. Between them the
// surface curves away → total-internal-reflection → deep blue shadow.
export const FRAGMENT_SHADER_UNDERWATER = `
  uniform float uTime;
  uniform vec3  uColorDeep;
  uniform vec3  uColorCyan;
  uniform float uScrollProgress;

  varying vec2  vUv;
  varying float vElevation;

  float causticLayer(vec2 uv, float t, float scale) {
    vec2 p = uv * scale;
    float dx = sin(p.y * 3.1 + t * 1.1)  * 0.28
             + sin(p.y * 5.8 - t * 0.75) * 0.14;
    float dy = cos(p.x * 2.9 + t * 0.85) * 0.28
             + cos(p.x * 5.0 + t * 1.35) * 0.12;
    vec2 d = p + vec2(dx, dy);
    float c = sin(d.x * 2.0) * cos(d.y * 2.0);
    return pow(abs(c), 2.5);
  }

  void main() {
    // ── Two-layer caustic interference ────────────────────────────────────
    float c1 = causticLayer(vUv, uTime * 0.55, 4.0);
    float c2 = causticLayer(vUv, uTime * 0.72 + 1.7, 6.2);
    float caustics = c1 * c2;
    caustics = smoothstep(0.04, 0.38, caustics);

    // ── Sun glow: bright at center, fades toward edges ────────────────────
    float d = length(vUv - 0.5);
    float sunGlow = pow(1.0 - smoothstep(0.0, 0.65, d), 1.8);

    // ── Wave crests focus extra light ────────────────────────────────────
    float crestBright = clamp(vElevation * 7.0 + 0.4, 0.0, 1.0);

    // ── Color composition ─────────────────────────────────────────────────
    vec3 dark   = uColorDeep * 0.55;
    vec3 mid    = uColorCyan * 0.75;
    vec3 bright = vec3(0.82, 0.96, 1.0);

    vec3 color = dark;
    color = mix(color, mid,    caustics * 0.85);
    color = mix(color, bright, caustics * caustics * 0.75);
    color = mix(color, bright * 1.15, sunGlow * 0.45);
    color = mix(color, mid,    crestBright * 0.12);

    // Brighten as camera rises toward surface (scroll feedback)
    color += color * uScrollProgress * 0.3;

    // Corner vignette: edges recede into deep blue
    float corner = clamp(1.0 - length(vUv - 0.5) * 0.9, 0.3, 1.0);
    color *= corner;

    float alpha = clamp(mix(0.88, 0.95, caustics + sunGlow * 0.5), 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

// Factory — create one material instance per scene
export function createUnderwaterSurfaceMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader:   VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER_UNDERWATER,
    uniforms: {
      uTime:           { value: 0 },
      uWaveStrength:   { value: 1.0 },
      uScrollProgress: { value: 0 },
      uColorDeep:      { value: new THREE.Color('#040d1e') },
      uColorCyan:      { value: new THREE.Color('#22d3ee') },
    },
    transparent: true,
    side:         THREE.DoubleSide,
    depthWrite:   false,
  });
}

// Alias kept so existing imports don't break
export const createWaterMaterial = createUnderwaterSurfaceMaterial;
