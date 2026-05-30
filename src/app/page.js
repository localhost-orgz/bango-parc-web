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
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative w-full overflow-x-hidden">
      {/* hero section */}
      <section className="w-full h-screen relative flex justify-center items-center">
        <Image
          src="/hero.jpg"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
