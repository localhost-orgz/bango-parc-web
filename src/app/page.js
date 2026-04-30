"use client";

import HeroContent from "@/components/Landing/HeroContent";
import Navbar from "@/components/Landing/Navbar";
import { faq_list } from "@/constants/faq";
import { list_gallery } from "@/constants/gallery";
import { reviewsData } from "@/constants/reviewData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UpperAbout from "@/components/Landing/About/UpperAbout";
import BottomAbout from "@/components/Landing/About/BottomAbout";
import AreasHeadline from "@/components/Landing/Areas/AreasHeadline";
import AreasContent from "@/components/Landing/Areas/AreasContent";
import TestimonialHeadline from "@/components/Landing/Testimonials/TestimonialHeadline";
import TestimonialCards from "@/components/Landing/Testimonials/TestimonialCards";
import OccasionLeft from "@/components/Landing/Occasion/OccasionLeft";
import OccasionRight from "@/components/Landing/Occasion/OccasionRight";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <main className="min-h-screen relative w-full">
      {/* hero section */}
      <section className="w-full h-screen relative flex justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0F131F]/50" />

        {/* konten */}
        <Navbar />
        <HeroContent />
      </section>

      {/* about section */}
      <section className="section-layout">
        <UpperAbout />
        <BottomAbout />
      </section>

      {/* areas section */}
      <section className="section-layout">
        <AreasHeadline />
        <AreasContent />
      </section>

      {/* testimonials section */}
      <section className="section-layout bg-[#0F131F]">
        <TestimonialHeadline />

        {/* testimonial cards */}
        <TestimonialCards />
      </section>

      {/* occasion section */}
      <section className="section-layout">
        <div className="grid-12">
          <OccasionLeft />
          <div className="col-span-1" />
          <OccasionRight />
        </div>
      </section>

      {/* gallery section */}
      <section className="w-full px-8 py-16 bg-white">
        <h3 className="section-headline mb-10">Gallery</h3>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {list_gallery.map((img) => (
            <div key={img.id} className="break-inside-avoid mb-3">
              <img src={img.src} alt="foto" className="w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* faq section */}
      <section className="section-layout">
        <div className="grid-12">
          <div className="col-span-5 flex flex-col gap-3">
            <h3 className="section-headline">
              FAQ (Frequently Asked Questions)
            </h3>
            <p className="section-subheadline w-[80%]">
              Kami kumpulkan pertanyaan yang paling sering ditanyakan. Kalau
              belum terjawab, jangan ragu untuk langsung
              <a href="#" className="underline">
                {" "}
                menghubungi kami.
              </a>
            </p>
          </div>

          <div className="col-span-6 col-start-7">
            {faq_list.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="w-full h-130 relative">
        <div
          style={{ backgroundImage: "url(/cta.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/40 w-full h-full flex flex-col justify-center items-center">
          <span className="text-white font-crimson-text uppercase">
            Siap Memulai?
          </span>
          <h3 className="text-white font-crimson-text text-4xl mt-2">
            Momen impianmu dimulai dari satu langkah.
          </h3>
          <p className="text-white font-light">
            Cek ketersediaan tanggal dan amankan venue pilihanmu sekarang.
          </p>
          <div className="py-2 px-5 bg-white font-crimson-text text-lg mt-5">
            Cek Ketersediaan
          </div>
        </div>
      </section>

      <section className="section-layout">
        <div className="grid-12">
          <div className="col-span-2 flex flex-col gap-3">
            <h3 className="section-headline">Find Us!</h3>
            <p className="section-subheadline">
              Kunjungi Bango Parc dan lihat langsung bagaimana setiap sudut
              ruang kami bisa menjadi latar sempurna untuk acaramu.
            </p>
          </div>

          <div className="col-span-7 w-full">
            <iframe
              className="w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.669179388451!2d106.80400329999999!3d-6.3071217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef99bc243df9%3A0x2829114f0e30059f!2sBANGO%20PARC!5e0!3m2!1sid!2sid!4v1777508028731!5m2!1sid!2sid"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-span-3 w-full border h-50"></div>
        </div>
      </section>
    </main>
  );
}
function FAQItem({ faq, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b border-stone-200 group"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-6 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`tracking-wide font-crimson-text text-lg transition-colors duration-300 ${
            isOpen ? "text-stone-900" : "text-black"
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center text-stone-400 transition-all duration-300 ${
            isOpen ? "rotate-45" : "rotate-0 group-hover:text-stone-700"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={answerRef}
          className={`pb-5 text-sm text-stone-500 leading-relaxed pr-8 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
