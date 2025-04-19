import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = ({ count = 200 }) => {
  const mesh = useRef();

  // Use a single Float32Array for positions and a separate array for speeds
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10 + 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.005 + Math.random() * 0.001;
    }
    return { positions, speeds };
  }, [count]);

  // Only update Y position each frame
  useFrame(() => {
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i];
      if (pos[i * 3 + 1] < -2) {
        pos[i * 3 + 1] = Math.random() * 10 + 5;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
          usage={THREE.DynamicDrawUsage} // Hint to the GPU this updates often
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
