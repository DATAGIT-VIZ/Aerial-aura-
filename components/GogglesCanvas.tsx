'use client';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

interface SP { scrollProg: { value: number } }

const clamp01  = (t: number) => Math.max(0, Math.min(1, t));
const lerp     = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOut5 = (t: number) => 1 - Math.pow(1 - t, 5);
const easeIn4  = (t: number) => t * t * t * t;

useGLTF.preload('/models/scene.gltf');

function GogglesModel({ scrollProg }: SP) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/scene.gltf');
  const { camera } = useThree();

  useEffect(() => {
    // Build a single shared material so every mesh gets identical PBR values
    const djiMat = new THREE.MeshStandardMaterial({
      color: '#1F2226',      // neutral dark charcoal — no blue tint
      roughness: 0.68,
      metalness: 0.04,
      envMapIntensity: 0.50,
    });
    // Copy the normal map from the first mesh that has one
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh || djiMat.normalMap) return;
      const src = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
      if (src instanceof THREE.MeshStandardMaterial && src.normalMap) {
        djiMat.normalMap = src.normalMap;
        djiMat.normalScale.set(0.38, 0.38);
      }
    });
    // Replace every mesh's material — catches all material types including white ones
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.material = djiMat;
    });
  }, [scene]);

  useFrame(() => {
    const p = scrollProg.value;
    const g = group.current;
    if (!g) return;

    // Phase 1 (0–42 %): 3/4 angle → face-on
    const rotT = clamp01(p / 0.42);
    g.rotation.x = lerp(-0.18, 0, easeOut5(rotT));
    g.rotation.y = lerp(-0.42, 0, easeOut5(rotT));
    g.rotation.z = lerp(0.03,  0, easeOut3(rotT));

    // Phase 2 (42–80 %): camera rushes through the lenses into POV
    const zoomT = clamp01((p - 0.42) / 0.38);
    (camera as THREE.PerspectiveCamera).position.z = lerp(5.5, -0.4, easeIn4(zoomT));
  });

  return (
    <group ref={group} scale={[2.2, 2.2, 2.2]}>
      <primitive object={scene} position={[0, -0.42, -0.56]} />
    </group>
  );
}

function Scene({ scrollProg }: SP) {
  return (
    <>
      <color attach="background" args={['#0B0D10']} />

      {/* Clean studio rig — matches DJI product photography style */}
      <ambientLight intensity={0.18} />
      {/* Key: front-left, slightly above — illuminates the face evenly, satin sheen on dome */}
      <directionalLight position={[-2, 4, 9]}  intensity={2.2}  color="#ffffff" />
      {/* Fill: front-right, very soft — just barely lifts the shadow side */}
      <directionalLight position={[4, 1, 6]}   intensity={0.28} color="#e8e8e8" />
      {/* Ground bounce: keeps underside from going pure black */}
      <pointLight       position={[0, -4, 3]}  intensity={0.40} color="#ded8d0" />
      {/* Rear rim: thin edge separation */}
      <directionalLight position={[0, 2, -8]}  intensity={0.30} color="#d0d0d0" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <GogglesModel scrollProg={scrollProg} />
        <EffectComposer>
          <Vignette eskil={false} offset={0.16} darkness={0.78} />
        </EffectComposer>
      </Suspense>
    </>
  );
}

export default function GogglesCanvas({ scrollProg }: SP) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42, near: 0.05, far: 50 }}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.88,
      }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene scrollProg={scrollProg} />
    </Canvas>
  );
}
