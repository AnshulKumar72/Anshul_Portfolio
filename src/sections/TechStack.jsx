import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo } from "react";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechStack = () => {
  // Using useMemo to avoid recalculating tech stack items on each render
  const techCards = useMemo(() => {
    return techStackIcons.map((techStackIcon) => (
      <div
        key={techStackIcon.name}
        className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
      >
        <div className="tech-card-animated-bg" />
        <div className="tech-card-content">
          <div className="tech-icon-wrapper">
            <TechIconCardExperience model={techStackIcon} />
          </div>
          <div className="padding-x w-full">
            <p>{techStackIcon.name}</p>
          </div>
        </div>
      </div>
    ));
  }, [techStackIcons]);

  // Animate the tech cards in the skills section only on the initial render
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50, // Initial values
        opacity: 0,
      },
      {
        y: 0, // Final values
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center", // When the section's top hits the center of the screen
        },
      }
    );
  }, []);

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Technical Skills" sub="🤝 What I Bring to the Table" />
        <div className="tech-grid">
          {techCards}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
