"use client";
import Navbar from "@/components/Landing/Navbar";
import { reguler_packages, wedding_packages } from "@/constants/package";
import {
  Armchair,
  ArrowRight,
  MoveRight,
  Package2,
  PartyPopper,
  Phone,
  Speaker,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function IconRegular({ color = "currentColor" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#r1)">
        <path
          d="M27.6151 1.86974C28.9366 3.00342 29.6396 4.61828 29.8949 6.31701C30.0398 8.45386 29.4635 10.4565 28.0516 12.0757C27.6433 12.5302 27.2133 12.9633 26.7728 13.3866C26.8861 13.7264 27.0305 13.8087 27.3119 14.0267C27.7268 14.3574 28.1016 14.7052 28.4714 15.0848C28.6389 15.2526 28.81 15.4068 28.9908 15.5597C29.7459 16.2086 30.4613 16.9324 31.1043 17.6924C31.3676 17.9977 31.6434 18.2916 31.9182 18.5865C32.1092 18.793 32.2765 18.9917 32.433 19.2264C32.7958 19.0835 33.0242 18.824 33.2865 18.547C34.6638 17.1429 36.3709 16.1962 38.3627 16.0819C38.4695 16.0748 38.4695 16.0748 38.5785 16.0675C40.391 16.0048 42.1992 16.6373 43.5904 17.7945C44.3603 18.5223 44.9103 19.4645 45.1908 20.4842C45.4877 21.7033 45.5082 22.926 45.0279 23.8534C44.7601 24.1595 44.5286 24.3257 44.1214 24.3865C43.569 24.3872 43.1861 24.3876 42.765 23.9882C42.4972 23.6465 42.4358 23.3398 42.4056 22.91C42.5728 21.6419 42.4076 20.979 41.9975 20.3674C41.3523 19.5834 40.4919 19.2128 39.5194 18.9794C38.3269 18.8757 37.1286 19.0915 36.1689 19.8466C35.5542 20.387 34.9837 20.9794 34.4095 21.5624C34.5556 21.9921 34.7939 22.3394 35.0441 22.7135C35.5276 23.4495 35.9709 24.2 36.3861 24.9764C37.4413 26.9501 38.2653 29.0696 37.8022 31.1321C37.5017 32.112 36.983 32.7236 36.1166 33.2421C35.781 33.4096 35.4378 33.5555 35.0918 33.7001C34.5266 33.9406 34.2596 34.0532 33.9924 34.1656C33.7094 34.2849 33.4268 34.4051 33.1442 34.5253C32.7383 34.6978 32.3323 34.87 31.9262 35.0419C30.9957 35.4357 30.0671 35.8341 29.1388 36.2331C27.3964 36.9815 25.6518 37.7248 23.9069 38.4674C22.5854 39.0298 21.2645 39.5936 19.9447 40.16C18.4187 40.8149 16.8911 41.4661 15.363 42.1162C14.2396 42.5943 13.1165 43.073 11.9946 43.5544C11.2356 43.8801 10.7739 44.0784 10.3123 44.277C9.80995 44.4929 9.30713 44.7076 8.80407 44.9217C8.22697 45.1678 7.93544 45.2911 7.64382 45.4141C7.51036 45.4711 7.3742 45.5292C5.97482 46.1167 4.44147 46.2605 3.00318 45.7012C1.63992 45.0359 0.75331 44.0771 0.179071 42.6757C0.00867902 42.1236-0.0334601 41.6177-0.0343079 41.0416C-0.0474294 39.3575 0.734685 37.9809 1.2965 36.6786C1.76594 35.5834 1.95675 35.1392 2.14787 34.6952C2.40194 34.1048 2.65535 33.5142 2.90843 32.9234C3.36942 31.8474 3.48494 31.5781 3.60048 31.3087C4.18434 29.9477 4.76517 28.5853 5.34509 27.2225C6.04022 25.589 6.73773 23.9565 7.43773 22.325C8.06028 20.8739 8.6799 19.4216 9.29821 17.9686C9.94325 16.4531 10.589 14.938 11.2373 13.4239C11.6891 12.3676 11.9034 11.8695 12.1187 11.3718C12.474 10.5348 12.5357 10.3905 12.5975 10.2463C13.0286 9.24182 13.5775 8.72675 14.3744 8.35534C16.3014 7.66265 18.367 8.3289 20.1419 9.15656C22.1935 10.2385 22.9625 10.7099 23.7181 11.2303C24.2572 11.5897 25.1995 11.1715 26.5991 9.11234C27.1771 7.54134 27.1296 6.40909 26.657 5.29784C26.2188 4.44484 25.7106 3.90798 24.7963 3.59362C23.5502 3.5182 23.3715 3.52405 23.1928 3.53097C22.6626 3.54063 22.3296 3.52137 21.9213 3.1444C21.5568 2.67518 21.5822 2.18726 21.6517 1.61706C21.8442 1.21064 22.0485 0.987525 22.4603 0.808462C24.2519 0.26586 26.151 0.763831 27.6151 1.86974Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="r1">
          <rect width="46" height="46" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconWedding({ color = "currentColor" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ─── Type Toggle ──────────────────────────────────────────────────────────────
function TypeToggle({ isWedding, setIsWedding }) {
  const options = [
    {
      value: false,
      label: "Reguler",
      sub: "Gathering, meeting, ulang tahun",
      icon: <IconRegular color={!isWedding ? "#fff" : "#896d51"} />,
    },
    {
      value: true,
      label: "Wedding",
      sub: "Paket pernikahan eksklusif",
      icon: <IconWedding color={isWedding ? "#fff" : "#896d51"} />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
        Pilih Jenis Acara
      </p>
      <div
        className="flex p-1 gap-1"
        style={{
          background: "#f0ece6",
          border: "1px solid rgba(137,109,81,0.2)",
        }}
      >
        {options.map((opt) => {
          const active = isWedding === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => setIsWedding(opt.value)}
              className="relative flex items-center gap-3 px-6 py-3.5 transition-all duration-300"
              style={{
                background: active ? "#0F131F" : "transparent",
                color: active ? "#fff" : "#896d51",
                minWidth: 200,
              }}
            >
              {/* Gold left accent bar when active */}
              {active && (
                <span
                  className="absolute left-0 top-3 bottom-3 w-0.5"
                  style={{ background: "#896d51" }}
                />
              )}

              <span className="shrink-0">{opt.icon}</span>

              <span className="flex flex-col items-start text-left">
                <span
                  className="text-sm font-semibold leading-none"
                  style={{ color: active ? "#fff" : "#0F131F" }}
                >
                  {opt.label}
                </span>
                <span
                  className="text-[11px] mt-1 leading-none"
                  style={{
                    color: active
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(15,19,31,0.4)",
                  }}
                >
                  {opt.sub}
                </span>
              </span>

              {active && (
                <span
                  className="ml-auto text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5"
                  style={{
                    background: "rgba(137,109,81,0.2)",
                    color: "#896d51",
                    border: "1px solid rgba(137,109,81,0.3)",
                  }}
                >
                  Aktif
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Reguler Card ─────────────────────────────────────────────────────────────
function RegulerCard({ venue }) {
  return (
    <div className="col-span-1 w-full bg-white border border-[#0F131F]/10 flex flex-col group">
      {/* Image */}
      <div className="w-full aspect-video relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${venue.img})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-white font-crimson-text text-xl leading-none">
            {venue.name}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-start p-5 flex-1">
        {/* Price */}
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-2xl font-semibold text-[#0F131F]">
            {venue.price}
          </span>
          {venue.priceOri && (
            <span className="line-through text-sm mb-0.5 text-black/30">
              {venue.priceOri}
            </span>
          )}
          <span className="text-sm mb-0.5 text-black/50">/ 3 jam</span>
        </div>

        <p className="text-sm mt-3 text-black/55 leading-relaxed">
          {venue.desc}
        </p>

        {/* Stats */}
        <div className="w-full mt-5 grid grid-cols-2 gap-3">
          {venue.stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon
                size={14}
                className="text-[#896d51] shrink-0"
                strokeWidth={1.7}
              />
              <div className="flex flex-col">
                <span className="text-[10px] text-black/40 uppercase tracking-wide leading-none">
                  {label}
                </span>
                <span className="text-xs font-medium text-[#0F131F] mt-0.5">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#0F131F]/10 my-5" />

        <Link
          href={`/paket/detail?id=${venue.id}&type=reguler`}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white transition-colors duration-200"
          style={{ background: "#0F131F" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#896d51")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0F131F")}
        >
          Lihat Detail & Book
          <ArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

// ─── Wedding Card ─────────────────────────────────────────────────────────────
function WeddingCard({ pkg }) {
  return (
    <div className="col-span-1 w-full bg-white border border-[#0F131F]/10 flex flex-col group">
      <div className="w-full aspect-video relative bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${pkg.thumbnail})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-white font-crimson-text text-xl leading-none">
            {pkg.name}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start p-5 flex-1">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-end gap-1.5 flex-wrap">
            <span className="text-lg font-semibold text-[#0F131F]">
              {pkg.three_hours_disc}
            </span>
            {pkg.current_three_hours && (
              <span className="line-through text-xs mb-0.5 text-black/30">
                {pkg.current_three_hours}
              </span>
            )}
            <span className="text-xs mb-0.5 text-black/50">/ 3 jam</span>
          </div>
          <div className="flex items-end gap-1.5 flex-wrap">
            <span className="text-lg font-semibold text-[#0F131F]">
              {pkg.five_hours_disc}
            </span>
            {pkg.current_five_hours && (
              <span className="line-through text-xs mb-0.5 text-black/30">
                {pkg.current_five_hours}
              </span>
            )}
            <span className="text-xs mb-0.5 text-black/50">/ 5 jam</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          {pkg.features.map(({ id, icon: Icon, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Icon
                size={13}
                className="text-[#896d51] shrink-0"
                strokeWidth={1.7}
              />
              <span className="text-xs text-black/60">{label}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#0F131F]/10 my-5" />

        <Link
          href={`/paket/detail?id=${pkg.id}&type=wedding`}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white transition-colors duration-200"
          style={{ background: "#0F131F" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#896d51")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0F131F")}
        >
          Lihat Detail & Book
          <ArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function page() {
  const [isWedding, setIsWedding] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      {/* Header */}
      <header className="h-90 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/about-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="z-10 flex flex-col items-center gap-3">
          <span className="text-[#896d51] text-xs font-semibold tracking-[0.3em] uppercase">
            Bango Parc
          </span>
          <h1 className="font-crimson-pro text-white text-5xl">
            Paket & Venue
          </h1>
        </div>
      </header>

      <Navbar />

      {/* Toggle Section */}
      <section className="w-full flex flex-col items-center py-14 gap-3 px-4">
        <h2 className="font-crimson-text text-4xl text-[#0F131F] text-center">
          Temukan Paket Sesuai Kebutuhanmu
        </h2>
        <p className="text-sm text-black/45 text-center max-w-md">
          Pilih jenis acara untuk melihat paket dan area yang tersedia.
        </p>
        <div className="mt-4">
          <TypeToggle isWedding={isWedding} setIsWedding={setIsWedding} />
        </div>
      </section>

      {/* Cards Section */}
      <section className="section-layout grid-12">
        <div className="col-span-10 col-start-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isWedding
              ? reguler_packages.map((v) => <RegulerCard key={v.id} venue={v} />)
              : wedding_packages.map((p) => <WeddingCard key={p.id} pkg={p} />)}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-8 px-4 flex justify-center">
        <div className="w-full max-w-6xl flex bg-white border border-[#0F131F]/10">
          <div className="flex flex-1 p-10 flex-col items-start justify-between">
            <div className="flex flex-col items-start">
              <h3 className="text-4xl font-crimson-pro text-[#0F131F]">
                Ketentuan Singkat
              </h3>
              <ul className="list-none mt-5 flex flex-col gap-2">
                {[
                  "DP minimal 50% untuk booking area.",
                  "Pelunasan paling lambat H-7 sebelum acara.",
                  "Katering dari venue. Jika membawa dari luar dikenakan corkage fee.",
                  "Kelebihan waktu dikenakan biaya Rp1.000.000 /jam.",
                  "Harga belum termasuk biaya keamanan parkir di luar venue.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-black/60"
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: "#896d51" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              className="flex items-center gap-1.5 text-sm text-[#0F131F] mt-6 hover:text-[#896d51] transition-colors"
              href="/paket"
            >
              <span className="underline underline-offset-2">
                Lihat Semua Ketentuan
              </span>
              <MoveRight size={15} />
            </Link>
          </div>
          <div className="hidden md:block h-full w-[45%] relative p-10">
            <div
              style={{ backgroundImage: "url(/cta-paket.jpg)" }}
              className="absolute inset-0 bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="flex flex-col items-start gap-2 relative z-10">
              <h3 className="text-4xl w-[60%] font-crimson-pro text-white leading-tight">
                Punya pertanyaan atau ingin booking?
              </h3>
              <span className="text-white/70 font-light w-[65%] text-sm leading-relaxed">
                Tim kami siap membantu anda merencanakan acara terbaik
              </span>
              <Link
                href="/paket"
                className="flex items-center text-sm gap-2 text-white py-3 px-6 mt-5 transition-colors"
                style={{ background: "#896d51" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#73563e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#896d51")
                }
              >
                <Phone size={15} /> Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
