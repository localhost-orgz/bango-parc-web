import React from "react";
import TestimonialHeadline from "./Testimonials/TestimonialHeadline";
import TestimonialCards from "./Testimonials/TestimonialCards";

function TestimonialsSection() {
  return (
    <section className="section-layout bg-[#0F131F]">
      <TestimonialHeadline />

      {/* testimonial cards */}
      <TestimonialCards />
    </section>
  );
}

export default TestimonialsSection;
