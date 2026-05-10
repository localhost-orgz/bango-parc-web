"use client";

import React from "react";
import TestimonialCard from "./TestimonialCard";
import { reviewsData } from "@/constants/reviewData";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function TestimonialCards() {
  return (
    <div className="mt-10">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.15}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {reviewsData.map((testi, i) => (
          <SwiperSlide key={i}>
            <TestimonialCard testi={testi} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TestimonialCards;
