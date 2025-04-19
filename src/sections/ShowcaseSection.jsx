import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  // Optimizing GSAP animations by batching them
  const animateSection = useCallback(() => {
    // Main section animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Create a timeline for each project animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100", // trigger when the section reaches 100px from bottom
      },
    });

    // Animate each card with stagger
    tl.fromTo(
      [rydeRef.current, libraryRef.current, ycDirectoryRef.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3 }
    );
  }, []);

  // Trigger the animation when the component mounts
  useGSAP(animateSection, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/bookstore.jpg" alt="Book Store Interface" loading="lazy" />
            </div>
            <div className="text-content">
              <h2>
                On-Demand book store Made Simple with a Powerful, User-Friendly web
                called bibliophiles.
              </h2>
              <button type="button">
                <div className="cta-button group hover:bg-gray-400 text-black">
                  <a href="https://keen-douhua-81d574.netlify.app/">View Project</a>
                </div>
              </button>
              <p className="text-white-50 md:text-xl">
                An app built with React Js, Express, Node, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/jobPortal.png"
                  alt="Online Job Portal"
                  loading="lazy"
                />
              </div>
              <h2>Online Job Platform</h2>
              <button type="button">
                <div className="cta-button group hover:bg-gray-400 text-black">
                  <a href="https://keen-douhua-81d574.netlify.app/">View Project</a>
                </div>
              </button>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img
                  src="/images/project3.png"
                  alt="AI project"
                  loading="lazy"
                />
              </div>
              <h2>AI app</h2>
              <button type="button">
                <div className="cta-button group hover:bg-gray-400 text-black">
                  <a href="https://keen-douhua-81d574.netlify.app/">View Project</a>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
