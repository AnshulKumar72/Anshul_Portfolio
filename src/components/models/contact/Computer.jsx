import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function Computer(props) {
  const { nodes, materials } = useGLTF("/models/computer-optimized-transformed.glb");

  // Memoize the meshes to avoid unnecessary re-renders
  const deskMesh = useMemo(() => (
    <group position={[-4.005, 67.549, 58.539]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
        material={materials["ComputerDesk.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
        material={materials["FloppyDisk.001"]}
      />
    </group>
  ), [nodes, materials]);

  return (
    <group {...props} dispose={null}>
      {deskMesh}
    </group>
  );
}

// Preload the model outside the component scope
useGLTF.preload("/models/computer-optimized-transformed.glb");

export default Computer;
