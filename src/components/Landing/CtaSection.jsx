import React from "react";

function CtaSection() {
  return (
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
  );
}

export default CtaSection;
