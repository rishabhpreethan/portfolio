// ZoomEffect.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

const Particles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000; // Number of particles
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3); // To store the velocities for each particle

  for (let i = 0; i < particleCount; i++) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const distance = 500 * Math.random();

    positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = distance * Math.cos(phi);

    velocities[i * 3] = -positions[i * 3] / 100;
    velocities[i * 3 + 1] = -positions[i * 3 + 1] / 100;
    velocities[i * 3 + 2] = -positions[i * 3 + 2] / 100;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

  useFrame(() => {
    const positions = particles.attributes.position.array as Float32Array;
    const velocities = particles.attributes.velocity.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];
    }

    particles.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={particles}>
      <pointsMaterial size={2} color="#000000" />
    </points>
  );
};

const ZoomEffect: React.FC = () => {
  return (
    <Canvas style={{ background: '#FFFFFF' }}>
      <ambientLight />
      <Particles />
    </Canvas>
  );
};

export default ZoomEffect;
