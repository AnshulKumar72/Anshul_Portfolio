import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo } from "react";

import GlowCard from "../components/GlowCard";
import TitleHeader from "../components/TitleHeader";
import { expCards } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  // Using useMemo to avoid re-creating animations on each render
  useGSAP(() => {
    const timelineCards = gsap.utils.toArray(".timeline-card");
    const expTexts = gsap.utils.toArray(".expText");

    // Set up GSAP scroll-triggered animations only once
    timelineCards.forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none", // Optimize trigger actions
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        scrub: 1, // smooth scroll behavior
        onUpdate: (self) => {
          gsap.to(".timeline", { scaleY: 1 - self.progress });
        },
      },
    });

    expTexts.forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: -100,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
          toggleActions: "play none none none", // Optimize trigger actions
        },
      });
    });
  }, []); // Only run once on mount

  // Memoize the cards rendering to avoid unnecessary re-renders
  const renderedCards = useMemo(() => {
    return expCards.map((card) => (
      <div key={card.title} className="exp-card-wrapper">
        <div className="xl:w-2/6">
          <GlowCard card={card}>
            <div>
              <img src={card.imgPath} alt="exp-img" />
            </div>
          </GlowCard>
        </div>
        <div className="xl:w-4/6">
          <div className="flex items-start">
            <div className="timeline-wrapper">
              <div className="timeline" />
              <div className="gradient-line w-1 h-full" />
            </div>
            <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
              <div className="timeline-logo">
                <img src={card.logoPath} alt="logo" />
              </div>
              <div>
                <h1 className="font-semibold text-3xl">{card.title}</h1>
                <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                <p className="text-[#839CB5] italic">Responsibilities</p>
                <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                  {card.responsibilities.map((responsibility, index) => (
                    <li key={index} className="text-lg">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [expCards]); // Memoize to prevent unnecessary re-render

  return (
    <section id="experience" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader title="Professional Work Experience" sub="💼 Educational Overview" />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {renderedCards} {/* Use memoized rendered cards */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
