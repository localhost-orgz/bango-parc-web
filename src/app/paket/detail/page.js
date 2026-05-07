import {
  ArrowRight,
  CalendarDays,
  Users,
  MapPin,
  Star,
  Wifi,
  ParkingCircle,
  UtensilsCrossed,
  Projector,
  AirVent,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <main className="w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="h-60 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/detail-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="z-10 flex flex-col items-center gap-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
            <span>Beranda</span>
            <ChevronRight size={12} />
            <span>Venue</span>
            <ChevronRight size={12} />
            <span className="text-white">Semi-Indoor & Outdoor</span>
          </div>
          <h1 className="font-crimson-pro text-white text-5xl">
            Detail Paket & Venue
          </h1>
          {/* Rating */}
          {/* <div className="flex items-center gap-1.5 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={14}
                fill={i <= 4 ? "#f5c842" : "none"}
                color={i <= 4 ? "#f5c842" : "#ffffff80"}
                strokeWidth={1.5}
              />
            ))}
            <span className="text-white/80 text-xs ml-1">4.0 · 128 ulasan</span>
          </div> */}
        </div>
      </header>

      <section className="section-layout grid-12">
        {/* LEFT */}
        <div className="left w-full col-span-7 bg-sky-500/0">
          {/* Main Image */}
          <div className="w-full h-auto aspect-video bg-gray-400 relative">
            <div
              className="inset-0 absolute bg-cover bg-center"
              style={{ backgroundImage: "url(/about-us2.jpg)" }}
            />
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 mt-5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-full h-auto aspect-video bg-gray-400 cursor-pointer transition-opacity ${
                  i === 0
                    ? "ring-2 ring-[#896d51]"
                    : "opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h4 className="font-crimson-pro text-3xl text-[#2c2218] mb-3">
              Tentang Paket
            </h4>
            <p className="text-sm text-black/60 leading-relaxed">
              Venue semi-indoor dan outdoor kami menawarkan suasana yang
              fleksibel dan elegan untuk berbagai jenis acara. Dengan desain
              terbuka yang menyatu dengan alam namun tetap terlindungi, venue
              ini memberikan pengalaman yang tak terlupakan bagi setiap tamu.
            </p>
            <p className="text-sm text-black/60 leading-relaxed mt-3">
              Tersedia area parkir luas, tim profesional siap membantu, dan
              berbagai pilihan konfigurasi ruangan sesuai kebutuhan acara Anda.
            </p>
          </div>

          {/* Facilities */}
          <div className="mt-8">
            <h4 className="font-crimson-pro text-3xl text-[#2c2218] mb-4">
              Fasilitas
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Wifi, label: "Wi-Fi Gratis" },
                { icon: ParkingCircle, label: "Area Parkir" },
                { icon: UtensilsCrossed, label: "Katering Tersedia" },
                { icon: Projector, label: "Proyektor & Sound" },
                { icon: AirVent, label: "Area Ber-AC" },
                { icon: Users, label: "Kapasitas 200 orang" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 p-3 border border-[#896d51]/20 bg-white"
                >
                  <Icon size={18} color="#896d51" strokeWidth={1.5} />
                  <span className="text-xs text-black/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ketentuan */}
          <div className="mt-8 mb-10">
            <h4 className="font-crimson-pro text-3xl text-[#2c2218] mb-4">
              Ketentuan Booking
            </h4>
            <div className="flex flex-col gap-2">
              {[
                "Pembayaran DP minimal 50% untuk konfirmasi booking",
                "Acara pernikahan hanya 1 per hari (full day exclusive)",
                "Acara umum maksimal 2 per hari",
                "Pembatalan kurang dari 3 hari tidak dapat dikembalikan",
                "Jam operasional venue: 07.00 – 22.00 WIB",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={15}
                    color="#896d51"
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right w-full px-15 col-span-5">
          <h3 className="text-5xl font-crimson-pro text-[#2c2218]">
            Semi-Indoor & Outdoor
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["Semi-Indoor", "Outdoor"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 border-2 border-[#896d51]/70 text-[#896d51]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-black/50 mt-3 w-[80%]">
            Cocok untuk meeting, ulang tahun, gathering, pengajian, dan acara
            acara yang lain.
          </p>

          {/* Price */}
          <div className="flex mt-5 items-end gap-2">
            <span className="text-3xl font-semibold text-[#2c2218]">
              Rp2.000.000
            </span>
            <span className="line-through text-black/30 mb-0.5">
              Rp2.500.000
            </span>
            <span className="font-semibold text-[#896d51]">/ 3 jam</span>
          </div>

          {/* Price note */}
          <p className="text-xs text-black/40 mt-1">
            *Harga belum termasuk katering dan dekorasi
          </p>

          {/* Booking Card */}
          <div className="w-full p-5 border-2 border-[#896d51] mt-8">
            <h6 className="text-xl font-crimson-text font-semibold mb-1">
              Booking Paket
            </h6>
            <p className="text-xs text-black/40 mb-5">
              Isi detail di bawah untuk melanjutkan pemesanan
            </p>

            <div className="flex flex-col gap-3 w-full">
              {/* Pilih Tanggal */}
              <div className="flex flex-col items-stretch w-full">
                <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
                  Pilih Tanggal
                </div>
                <div className="flex flex-row items-stretch gap-4 w-full">
                  <div className="h-13 w-13 bg-[#896d51] flex justify-center items-center shrink-0">
                    <CalendarDays size={24} strokeWidth={1.5} color="#fff" />
                  </div>
                  <div className="flex flex-1 border-2 border-[#896d51] items-center px-3">
                    <span className="text-gray-400 text-sm">dd/mm/yyyy</span>
                  </div>
                </div>
              </div>

              {/* Pilih Jam */}
              <div className="flex flex-col mt-1">
                <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
                  Pilih Jam
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex-1 min-w-0 flex flex-col">
                    <input
                      placeholder="Mulai"
                      className="flex-1 min-w-0 h-10 border-b-2 border-[#896d51] bg-transparent text-sm placeholder:text-gray-400 outline-none px-1"
                    />
                    <span className="text-[10px] text-black/30 mt-1">
                      Check-in
                    </span>
                  </div>
                  <ArrowRight
                    className="shrink-0 mb-4"
                    size={20}
                    strokeWidth={1.5}
                    color="#896d51"
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <input
                      placeholder="Selesai"
                      className="flex-1 min-w-0 h-10 border-b-2 border-[#896d51] bg-transparent text-sm placeholder:text-gray-400 outline-none px-1"
                    />
                    <span className="text-[10px] text-black/30 mt-1">
                      Check-out
                    </span>
                  </div>
                </div>
              </div>

              {/* Jam Operasional hint */}
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={12} color="#896d51" strokeWidth={1.5} />
                <span className="text-[11px] text-black/40">
                  Jam operasional: 07.00 – 22.00 WIB · Min. 3 jam
                </span>
              </div>

              {/* Price Summary */}
              {/* <div className="bg-[#896d51]/5 border border-[#896d51]/20 p-3 mt-2 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-black/50">
                  <span>Harga sewa (3 jam)</span>
                  <span>Rp2.000.000</span>
                </div>
                <div className="flex justify-between text-xs text-black/50">
                  <span>Diskon</span>
                  <span className="text-green-600">-Rp500.000</span>
                </div>
                <div className="h-px w-full bg-[#896d51]/20 my-0.5" />
                <div className="flex justify-between text-sm font-semibold text-[#2c2218]">
                  <span>Total</span>
                  <span>Rp2.000.000</span>
                </div>
              </div> */}

              <div className="h-px w-full bg-[#896d51]/70 mb-1 mt-3" />

              <Link
                href={"/checkout"}
                className="bg-[#896d51] flex justify-center items-center py-3 text-sm font-medium text-white hover:bg-[#7a6047] transition-colors"
              >
                Lanjutkan Booking
              </Link>

              <p className="text-[10px] text-center text-black/30">
                Dengan melanjutkan, Anda menyetujui syarat & ketentuan kami
              </p>
            </div>
          </div>

          {/* Trust badges */}
          {/* <div className="flex justify-between mt-4 px-1">
            {[
              { icon: CheckCircle2, label: "Booking Aman" },
              { icon: Clock, label: "Konfirmasi Cepat" },
              { icon: Star, label: "Terpercaya" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <Icon size={16} color="#896d51" strokeWidth={1.5} />
                <span className="text-[10px] text-black/40">{label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </main>
  );
}

export default page;
