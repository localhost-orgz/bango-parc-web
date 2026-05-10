import Image from "next/image";
import React from "react";

function HeroContent() {
  return (
    <div className="p-1 z-1 flex flex-col items-center gap-5 sm:gap-7">
      <div className="flex flex-row items-center gap-3 sm:gap-5 w-full justify-center">
        {/* kiri */}
        <svg
          className="mt-5 w-17.5 sm:w-30 md:w-44.25"
          height="1"
          viewBox="0 0 177 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
        </svg>

        <Image
          src={"/logo-icon.png"}
          alt="logo"
          width={50}
          height={50}
          className="w-9 h-9 sm:w-12 sm:h-12 md:w-12.5 md:h-12.5"
        />

        {/* kanan */}
        <svg
          className="mt-5 w-17.5 sm:w-30 md:w-44.25"
          height="1"
          viewBox="0 0 177 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2 px-4">
        <h1 className="font-cinzel text-white text-center text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
          Ruang untuk Momen yang Tak Terlupakan
        </h1>

        <h5 className="text-white text-center font-light text-sm sm:text-base md:text-lg w-full sm:w-[80%] md:w-[60%] leading-relaxed">
          Bango Parc hadir sebagai ruang yang hangat, elegan, dan siap menjadi
          latar terbaik untuk setiap perayaan hidupmu.
        </h5>
      </div>
    </div>
  );
}

export default HeroContent;
