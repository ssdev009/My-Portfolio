"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  count: number;
  colorA: string;
  colorB: string;
  /** Additive glow on dark backgrounds; normal blending on light ones */
  additive: boolean;
}

/** Drifting dust. Count depends on the device tier; colors depend on the theme. */
export function Particles({ count, colorA, colorB, additive }: Props) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const a = new THREE.Color(colorA);
    const b = new THREE.Color(colorB);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 6.5 - 1.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      const c = Math.random() > 0.5 ? a : b;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count, colorA, colorB]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += delta * 0.02;
    p.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12;
  });

  return (
    <points ref={ref} key={`${count}-${colorA}-${colorB}`}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        key={additive ? "add" : "normal"}
        size={additive ? 0.035 : 0.05}
        vertexColors
        transparent
        opacity={additive ? 0.9 : 0.75}
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}
