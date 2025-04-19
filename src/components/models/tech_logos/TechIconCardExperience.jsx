import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  const updatedScene = useMemo(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }
    return scene.scene;
  }, [scene, model.name]);

  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <Environment preset="city" background={false} />

      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation} dispose={null}>
          <primitive object={updatedScene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
