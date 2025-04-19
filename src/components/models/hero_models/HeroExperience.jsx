import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Room } from "./Room";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // Memoize camera settings to prevent re-creation on every render
  const cameraSettings = useMemo(() => ({
    position: [0, 0, 15],
    fov: 45,
  }), []);

  // Memoized OrbitControls config
  const controlsConfig = useMemo(() => ({
    enablePan: false,
    enableZoom: !isTablet,
    maxDistance: 20,
    minDistance: 5,
    minPolarAngle: Math.PI / 5,
    maxPolarAngle: Math.PI / 2,
  }), [isTablet]);

  return (
    <Canvas
      shadows
      camera={cameraSettings}
      gl={{ powerPreference: "high-performance" }}
      frameloop="demand" // Improves performance for mostly static scenes
    >
      <ambientLight intensity={0.2} color="#1a1a40" />

      <OrbitControls {...controlsConfig} />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
