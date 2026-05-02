import AreasContent from "@/components/Landing/Areas/AreasContent";
import React from "react";

function page() {
  return (
    <main className="min-h-screen w-full">
      <header className="h-90 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/about-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/10" />

        <h1 className="font-crimson-pro text-white text-5xl z-1">About Us</h1>
      </header>
      <section className="section-layout">
        <div className="grid-12">
          <div className="col-span-7 w-full flex flex-col items-start gap-5">
            <h3 className="section-headline">
              Berawal dari sebuah rumah, tumbuh menjadi tempat di mana kenangan
              tercipta.
            </h3>
            <div className="flex flex-col gap-3 w-2xl">
              <p className="section-subheadline">
                Bango Parc lahir dari sebuah ide sederhana — sebuah rumah
                keluarga dengan halaman yang luas dan penuh kehangatan, yang
                terlalu sayang untuk dinikmati sendiri.
              </p>
              <p className="section-subheadline">
                Didirikan pada tahun 2018 oleh pasangan Budi dan Rina Santoso,
                Bango Parc awalnya hanya digunakan untuk acara keluarga besar.
                Namun seiring waktu, semakin banyak kerabat dan tetangga yang
                tertarik dan bertanya — "Boleh kami pakai juga?"
              </p>
            </div>
          </div>
          <div className="col-span-4 col-start-9 relative">
            <div
              style={{ backgroundImage: "url(/about-us1.jpg)" }}
              className="inset-0 absolute bg-cover bg-center"
            />
          </div>
        </div>
      </section>
      <section className="section-layout">
        <div className="grid-12">
          <div className="col-span-8">
            <div
              style={{ backgroundImage: "url(/about-us3.jpg)" }}
              className="w-full h-auto aspect-video bg-center bg-cover"
            />
          </div>
          <div className="col-span-4">
            <div
              style={{ backgroundImage: "url(/about-us2.jpg)" }}
              className="w-full h-full bg-bottom bg-cover"
            />
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="section-layout">
        <div className="w-full flex flex-col items-center gap-3">
          <h3 className="section-headline text-center">
            Ratusan momen, satu tempat
          </h3>
          <p className="section-subheadline text-center w-[50%]">
            Dari satu acara ke acara berikutnya, kami terus bertumbuh bersama
            setiap momen yang dipercayakan kepada Bango Parc.
          </p>
        </div>

        <div className="grid-12 mt-20">
          <div className="col-span-10 col-start-2 w-full flex flex-row justify-between">
            {/* acara terselenggara */}
            <div className="flex flex-col items-start gap-2">
              <span className="font-bold text-6xl">100+</span>
              <span>Acara Terselenggara</span>
            </div>
            {/* rating google maps */}
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-end gap-2">
                <span className="font-bold text-6xl">4.6</span>
                <svg
                  className="mb-2"
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.23642 6.33797L0.856418 7.26297L0.743418 7.28597C0.572358 7.33138 0.416418 7.42138 0.291508 7.54677C0.166608 7.67217 0.0772176 7.82846 0.0324776 7.9997C-0.0122604 8.17094 -0.0107545 8.35098 0.0368475 8.52145C0.0844475 8.69191 0.176437 8.84669 0.303418 8.96997L4.92542 13.4689L3.83542 19.8239L3.82242 19.934C3.81195 20.1109 3.84869 20.2874 3.92887 20.4454C4.00905 20.6035 4.1298 20.7374 4.27876 20.8335C4.42771 20.9296 4.59951 20.9843 4.77657 20.9921C4.95363 20.9998 5.12958 20.9606 5.28642 20.878L10.9924 17.878L16.6854 20.878L16.7854 20.924C16.9505 20.989 17.1299 21.009 17.3052 20.9818C17.4805 20.9545 17.6454 20.8813 17.783 20.7693C17.9206 20.6573 18.026 20.5107 18.0883 20.3447C18.1505 20.1784 18.1675 19.9988 18.1374 19.8239L17.0464 13.4689L21.6704 8.96897L21.7484 8.88397C21.8599 8.74674 21.9329 8.58243 21.9602 8.40777C21.9874 8.23311 21.9679 8.05435 21.9035 7.8897C21.8392 7.72506 21.7324 7.5804 21.5939 7.47049C21.4555 7.36057 21.2904 7.28931 21.1154 7.26397L14.7354 6.33797L11.8834 0.55797C11.8009 0.39051 11.6731 0.24949 11.5146 0.15088C11.3561 0.05227 11.1731 0 10.9864 0C10.7997 0 10.6168 0.05227 10.4582 0.15088C10.2997 0.24949 10.172 0.39051 10.0894 0.55797L7.23642 6.33797Z"
                    fill="black"
                  />
                </svg>
              </div>
              <span>Rating di Google Maps</span>
            </div>
            {/* acara terselenggara */}
            <div className="flex flex-col items-start gap-2">
              <span className="font-bold text-6xl">3</span>
              <span>Area Venue</span>
            </div>
            {/* acara terselenggara */}
            <div className="flex flex-col items-start gap-2">
              <span className="font-bold text-6xl">13</span>
              <span>Pasangan Menikah</span>
            </div>
          </div>
        </div>
      </section>

      {/* areas */}
      <section className="section-layout">
        <div className="w-full flex flex-col items-center gap-3">
          <h3 className="section-headline text-center">Areas</h3>
          <p className="section-subheadline w-[50%] text-center">
            Dari satu acara ke acara berikutnya, kami terus bertumbuh bersama
            setiap momen yang dipercayakan kepada Bango Parc.
          </p>
        </div>
        <AreasContent />
      </section>

      {/* cta */}
      <div className="w-full py-20 relative flex flex-col justify-center items-center">
        <div
          style={{ backgroundImage: "url(/about-cta.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/60" />

        <h3 className="text-white z-10 mb-3 text-4xl font-crimson-pro">
          Siap Bikin Momen Tak Terlupakan di Bango Parc?
        </h3>
        <p className="z-10 text-white">
          Pilih area favoritmu dan mulai rencanakan acaramu bareng kami
        </p>
        <div className="flex items-center gap-2 z-10 mt-5 border border-white py-3 px-5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2V6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 10H21"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 14H8.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 14H12.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 14H16.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 18H8.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18H12.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 18H16.01"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white">Amanakan Tanggalmu Sekarang!</span>
        </div>
      </div>
    </main>
  );
}

export default page;
