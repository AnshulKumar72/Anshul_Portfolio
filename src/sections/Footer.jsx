import React, { useMemo } from "react";
import { socialImgs } from "../constants";

const Footer = React.memo(() => {
  // Memoize the rendering of social icons to avoid unnecessary recalculation
  const socialIcons = useMemo(() => {
    return socialImgs.map((socialImg, index) => (
      <div key={index} className="icon">
        <img src={socialImg.imgPath} alt="social icon" loading="lazy" />
      </div>
    ));
  }, [socialImgs]); // Only re-run if `socialImgs` changes

  // Memoize the current year to prevent recalculating it on every render
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialIcons}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {currentYear} Anshul Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
