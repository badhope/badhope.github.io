'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import styles from './ThreeScene.module.css';

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
    >
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={hovered ? '#00d4ff' : '#bf5af2'}
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[
            Math.sin(i * Math.PI * 0.25) * 2.5,
            Math.cos(i * Math.PI * 0.25) * 2.5,
            Math.sin(i * 0.5) * 1.5
          ]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00d4ff' : '#bf5af2'} transparent opacity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#bf5af2" wireframe />
    </mesh>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {!isLoaded && (
        <div className={styles.loader}>
          <div className={styles.loaderSpinner} />
          <span>Loading 3D Scene...</span>
        </div>
      )}

      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => setIsLoaded(true)}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#bf5af2" intensity={0.5} />

        <Suspense fallback={<LoadingFallback />}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <AnimatedMesh />
          </Float>
          <FloatingOrbs />
          <Environment preset="night" />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className={styles.hint}>
        <span>拖动旋转</span>
      </div>
    </div>
  );
}
