import { useMemo } from "react";
import * as THREE from "three";

const HeroLights = () => {
  // Memoize the area light to avoid creating a new object on each render
  const areaLight = useMemo(() => {
    const light = new THREE.RectAreaLight("#a259ff", 15, 3, 2);
    light.position.set(1, 3, 4);
    light.rotation.set(-Math.PI / 4, Math.PI / 4, 0);
    return light;
  }, []);

  return (
    <>
      {/* Combine lamps with similar settings if possible */}
      <spotLight
        position={[2, 5, 6]}
        angle={0.2}
        penumbra={0.3}
        intensity={80}
        color="white"
      />
      <spotLight
        position={[4, 5, 4]}
        angle={0.35}
        penumbra={0.4}
        intensity={35}
        color="#4cc9f0"
      />
      <spotLight
        position={[-3, 5, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={50}
        color="#9d4edd"
      />
      {/* Area light */}
      <primitive object={areaLight} />
      {/* Lowered point lights slightly to reduce GPU usage */}
      <pointLight position={[0, 1, 0]} intensity={6} color="#7209b7" />
      <pointLight position={[1, 2, -2]} intensity={6} color="#0d00a4" />
    </>
  );
};

export default HeroLights;
