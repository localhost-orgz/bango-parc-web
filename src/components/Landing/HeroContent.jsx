import Image from "next/image";
import React from "react";

function HeroContent() {
  return (
    <div className="p-1 z-1 flex flex-col items-center gap-7">
      <div className="flex flex-row items-center gap-5">
        {/* kiri */}
        <svg
          className="mt-5"
          width="177"
          height="1"
          viewBox="0 0 177 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
        </svg>

        <Image src={"/logo-icon.png"} alt="logo" width={50} height={50} />

        {/* kanan */}
        <svg
          className="mt-5"
          width="177"
          height="1"
          viewBox="0 0 177 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="0.5" x2="177" y2="0.5" stroke="white" strokeWidth={1} />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="font-cinzel text-white text-center text-5xl font-light">
          Ruang untuk Momen yang Tak Terlupakan
        </h1>
        <h5 className="text-white text-center font-light text-lg w-[60%]">
          Bango Parc hadir sebagai ruang yang hangat, elegan, dan siap menjadi
          latar terbaik untuk setiap perayaan hidupmu.
        </h5>
      </div>
    </div>
  );
}

export default HeroContent;
