import React from "react";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

function FindUsSection() {
  return (
    <section className="section-layout py-14 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="section-headline text-3xl sm:text-4xl">Find Us!</h3>

          <p className="section-subheadline text-sm sm:text-base leading-relaxed">
            Kunjungi Bango Parc dan lihat langsung bagaimana setiap sudut ruang
            kami bisa menjadi latar sempurna untuk acaramu.
          </p>
        </div>

        {/* Map */}
        <div className="lg:col-span-7 w-full overflow-hidden border border-black/10">
          <iframe
            className="w-full h-[350px] sm:h-[450px] lg:h-[500px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.669179388451!2d106.80400329999999!3d-6.3071217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef99bc243df9%3A0x2829114f0e30059f!2sBANGO%20PARC!5e0!3m2!1sid!2sid!4v1777508028731!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right Box */}
        <div className="lg:col-span-3 w-full border border-black/10 h-auto lg:h-[500px] flex flex-col justify-between p-6">
          <div className="flex flex-col gap-7">
            <div>
              <span className="uppercase tracking-[0.2em] text-xs text-neutral-500">
                Venue Info
              </span>

              <h4 className="font-crimson-text text-3xl mt-2">Bango Parc</h4>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />

                <div>
                  <h6 className="uppercase text-xs tracking-wide text-neutral-500">
                    Lokasi
                  </h6>

                  <p className="text-sm leading-relaxed mt-1">
                    Jl. Bango Raya No.123, Depok, Jawa Barat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="w-4 h-4 mt-1 shrink-0" />

                <div>
                  <h6 className="uppercase text-xs tracking-wide text-neutral-500">
                    Jam Operasional
                  </h6>

                  <p className="text-sm mt-1">Setiap Hari • 09.00 — 21.00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 shrink-0" />

                <div>
                  <h6 className="uppercase text-xs tracking-wide text-neutral-500">
                    Kontak
                  </h6>

                  <p className="text-sm mt-1">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-10 border border-black px-5 py-4 flex items-center justify-between hover:bg-black hover:text-white transition-all duration-300">
            <span className="text-sm tracking-wide">Lihat Rute Lokasi</span>

            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FindUsSection;
