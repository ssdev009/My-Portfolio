"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import type { Theme } from "@/components/layout/ThemeProvider";
import type { Tier } from "./useDeviceTier";
import { NeonBag } from "./NeonBag";
import { OrbitCards } from "./OrbitCards";
import { Particles } from "./Particles";
import { GridFloor } from "./GridFloor";

interface Quality {
  dpr: [number, number];
  particles: number;
  bloom: boolean;
  bloomIntensity: number;
  msaa: number;
}

const QUALITY: Record<Tier, Quality> = {
  high: { dpr: [1, 1.5], particles: 700, bloom: true, bloomIntensity: 1.5, msaa: 4 },
  mid: { dpr: [1, 1.25], particles: 320, bloom: true, bloomIntensity: 1.0, msaa: 0 },
  low: { dpr: [1, 1], particles: 140, bloom: false, bloomIntensity: 0, msaa: 0 },
};

/** Scene colors per theme. Dark = glowing neon; light = crisp, darker accents with no bloom. */
const SCENE: Record<
  Theme,
  { bg: string; a: string; b: string; additive: boolean; bloom: boolean; gridBoost: number; gridAlpha: number }
> = {
  dark: { bg: "#05060f", a: "#00f0ff", b: "#ff2bd6", additive: true, bloom: true, gridBoost: 1.4, gridAlpha: 0.85 },
  light: { bg: "#f4f6ff", a: "#0e7490", b: "#a21caf", additive: false, bloom: false, gridBoost: 1.0, gridAlpha: 0.7 },
};

interface Props {
  tier: Tier;
  theme: Theme;
  coarse: boolean;
  inView: boolean;
  /** Element that receives pointer events (the whole hero), so parallax works anywhere */
  eventSource: React.RefObject<HTMLElement | null>;
}

/** Positions the hero objects and adds pointer parallax (or auto-sway on touch). */
function Rig({ coarse, children }: { coarse: boolean; children: React.ReactNode }) {
  const inner = useRef<THREE.Group>(null);
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  const wide = size.width / size.height > 1.25;
  const offsetX = wide ? viewport.width * 0.2 : 0;
  const scale = wide ? 1 : 0.8;

  useFrame((state) => {
    const g = inner.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const px = THREE.MathUtils.clamp(state.pointer.x, -1, 1);
    const py = THREE.MathUtils.clamp(state.pointer.y, -1, 1);

    const targetY = coarse ? Math.sin(t * 0.4) * 0.12 : px * 0.25;
    const targetX = coarse ? Math.cos(t * 0.35) * 0.06 : -py * 0.12;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.05);

    const camTargetX = coarse ? 0 : px * 0.4;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      camTargetX,
      0.03
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group position={[offsetX, 0, 0]} scale={scale}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

/** Glowing pedestal rings under the bag. */
function Rings({ a, b }: { a: string; b: string }) {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={-1.55}>
        <ringGeometry args={[1.25, 1.3, 64]} />
        <meshBasicMaterial color={a} toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-1.55}>
        <ringGeometry args={[2.0, 2.03, 64]} />
        <meshBasicMaterial color={b} toneMapped={false} transparent opacity={0.5} />
      </mesh>
    </>
  );
}

export default function HeroCanvas({ tier, theme, coarse, inView, eventSource }: Props) {
  const q = QUALITY[tier];
  const t = SCENE[theme];
  const useBloom = q.bloom && t.bloom;

  return (
    <Canvas
      frameloop={inView ? "always" : "never"}
      dpr={q.dpr}
      camera={{ position: [0, 0.6, 7], fov: 45 }}
      gl={{ antialias: !useBloom, alpha: false, powerPreference: "high-performance" }}
      flat
      eventSource={eventSource as React.RefObject<HTMLElement>}
      eventPrefix="client"
    >
      <color key={`bg-${theme}`} attach="background" args={[t.bg]} />
      <fog key={`fog-${theme}`} attach="fog" args={[t.bg, 9, 24]} />

      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 3]} color="#00f0ff" intensity={45} />
      <pointLight position={[-3, 1, 2]} color="#ff2bd6" intensity={45} />

      <Rig coarse={coarse}>
        <NeonBag />
        <OrbitCards />
        <Rings a={t.a} b={t.b} />
      </Rig>

      <Particles count={q.particles} colorA={t.a} colorB={t.b} additive={t.additive} />
      <GridFloor colorA={t.a} colorB={t.b} boost={t.gridBoost} alpha={t.gridAlpha} />

      {useBloom && (
        <EffectComposer multisampling={q.msaa}>
          <Bloom
            intensity={q.bloomIntensity}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
