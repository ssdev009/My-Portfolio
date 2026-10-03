"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

type CardKind = "product" | "cart" | "checkout" | "stats";

interface CardDef {
  kind: CardKind;
  color: string;
  angle: number;
  y: number;
}

const RADIUS = 2.7;

const CARDS: CardDef[] = [
  { kind: "product", color: "#00f0ff", angle: 0, y: 0.95 },
  { kind: "cart", color: "#ff2bd6", angle: Math.PI / 2, y: -0.15 },
  { kind: "stats", color: "#7a5cff", angle: Math.PI, y: 0.65 },
  { kind: "checkout", color: "#00f0ff", angle: (3 * Math.PI) / 2, y: -0.75 },
];

/** Flat colored bar helper, used to fake UI content on each card. */
function Bar({
  w,
  h,
  x,
  y,
  color,
  opacity = 1,
}: {
  w: number;
  h: number;
  x: number;
  y: number;
  color: string;
  opacity?: number;
}) {
  return (
    <mesh position={[x, y, 0.02]}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        color={color}
        toneMapped={false}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function CardContent({ kind, color }: { kind: CardKind; color: string }) {
  switch (kind) {
    case "product":
      return (
        <>
          <Bar w={0.5} h={0.5} x={-0.32} y={0.02} color={color} opacity={0.35} />
          <Bar w={0.4} h={0.06} x={0.3} y={0.15} color="#e8ecff" opacity={0.8} />
          <Bar w={0.3} h={0.045} x={0.25} y={0.04} color="#8a93b8" />
          <Bar w={0.28} h={0.1} x={0.27} y={-0.14} color={color} />
        </>
      );
    case "cart":
      return (
        <>
          <Bar w={0.8} h={0.05} x={0} y={0.2} color="#e8ecff" opacity={0.8} />
          <Bar w={0.6} h={0.04} x={-0.1} y={0.08} color="#8a93b8" />
          <Bar w={0.7} h={0.04} x={-0.05} y={-0.02} color="#8a93b8" />
          <Bar w={0.35} h={0.1} x={0.22} y={-0.2} color={color} />
        </>
      );
    case "stats":
      return (
        <>
          <Bar w={0.1} h={0.2} x={-0.3} y={-0.1} color={color} opacity={0.6} />
          <Bar w={0.1} h={0.35} x={-0.12} y={-0.03} color={color} opacity={0.8} />
          <Bar w={0.1} h={0.5} x={0.06} y={0.05} color={color} />
          <Bar w={0.1} h={0.28} x={0.24} y={-0.07} color={color} opacity={0.7} />
          <Bar w={0.6} h={0.04} x={-0.02} y={0.26} color="#e8ecff" opacity={0.7} />
        </>
      );
    case "checkout":
      return (
        <>
          <Bar w={0.8} h={0.06} x={0} y={0.2} color="#e8ecff" opacity={0.8} />
          <Bar w={0.8} h={0.07} x={0} y={0.05} color="#8a93b8" opacity={0.5} />
          <Bar w={0.8} h={0.14} x={0} y={-0.17} color={color} />
        </>
      );
  }
}

/** Four holographic "storefront UI" cards orbiting the bag. */
export function OrbitCards() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.18;
    const t = state.clock.elapsedTime;
    g.children.forEach((child, i) => {
      child.position.y = CARDS[i].y + Math.sin(t * 0.8 + i * 1.7) * 0.08;
    });
  });

  return (
    <group ref={group}>
      {CARDS.map((card) => (
        <group
          key={card.kind}
          position={[
            Math.cos(card.angle) * RADIUS,
            card.y,
            Math.sin(card.angle) * RADIUS,
          ]}
          rotation={[0, Math.PI / 2 - card.angle, 0]}
        >
          <mesh>
            <boxGeometry args={[1.2, 0.75, 0.03]} />
            <meshBasicMaterial color="#0b0e1f" transparent opacity={0.85} />
            <Edges color={card.color} />
          </mesh>
          <CardContent kind={card.kind} color={card.color} />
        </group>
      ))}
    </group>
  );
}
