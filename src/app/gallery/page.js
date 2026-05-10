"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Navbar from "@/components/Landing/Navbar";

// ─── Gallery Data ─────────────────────────────────────────────────────────────
// Each image has a category tag and a span hint for masonry layout variety.
// "tall" = taller card, "wide" = wider card, "square" = balanced

const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop",
    alt: "Wedding reception with elegant lighting",
    tag: "Wedding",
    span: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=900&auto=format&fit=crop",
    alt: "Outdoor wedding ceremony setup",
    tag: "Wedding",
    span: "square",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1621112904887-419379ce6824?w=900&auto=format&fit=crop",
    alt: "Floral decoration arrangement",
    tag: "Dekorasi",
    span: "tall",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&auto=format&fit=crop",
    alt: "Elegant venue interior",
    tag: "Venue",
    span: "square",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=900&auto=format&fit=crop",
    alt: "Wedding bouquet close-up",
    tag: "Wedding",
    span: "square",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&auto=format&fit=crop",
    alt: "Catering and table setting",
    tag: "Katering",
    span: "tall",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1651077837628-52b3247550ae?w=900&auto=format&fit=crop",
    alt: "Party balloons and festive decor",
    tag: "Dekorasi",
    span: "square",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1607081451974-c197a2b3725e?w=900&auto=format&fit=crop",
    alt: "Outdoor dining setup at dusk",
    tag: "Venue",
    span: "tall",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=900&auto=format&fit=crop",
    alt: "Garden party under string lights",
    tag: "Acara",
    span: "square",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1680543254043-477fb4dc4677?w=900&auto=format&fit=crop",
    alt: "Elegant table arrangement",
    tag: "Katering",
    span: "square",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1627273738352-fe5f6cc48612?w=900&auto=format&fit=crop",
    alt: "Semi-indoor event space",
    tag: "Venue",
    span: "tall",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1696454411278-a64de1369e83?w=900&auto=format&fit=crop",
    alt: "Outdoor venue at golden hour",
    tag: "Venue",
    span: "square",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=900&auto=format&fit=crop",
    alt: "Night event with ambient lighting",
    tag: "Acara",
    span: "square",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop",
    alt: "Bride and groom first dance",
    tag: "Wedding",
    span: "tall",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop",
    alt: "Guests celebrating at reception",
    tag: "Acara",
    span: "square",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1464347744102-11db6282f854?w=900&auto=format&fit=crop",
    alt: "Wedding arch with florals",
    tag: "Dekorasi",
    span: "square",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop",
    alt: "Cozy indoor gathering space",
    tag: "Venue",
    span: "tall",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop",
    alt: "Beautiful venue landscape",
    tag: "Venue",
    span: "square",
  },
];

const TAGS = ["Semua", "Wedding", "Venue", "Dekorasi", "Katering", "Acara"];

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function Lightbox({ items, activeIndex, onClose, onPrev, onNext }) {
  const item = items[activeIndex];

  // Keyboard navigation
  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        aria-label="Tutup"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 z-10">
        <span className="text-white/50 text-xs font-medium tracking-widest">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      {/* Tag badge */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50 border border-white/15 px-3 py-1">
          {item.tag}
        </span>
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 z-10 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        aria-label="Sebelumnya"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 z-10 w-11 h-11 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
        aria-label="Berikutnya"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl w-full mx-16 max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={item.id}
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-contain max-h-[85vh] select-none"
          draggable={false}
        />
        {/* Caption */}
        <div className="mt-3 text-center">
          <p className="text-white/40 text-xs tracking-wide">{item.alt}</p>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto pb-1 px-2">
        {items.map((img, i) => (
          <button
            key={img.id}
            onClick={(e) => {
              e.stopPropagation();
              // navigate to this thumbnail (handled via parent)
            }}
            className={`w-12 h-8 shrink-0 bg-cover bg-center transition-all duration-150 ${
              i === activeIndex
                ? "opacity-100 ring-1 ring-[#896d51]"
                : "opacity-30 hover:opacity-60"
            }`}
            style={{ backgroundImage: `url(${img.src})` }}
            aria-label={img.alt}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered =
    activeTag === "Semua"
      ? galleryItems
      : galleryItems.filter((img) => img.tag === activeTag);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  return (
    <main className="min-h-screen w-full bg-[#faf8f5]">
      <Navbar />

      {/* ── Hero Header ── */}
      <header className="h-72 w-full relative flex flex-col justify-center items-center">
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop)",
          }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#0F131F]/55" />
        <div className="z-10 flex flex-col items-center gap-3 px-4 text-center">
          <span className="text-[#896d51] text-xs font-semibold uppercase tracking-[0.3em]">
            Galeri
          </span>
          <h1 className="font-crimson-pro text-white text-5xl md:text-6xl">
            Momen Berharga
          </h1>
          <p className="text-white/50 text-sm max-w-md leading-relaxed">
            Setiap foto menyimpan cerita. Lihat bagaimana Bango Parc menjadi
            latar dari momen-momen tak terlupakan.
          </p>
        </div>
      </header>

      {/* ── Filter Tabs ── */}
      <section className="sticky top-0 z-30 bg-[#faf8f5] border-b border-[#896d51]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setLightboxIndex(null);
              }}
              className={`shrink-0 px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors ${
                activeTag === tag
                  ? "bg-[#0F131F] text-white border-[#0F131F]"
                  : "bg-white text-black/50 border-[#0F131F]/15 hover:border-[#0F131F]/40 hover:text-[#0F131F]"
              }`}
            >
              {tag}
            </button>
          ))}
          <span className="ml-auto shrink-0 text-xs text-black/30 whitespace-nowrap pl-4">
            {filtered.length} foto
          </span>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-black/30 text-sm">
              Tidak ada foto dalam kategori ini.
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className={`break-inside-avoid relative group overflow-hidden cursor-pointer bg-[#e8e3dc] ${
                  img.span === "tall" ? "mb-3" : "mb-3"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    img.span === "tall"
                      ? "aspect-3/4"
                      : img.span === "wide"
                        ? "aspect-4/3"
                        : "aspect-square"
                  }`}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0F131F]/0 group-hover:bg-[#0F131F]/40 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                  <ZoomIn
                    size={22}
                    strokeWidth={1.5}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0"
                  />
                  <span className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {img.tag}
                  </span>
                </div>

                {/* Tag corner badge — visible without hover on mobile */}
                <div className="absolute top-2 left-2 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-[#0F131F]/70 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5">
                    {img.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="w-full py-20 relative flex flex-col items-center justify-center text-center">
        <div
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=1400&auto=format&fit=crop)",
          }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#0F131F]/65" />
        <div className="z-10 flex flex-col items-center gap-4 px-6">
          <span className="text-[#896d51] text-xs font-semibold uppercase tracking-[0.3em]">
            Jadikan Bagian dari Galeri Kami
          </span>
          <h2 className="font-crimson-pro text-white text-4xl max-w-xl leading-tight">
            Rencanakan momen tak terlupakan bersama Bango Parc
          </h2>
          <p className="text-white/50 text-sm max-w-md">
            Dari wedding hingga gathering — setiap acara di sini selalu menjadi
            kenangan yang indah.
          </p>
          <a
            href="/paket"
            className="mt-2 flex items-center gap-2 border border-white/30 hover:border-white text-white text-sm py-3 px-6 transition-colors hover:bg-white/5"
          >
            Lihat Paket & Venue
          </a>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </main>
  );
}
