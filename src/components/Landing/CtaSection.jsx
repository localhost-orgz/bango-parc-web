import React from "react";

function CtaSection() {
  return (
    <section className="w-full h-[500px] sm:h-[600px] lg:h-[650px] relative overflow-hidden">
      {/* Background */}
      <div
        style={{ backgroundImage: "url(/cta.jpg)" }}
        className="absolute inset-0 bg-cover bg-center scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 w-full h-full flex flex-col justify-center items-center text-center px-5 sm:px-8">
        <span className="text-white font-crimson-text uppercase tracking-[0.2em] text-xs sm:text-sm">
          Siap Memulai?
        </span>

        <h3 className="text-white font-crimson-text text-3xl sm:text-4xl md:text-5xl leading-tight mt-3 max-w-4xl">
          Momen impianmu dimulai dari satu langkah.
        </h3>

        <p className="text-white/90 font-light text-sm sm:text-base md:text-lg mt-4 max-w-xl leading-relaxed">
          Cek ketersediaan tanggal dan amankan venue pilihanmu sekarang.
        </p>

        <button className="mt-7 py-3 px-6 sm:px-8 bg-white text-black font-crimson-text text-base sm:text-lg hover:bg-[#f3f3f3] transition-all duration-300">
          Cek Ketersediaan
        </button>
      </div>
    </section>
  );
}

export default CtaSection;
