import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((el, index) => {
      const item = counterItems[index];

      // Animate innerText directly via GSAP
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: item.value,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: "#counter",
            start: "top center",
            once: true,
          },
          onUpdate: function () {
            el.textContent = `${Math.floor(this.targets()[0].innerText)}${item.suffix}`;
          },
        }
      );
    });
  }, { scope: counterRef, revertOnUpdate: true });

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
          >
            <div
              ref={(el) => el && (countersRef.current[index] = el)}
              className="counter-number text-white-50 text-5xl font-bold mb-2"
            >
              0{item.suffix}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
