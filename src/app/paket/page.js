"use client";
import Navbar from "@/components/Landing/Navbar";
import { reguler_packages, wedding_packages } from "@/constants/package";
import { ArrowRight, MoveRight, Phone, Calendar, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

// ─── Type Toggle ──────────────────────────────────────────────────────────────
function TypeToggle({ isWedding, setIsWedding }) {
  const options = [
    {
      value: false,
      label: "Reguler",
      sub: "Gathering, meeting, ulang tahun",
      icon: <Calendar size={18} />,
    },
    {
      value: true,
      label: "Wedding",
      sub: "Paket pernikahan eksklusif",
      icon: <Heart size={18} />,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="bg-[#f0ece6]/80 backdrop-blur-sm border border-[#896d51]/20 p-1.5 rounded-xl flex gap-1 shadow-sm">
        {options.map((opt) => {
          const active = isWedding === opt.value;
          return (
            <button
              key={String(opt.value)}
              onClick={() => setIsWedding(opt.value)}
              className={`flex-1 flex items-center justify-center gap-3 py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 cursor-pointer ${
                active
                  ? "bg-[#0F131F] text-white shadow-md"
                  : "text-[#896d51] hover:text-[#0F131F] hover:bg-[#896d51]/10"
              }`}
            >
              <span className={`shrink-0 transition-transform duration-300 ${active ? "scale-110 text-[#896d51]" : "text-[#896d51]/75"}`}>
                {opt.icon}
              </span>
              <span className="flex flex-col items-start text-left">
                <span className="text-sm font-semibold tracking-wide leading-tight">
                  {opt.label}
                </span>
                <span
                  className={`text-[10px] mt-0.5 leading-tight hidden sm:inline-block transition-colors duration-300 ${
                    active ? "text-white/60" : "text-black/40"
                  }`}
                >
                  {opt.sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Facility Ordering & Label Helpers ──────────────────────────────────────────

const getFacilityWeight = (fac) => {
  const name = (fac.name || "").toLowerCase();
  const icon = (fac.icon || "").toLowerCase();
  if (name.includes("kapasitas") || icon.includes("users")) return 1;
  if (name.includes("listrik") || icon.includes("zap")) return 2;
  if (name.includes("area") || icon.includes("sparkles")) return 3;
  if (name.includes("kursi") || icon.includes("armchair")) return 4;
  return 99;
};

const getFacilityLabel = (fac) => {
  const name = (fac.name || "").toLowerCase();
  const icon = (fac.icon || "").toLowerCase();
  if (name.includes("kapasitas") || icon.includes("users")) return "Kapasitas";
  if (name.includes("listrik") || icon.includes("zap")) return "Listrik";
  if (name.includes("area") || icon.includes("sparkles")) return "Area";
  if (name.includes("kursi") || icon.includes("armchair")) return "Kursi Variasi";
  return fac.name;
};

// ─── Reguler Card ─────────────────────────────────────────────────────────────
function RegulerCard({ venue }) {
  const sortedStats = [...(venue.stats || [])].sort(
    (a, b) => getFacilityWeight(a) - getFacilityWeight(b)
  );

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
      <div className="flex flex-col items-start p-5 flex-1 w-full">
        {/* Price */}
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-2xl font-semibold text-[#0F131F]">
            {venue.price || "Rp0"}
          </span>
          {venue.priceOri && (
            <span className="line-through text-sm mb-0.5 text-black/30">
              {venue.priceOri}
            </span>
          )}
          <span className="text-sm mb-0.5 text-black/50">/ 3 jam</span>
        </div>

        <p className="text-sm mt-3 text-black/55 leading-relaxed line-clamp-2 min-h-10">
          {venue.desc}
        </p>

        {/* Stats */}
        <div className="w-full mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
          {sortedStats.map((stat) => (
            <div key={stat.id || stat.name} className="flex items-center gap-3 text-[#0F131F]">
              <span
                className="text-[#896d51] shrink-0 w-6 h-6 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
                dangerouslySetInnerHTML={{ __html: stat.icon }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-black/45 uppercase tracking-wider font-bold leading-none">
                  {getFacilityLabel(stat)}
                </span>
                <span className="text-xs font-semibold text-[#0F131F] mt-1 break-words leading-tight">
                  {stat.value && stat.value !== "-" ? stat.value : stat.name}
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
  const sortedStats = [...(pkg.stats || [])].sort(
    (a, b) => getFacilityWeight(a) - getFacilityWeight(b)
  );

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
      <div className="flex flex-col items-start p-5 flex-1 w-full">
        {/* Price */}
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-2xl font-semibold text-[#0F131F]">
            {pkg.price || "Rp0"}
          </span>
          {pkg.priceOri && (
            <span className="line-through text-sm mb-0.5 text-black/30">
              {pkg.priceOri}
            </span>
          )}
          <span className="text-sm mb-0.5 text-black/50">/ 5 jam</span>
        </div>

        <p className="text-sm mt-3 text-black/55 leading-relaxed line-clamp-2 min-h-10">
          {pkg.desc}
        </p>

        {/* Stats */}
        <div className="w-full mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
          {sortedStats.map((stat) => (
            <div key={stat.id || stat.name} className="flex items-center gap-3 text-[#0F131F]">
              <span
                className="text-[#896d51] shrink-0 w-6 h-6 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
                dangerouslySetInnerHTML={{ __html: stat.icon }}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-black/45 uppercase tracking-wider font-bold leading-none">
                  {getFacilityLabel(stat)}
                </span>
                <span className="text-xs font-semibold text-[#0F131F] mt-1 break-words leading-tight">
                  {stat.value && stat.value !== "-" ? stat.value : stat.name}
                </span>
              </div>
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
const formatRupiah = (amount) => {
  if (amount === null || amount === undefined || amount === 0) return null;
  return "Rp" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getAreaImage = (name) => {
  const lowercaseName = (name || "").toLowerCase();
  if (lowercaseName.includes("depan")) return "/depan.jpg";
  if (lowercaseName.includes("tengah")) return "/tengah.jpg";
  if (lowercaseName.includes("belakang")) return "/belakang.jpg";
  return "/depan.jpg";
};

function page() {
  const [isWedding, setIsWedding] = useState(false);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/area");
        setAreas(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data area:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const reguler_cards_data = areas.map((area) => {
    const priceObj = area.areaPrices?.find(
      (ap) => ap.reservationType?.name?.toLowerCase() === "reguler"
    );
    const price = Number(priceObj?.price) || 0;
    const stats = area.areaFacilities
      ?.map((af) => af.facility)
      ?.filter((f) => f && f.isDisplay) || [];

    return {
      id: area.id,
      name: area.name,
      img: getAreaImage(area.name),
      desc: area.description,
      price: formatRupiah(price),
      stats,
    };
  });

  const wedding_cards_data = areas.map((area) => {
    const priceObj = area.areaPrices?.find(
      (ap) => ap.reservationType?.name?.toLowerCase() === "wedding"
    );
    const price = Number(priceObj?.price) || 0;
    const stats = area.areaFacilities
      ?.map((af) => af.facility)
      ?.filter((f) => f && f.isDisplay) || [];

    return {
      id: area.id,
      name: "Wedding " + area.name,
      thumbnail: getAreaImage(area.name),
      desc: area.description,
      price: formatRupiah(price),
      stats,
    };
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f3f4f7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-black/50 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#896d51]" />
          <span>Memuat paket &amp; area...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      {/* Header */}
      <header className="h-56 sm:h-64 w-full relative flex flex-col justify-center items-center pt-20 px-4">
        <div
          style={{ backgroundImage: "url(/about-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="z-10 flex flex-col items-center gap-3 text-center px-4">
          <span className="text-[#896d51] text-xs font-semibold tracking-[0.3em] uppercase">
            Bango Parc
          </span>
          <h1 className="font-crimson-pro text-white text-4xl sm:text-5xl">
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
      <section className="section-layout grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-10 lg:col-start-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isWedding
              ? reguler_cards_data.map((v) => (
                  <RegulerCard key={v.id} venue={v} />
                ))
              : wedding_cards_data.map((p) => <WeddingCard key={p.id} pkg={p} />)}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-8 px-4 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white border border-[#0F131F]/10">
          <div className="flex flex-1 p-6 sm:p-10 flex-col items-start justify-between">
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
