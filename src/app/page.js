"use client";

import HeroContent from "@/components/Landing/HeroContent";
import Navbar from "@/components/Landing/Navbar";
import CtaSection from "@/components/Landing/CtaSection";
import FindUsSection from "@/components/Landing/FindUsSection";
import GallerySection from "@/components/Landing/GallerySection";
import FaqSection from "@/components/Landing/FaqSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import AreasSection from "@/components/Landing/AreasSection";
import AboutSection from "@/components/Landing/AboutSection";
import OccasionSection from "@/components/Landing/OccasionSection";

export default function Home() {
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
      <AboutSection />
      <AreasSection />
      <TestimonialsSection />
      <OccasionSection />
      <GallerySection />
      <FaqSection />
      <CtaSection />
      <FindUsSection />
    </main>
  );
}
