import React, { useMemo } from "react";
import GlowCard from "../components/GlowCard";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";

const Testimonials = () => {
  // Memoize testimonials to prevent unnecessary re-renders
  const testimonialCards = useMemo(
    () =>
      testimonials.map((testimonial, index) => (
        <GlowCard card={testimonial} key={testimonial.id || index}>
          <div className="flex items-center gap-3">
            <div>
              {/* Lazy load images */}
              <img src={testimonial.imgPath} alt={testimonial.name} loading="lazy" />
            </div>
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-white-50">{testimonial.mentions}</p>
            </div>
          </div>
        </GlowCard>
      )),
    [testimonials]
  );

  return (
    <section id="testimonials" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐️ Customer feedback highlights"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonialCards}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
