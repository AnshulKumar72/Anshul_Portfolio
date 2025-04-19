import { useCallback, useRef } from "react";

// Throttle function to limit how often the mousemove handler runs
const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
};

const GlowCard = ({ card, index, children }) => {
  const cardRefs = useRef([]);

  // Create mouse move event handler with throttle to improve performance
  const handleMouseMove = useCallback(
    throttle((e) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      // Using CSS variables directly for smoother rendering
      card.style.setProperty("--start", angle + 60);
    }, 16), // Throttling to ~60 FPS (16ms interval)
    [index]
  );

  return (
    <div
      ref={(el) => (cardRefs.current[index] = el)}
      onMouseMove={handleMouseMove}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      <div className="glow"></div>
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src="/images/star.png" alt="star" className="size-5" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
