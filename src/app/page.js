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
import Image from "next/image";
import { Globe, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const footer = {
    link: [
      {
        id: "address",
        icon: MapPin,
        label:
          "Jl. Bango Raya No.33, RT.7/RW.3, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450",
        link: "https://share.google/jQjvgb7nl6W5XEAvY",
      },
      {
        id: "telephone",
        icon: Phone,
        label: "+62 821 0896 2233",
        link: "wa.me/6282108962233",
      },
      {
        id: "website",
        icon: Globe,
        label: "www.bango-parc.vercel.app",
        link: "https://bango-parc.vercel.app/",
      },
    ],
    pages: [
      {
        label: "Beranda",
        href: "/",
      },
      {
        label: "Tentang Kami",
        href: "/about",
      },
      {
        label: "Paket & Venue",
        href: "/paket",
      },
      {
        label: "Gallery",
        href: "/galeri",
      },
    ],
    packages: [
      {
        id: "paket-1",
        link: "",
        label: "Semi-indoor & Outdoor",
      },
      {
        id: "paket-2",
        link: "",
        label: "Indoor",
      },
      {
        id: "paket-3",
        link: "",
        label: "Signature Package",
      },
      {
        id: "paket-4",
        link: "",
        label: "Heritage Package  ",
      },
      {
        id: "paket-5",
        link: "",
        label: "Intimate Deluxe",
      },
      {
        id: "paket-6",
        link: "",
        label: "Royal Excellence",
      },
    ],
  };
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
      <footer className="w-full bg-[#36210b] grid-12 px-8 py-10">
        <div className="col-span-3">
          <Image
            src={"/logo-full.png"}
            height={100}
            width={100}
            alt="logo-footer"
            className="mb-5"
          />
          <div className="flex flex-col gap-2">
            {/* {footer.} */}
            {footer.link.map(({ id, icon: Icon, label, link }) => (
              <div
                className={`flex flex-row ${id === "address" ? "items-start" : "items-center"}  gap-2`}
              >
                <Icon
                  className="shrink-0 text-white"
                  size={22}
                  strokeWidth={1.2}
                />
                <Link
                  href={link}
                  className="text-white text-sm font-light hover:underline underline-offset-2"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
          <div className=""></div>
        </div>
      </footer>
    </main>
  );
}
