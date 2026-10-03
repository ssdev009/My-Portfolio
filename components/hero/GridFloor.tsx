"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform float uBoost;
  uniform float uAlpha;
  varying vec2 vUv;

  void main() {
    // 1 unit cells; scroll toward the viewer
    vec2 uv = vUv * vec2(40.0, 30.0);
    uv.y += uTime * 0.5;

    vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);

    // fade with distance and toward the sides
    float fade = 1.0 - smoothstep(0.35, 1.0, vUv.y);
    fade *= 1.0 - smoothstep(0.3, 0.5, abs(vUv.x - 0.5));

    vec3 color = mix(uA, uB, smoothstep(0.2, 0.8, vUv.x));
    gl_FragColor = vec4(color * uBoost, line * fade * uAlpha);
  }
`;

/** Plain hex -> vec3 (no color-space conversion, the shader outputs raw sRGB). */
function hexToVec3(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

interface Props {
  colorA: string;
  colorB: string;
  boost: number;
  alpha: number;
}

/** Neon grid scrolling toward the camera. Colors follow the active theme. */
export function GridFloor({ colorA, colorB, boost, alpha }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: hexToVec3(colorA) },
      uB: { value: hexToVec3(colorB) },
      uBoost: { value: boost },
      uAlpha: { value: alpha },
    }),
    // created once; updated in the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uA.value.copy(hexToVec3(colorA));
    uniforms.uB.value.copy(hexToVec3(colorB));
    uniforms.uBoost.value = boost;
    uniforms.uAlpha.value = alpha;
  }, [colorA, colorB, boost, alpha, uniforms]);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.7, -6]}>
      <planeGeometry args={[40, 30]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
