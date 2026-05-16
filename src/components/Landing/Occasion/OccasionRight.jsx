"use client";

import React from "react";

function OccasionRight({ scrollRef }) {
  const occasion_list = [
    {
      id: 1,
      src: "/famget.jpg",
      label: "Family Gathering",
    },
    {
      id: 2,
      src: "/yoga.jpg",
      label: "Yoga",
    },
    {
      id: 3,
      src: "/wedding.jpg",
      label: "Wedding",
    },
    {
      id: 4,
      src: "/famget.jpg",
      label: "Birthday",
    },
  ];

  return (
    <div className="lg:col-span-6 col-span-12 overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {occasion_list.map((occ) => (
          <div
            key={occ.id}
            className="relative min-w-65 sm:min-w-[320px] lg:min-w-70 aspect-9/16 shrink-0 bg-black"
          >
            <div
              style={{ backgroundImage: `url(${occ.src})` }}
              className="absolute inset-0 bg-cover bg-center"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end py-5 px-4">
              <span className="font-crimson-text text-white text-2xl">
                {occ.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OccasionRight;
