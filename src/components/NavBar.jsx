import { useEffect, useState } from "react";
import { navLinks } from "../constants";

// Debounce function to limit scroll event handler
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Create an event listener for when the user scrolls
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // Debounced scroll handler to limit the frequency of state updates
    const debouncedHandleScroll = debounce(handleScroll, 100);

    // Add the event listener to the window
    window.addEventListener("scroll", debouncedHandleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo">
          Anshul Kumar
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
