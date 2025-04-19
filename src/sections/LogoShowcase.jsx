import { memo } from "react";
import { logoIconsList } from "../constants";

// Memoize LogoIcon to prevent unnecessary re-renders
const LogoIcon = memo(({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
});

const LogoShowcase = () => {
  // Combine the logo list into one array for the marquee effect
  const logosToDisplay = [...logoIconsList, ...logoIconsList];

  return (
    <div className="md:my-20 my-10 relative">
      <div className="gradient-edge" />
      <div className="gradient-edge" />

      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {/* Map over the combined logo list */}
          {logosToDisplay.map((icon, index) => (
            <LogoIcon key={icon.name + index} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
