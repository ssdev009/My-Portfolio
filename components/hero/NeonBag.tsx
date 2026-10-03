"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

const CYAN = "#00f0ff";
const MAGENTA = "#ff2bd6";

/** Lightning-bolt silhouette (same mark as the logo). */
function createBoltGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0.18, 0.55);
  s.lineTo(-0.3, -0.05);
  s.lineTo(-0.03, -0.05);
  s.lineTo(-0.15, -0.55);
  s.lineTo(0.3, 0.1);
  s.lineTo(0.03, 0.1);
  s.closePath();
  return new THREE.ShapeGeometry(s);
}

/** Low-poly shopping bag with glowing cyan edges, magenta handles and a bolt mark. */
export function NeonBag() {
  const group = useRef<THREE.Group>(null);
  const hovered = useRef(false);
  const spin = useRef(0.3);
  const boltGeometry = useMemo(createBoltGeometry, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const target = hovered.current ? 1.5 : 0.3;
    spin.current = THREE.MathUtils.lerp(spin.current, target, 0.06);
    g.rotation.y += delta * spin.current;
    g.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
  });

  return (
    <group
      ref={group}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    >
      {/* Body: tapered 4-sided prism */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.85, 1.05, 1.5, 4]} />
        <meshStandardMaterial
          color="#070a1c"
          metalness={0.6}
          roughness={0.35}
          emissive={CYAN}
          emissiveIntensity={0.08}
        />
        <Edges threshold={15} color={CYAN} />
      </mesh>

      {/* Handles */}
      {[0, Math.PI / 2].map((rotY) => (
        <mesh key={rotY} position={[0, 0.74, 0]} rotation={[0, rotY, 0]}>
          <torusGeometry args={[0.42, 0.035, 8, 40, Math.PI]} />
          <meshBasicMaterial color={MAGENTA} toneMapped={false} />
        </mesh>
      ))}

      {/* Bolt on front and back faces */}
      {[0, Math.PI].map((rotY) => (
        <group key={rotY} rotation={[0, rotY, 0]}>
          <mesh
            geometry={boltGeometry}
            position={[0, -0.02, 0.7]}
            rotation={[-0.094, 0, 0]}
          >
            <meshBasicMaterial
              color={MAGENTA}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
