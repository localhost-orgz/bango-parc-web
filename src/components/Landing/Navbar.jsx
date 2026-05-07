"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full h-20 fixed top-0 left-0 flex items-center z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="w-full flex flex-row justify-between items-center px-10">
        <Image
          src={`${scrolled ? "/logo-full-black.png" : "/logo-full.png"}`}
          alt="logo"
          width={85}
          height={85}
        />
        <ul
          className={`flex flex-row gap-10 font-light text-md transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          <li>
            <Link href={"#"}>Beranda</Link>
          </li>
          <li>
            <Link href={"#"}>Tentang</Link>
          </li>
          <li>
            <Link href={"#"}>Akomodasi</Link>
          </li>
          <li>
            <Link href={"#"}>Galeri</Link>
          </li>
        </ul>
        <div
          className={`py-2 px-3 border transition-all duration-300 ${
            scrolled ? "bg-black border-black" : "bg-white border-white"
          }`}
        >
          <span
            className={`font-crimson-pro transition-colors duration-300 ${
              scrolled ? "text-white" : "text-black"
            }`}
          >
            Login
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
