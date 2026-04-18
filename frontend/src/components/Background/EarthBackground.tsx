import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Texturas de alta calidad
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = useMemo(() => textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'), []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = elapsedTime * 0.06;
    }
  });

  return (
    <group scale={1.2}>
      {/* Tierra */}
      <Sphere ref={earthRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>

      {/* Atmósfera / Brillo */}
      <Sphere ref={atmosphereRef} args={[1.05, 64, 64]}>
        <meshStandardMaterial
          color="#00a8ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#00d4aa" />
    </group>
  );
};

export const EarthBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0c0c0c] overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <color attach="background" args={['#0c0c0c']} />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <Float 
          speed={1.5} 
          rotationIntensity={0.5} 
          floatIntensity={0.5}
        >
          <Earth />
        </Float>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
};
