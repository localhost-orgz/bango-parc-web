import React from "react";
import TestimonialCard from "./TestimonialCard";
import { reviewsData } from "@/constants/reviewData";

function TestimonialCards() {
  return (
    <div className="grid-12 mt-10">
      {reviewsData.map((testi, i) => (
        <TestimonialCard key={i} testi={testi} />
      ))}
    </div>
  );
}

export default TestimonialCards;
