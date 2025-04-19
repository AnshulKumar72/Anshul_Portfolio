/**
 * A reusable CTA button component.
 * Smoothly scrolls to the "counter" section with an offset.
 */
const Button = ({ text, className = "", id }) => {
  const handleClick = (e) => {
    e.preventDefault();

    if (!id) return; // Skip if ID is not passed

    const target = document.getElementById("counter");
    if (!target) return;

    const offset = window.innerHeight * 0.15;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    // Smooth scroll using native API
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <a onClick={handleClick} className={`cta-wrapper ${className}`}>
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" loading="lazy" />
        </div>
      </div>
    </a>
  );
};

export default Button;
