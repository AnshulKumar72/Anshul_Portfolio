import React, { useMemo } from "react";
import { abilities } from "../constants";

const FeatureCards = React.memo(() => {
  // Memoize the rendering of abilities cards to prevent unnecessary re-renders
  const renderedAbilities = useMemo(() => {
    return abilities.map(({ imgPath, title, desc }) => (
      <div
        key={title}
        className="card-border rounded-xl p-8 flex flex-col gap-4"
      >
        <div className="size-14 flex items-center justify-center rounded-full">
          {/* Add lazy loading to images for better performance */}
          <img src={imgPath} alt={title} loading="lazy" />
        </div>
        <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
        <p className="text-white-50 text-lg">{desc}</p>
      </div>
    ));
  }, []); // Only re-run the map if `abilities` changes

  return (
    <div className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols">
        {renderedAbilities}
      </div>
    </div>
  );
});

export default FeatureCards;
