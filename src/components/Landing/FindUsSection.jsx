import React from "react";

function FindUsSection() {
  return (
    <section className="section-layout">
      <div className="grid-12">
        <div className="col-span-2 flex flex-col gap-3">
          <h3 className="section-headline">Find Us!</h3>
          <p className="section-subheadline">
            Kunjungi Bango Parc dan lihat langsung bagaimana setiap sudut ruang
            kami bisa menjadi latar sempurna untuk acaramu.
          </p>
        </div>

        <div className="col-span-7 w-full">
          <iframe
            className="w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.669179388451!2d106.80400329999999!3d-6.3071217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ef99bc243df9%3A0x2829114f0e30059f!2sBANGO%20PARC!5e0!3m2!1sid!2sid!4v1777508028731!5m2!1sid!2sid"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-span-3 w-full border h-50"></div>
      </div>
    </section>
  );
}

export default FindUsSection;
