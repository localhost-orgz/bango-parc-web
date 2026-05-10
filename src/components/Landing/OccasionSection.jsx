"use client";

import React, { useRef } from "react";
import OccasionLeft from "./Occasion/OccasionLeft";
import OccasionRight from "./Occasion/OccasionRight";

function OccasionSection() {
  const scrollRef = useRef(null);

  return (
    <section className="section-layout overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
        <OccasionLeft scrollRef={scrollRef} />

        <div className="lg:col-span-1 hidden lg:block" />

        <OccasionRight scrollRef={scrollRef} />
      </div>
    </section>
  );
}

export default OccasionSection;
