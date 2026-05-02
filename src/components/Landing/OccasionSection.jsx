import React from "react";
import OccasionLeft from "./Occasion/OccasionLeft";
import OccasionRight from "./Occasion/OccasionRight";

function OccasionSection() {
  return (
    <section className="section-layout">
      <div className="grid-12">
        <OccasionLeft />
        <div className="col-span-1" />
        <OccasionRight />
      </div>
    </section>
  );
}

export default OccasionSection;
