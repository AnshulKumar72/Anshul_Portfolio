import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/bookstore.jpg" alt="Book Store Interface" />
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
                <img src="/images/project3.png" alt="AI project" />
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
