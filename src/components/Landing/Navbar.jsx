"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto h-20 flex items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href={"/"} className="relative z-50">
          <Image
            src={scrolled ? "/logo-full-black.png" : "/logo-full.png"}
            alt="logo"
            width={90}
            height={90}
            className="w-[72px] sm:w-[85px] h-auto transition-all duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-10 text-[15px] tracking-wide font-light transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          <li>
            <Link
              href={"/"}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              Beranda
            </Link>
          </li>

          <li>
            <Link
              href={"/about"}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              Tentang
            </Link>
          </li>

          <li>
            <Link
              href={"/paket"}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              Paket & Venue
            </Link>
          </li>

          <li>
            <Link
              href={"/gallery"}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              Galeri
            </Link>
          </li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center">
          <button
            className={`px-5 py-2.5 border text-sm tracking-wide transition-all duration-300 ${
              scrolled
                ? "bg-black text-white border-black hover:bg-neutral-800"
                : "bg-white/10 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-black"
            }`}
          >
            <span className="font-crimson-pro">Login</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden relative z-50 transition-colors duration-300 ${
            scrolled || open ? "text-black" : "text-white"
          }`}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 md:hidden transition-all duration-500 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center gap-8 text-black">
            <Link
              href={"/"}
              onClick={() => setOpen(false)}
              className="text-2xl font-light tracking-wide"
            >
              Beranda
            </Link>

            <Link
              href={"/about"}
              onClick={() => setOpen(false)}
              className="text-2xl font-light tracking-wide"
            >
              Tentang
            </Link>

            <Link
              href={"/paket"}
              onClick={() => setOpen(false)}
              className="text-2xl font-light tracking-wide"
            >
              Paket & Venue
            </Link>

            <Link
              href={"/gallery"}
              onClick={() => setOpen(false)}
              className="text-2xl font-light tracking-wide"
            >
              Galeri
            </Link>

            <button className="mt-4 border border-black px-6 py-3 text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300">
              Login
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
