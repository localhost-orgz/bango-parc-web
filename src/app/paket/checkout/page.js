import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

// Simulasi data yang dikirim dari halaman detail
const bookingData = {
  venueName: "Semi-Indoor & Outdoor",
  venueLocation: "Jl. Contoh No. 12, Depok",
  date: "Sabtu, 24 Mei 2025",
  startTime: "09:00",
  endTime: "12:00",
  duration: 3,
  pricePerSession: 2000000,
  originalPrice: 2500000,
  discount: 500000,
  tax: 200000,
  total: 2200000,
  image: "/about-us2.jpg",
};

function InputField({
  label,
  placeholder,
  type = "text",
  required = false,
  hint,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#2c2218]/70 tracking-wide uppercase">
        {label}
        {required && <span className="text-[#896d51] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 border-b-2 border-[#896d51]/30 bg-transparent text-sm text-[#2c2218] placeholder:text-black/30 outline-none focus:border-[#896d51] transition-colors px-1"
      />
      {hint && <p className="text-[10px] text-black/30">{hint}</p>}
    </div>
  );
}

function page() {
  return (
    <main className="w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="h-52 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/detail-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="z-10 flex flex-col items-center gap-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-white/60 text-xs mb-1">
            <span>Beranda</span>
            <ChevronRight size={12} />
            <span>Venue</span>
            <ChevronRight size={12} />
            <span>Detail Paket</span>
            <ChevronRight size={12} />
            <span className="text-white">Checkout</span>
          </div>
          <h1 className="font-crimson-pro text-white text-5xl">
            Detail Pesanan
          </h1>
          <p className="text-white/60 text-xs mt-1 text-center max-w-sm">
            Pastikan semua data dan detail reservasi sudah benar sebelum
            melanjutkan pembayaran.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* LEFT — Booking Info + Form */}
        <div className="col-span-7 flex flex-col gap-6">
          {/* Booking Summary Card */}
          <div className="bg-white border border-[#896d51]/15 p-6">
            <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-4 pb-3 border-b border-[#896d51]/15">
              Ringkasan Booking
            </h5>

            <div className="flex gap-4">
              {/* Venue Image */}
              <div
                className="w-24 h-24 bg-gray-300 bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${bookingData.image})` }}
              />

              {/* Venue Details */}
              <div className="flex flex-col gap-1.5 flex-1">
                <h6 className="font-crimson-pro text-xl text-[#2c2218]">
                  {bookingData.venueName}
                </h6>
                <div className="flex items-center gap-1.5 text-black/40 text-xs">
                  <MapPin size={11} strokeWidth={1.5} />
                  <span>{bookingData.venueLocation}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/15 px-2.5 py-1.5">
                    <CalendarDays size={12} strokeWidth={1.5} color="#896d51" />
                    <span>{bookingData.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/15 px-2.5 py-1.5">
                    <Clock size={12} strokeWidth={1.5} color="#896d51" />
                    <span>
                      {bookingData.startTime}
                      <ArrowRight
                        size={10}
                        className="inline mx-1"
                        strokeWidth={1.5}
                        color="#896d51"
                      />
                      {bookingData.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/15 px-2.5 py-1.5">
                    <Building2 size={12} strokeWidth={1.5} color="#896d51" />
                    <span>{bookingData.duration} Jam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Pemesan */}
          <div className="bg-white border border-[#896d51]/15 p-6">
            <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
              Informasi Pemesan
            </h5>
            <p className="text-xs text-black/40 mb-5">
              Data ini digunakan untuk konfirmasi dan komunikasi booking Anda.
            </p>

            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Nama Depan"
                  placeholder="Nama depan Anda"
                  required
                />
                <InputField
                  label="Nama Belakang"
                  placeholder="Nama belakang Anda"
                  required
                />
              </div>
              <InputField
                label="Alamat Email"
                placeholder="email@contoh.com"
                type="email"
                required
                hint="Konfirmasi booking akan dikirim ke email ini"
              />
              <InputField
                label="Nomor Telepon"
                placeholder="+62 812 3456 7890"
                type="tel"
                required
                hint="Gunakan nomor aktif yang bisa dihubungi"
              />
              <InputField
                label="Nama Acara / Keterangan"
                placeholder="Contoh: Ulang tahun, Gathering perusahaan, dll."
              />
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white border border-[#896d51]/15 p-6">
            <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
              Metode Pembayaran
            </h5>
            <p className="text-xs text-black/40 mb-5">
              Pembayaran DP minimal 50% untuk konfirmasi booking.
            </p>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: "transfer",
                  label: "Transfer Bank",
                  sub: "BCA / Mandiri / BNI / BRI",
                  checked: true,
                },
                {
                  id: "va",
                  label: "Virtual Account",
                  sub: "Otomatis dikonfirmasi",
                  checked: false,
                },
                {
                  id: "cash",
                  label: "Bayar di Tempat",
                  sub: "Hanya untuk DP, maks. H-3",
                  checked: false,
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-3.5 border-2 cursor-pointer transition-colors ${
                    method.checked
                      ? "border-[#896d51] bg-[#896d51]/5"
                      : "border-[#896d51]/15 hover:border-[#896d51]/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={method.checked}
                    className="accent-[#896d51]"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#2c2218]">
                      {method.label}
                    </span>
                    <span className="text-xs text-black/40">{method.sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Catatan */}
          <div className="flex items-start gap-2.5 p-4 border border-amber-200 bg-amber-50">
            <AlertCircle
              size={15}
              color="#d97706"
              strokeWidth={1.5}
              className="shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-700 leading-relaxed">
              Booking belum dikonfirmasi sampai pembayaran DP diterima. Tim kami
              akan menghubungi Anda dalam 1×24 jam setelah pembayaran.
            </p>
          </div>

          {/* Back button */}
          <Link
            href={"/venue/detail"}
            className="flex items-center gap-2 text-sm text-[#896d51] hover:text-[#7a6047] transition-colors w-fit"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
            <span>Kembali ke Detail Venue</span>
          </Link>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="col-span-5">
          <div className="sticky top-6 flex flex-col gap-4">
            {/* Price Breakdown */}
            <div className="bg-white border-2 border-[#896d51] p-6">
              <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-5 pb-3 border-b border-[#896d51]/15">
                Ringkasan Pembayaran
              </h5>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm text-black/60">
                  <span>Sewa venue (3 jam)</span>
                  <span>
                    Rp
                    {bookingData.pricePerSession.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black/60">
                  <span className="line-through text-black/30">
                    Harga normal
                  </span>
                  <span className="line-through text-black/30">
                    Rp{bookingData.originalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">Diskon</span>
                  <span className="text-green-700">
                    -Rp{bookingData.discount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-black/60">
                  <span>Pajak & Biaya (10%)</span>
                  <span>Rp{bookingData.tax.toLocaleString("id-ID")}</span>
                </div>

                <div className="h-px w-full bg-[#896d51]/20 my-1" />

                <div className="flex justify-between">
                  <span className="font-semibold text-[#2c2218]">Total</span>
                  <span className="font-semibold text-xl text-[#896d51]">
                    Rp{bookingData.total.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-black/40 -mt-1">
                  <span>DP minimum (50%)</span>
                  <span>
                    Rp{(bookingData.total / 2).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-[#896d51]/20 my-5" />

              {/* CTA */}
              <button className="w-full bg-[#896d51] flex justify-center items-center gap-2 py-3.5 text-sm font-medium text-white hover:bg-[#7a6047] transition-colors">
                Lanjutkan ke Pembayaran
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>

              <p className="text-[10px] text-center text-black/30 mt-3">
                Dengan melanjutkan, Anda menyetujui{" "}
                <span className="underline cursor-pointer">
                  syarat & ketentuan
                </span>{" "}
                kami
              </p>
            </div>

            {/* Trust badges */}
            <div className="bg-white border border-[#896d51]/15 p-4">
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: CheckCircle2, label: "Data Anda aman & terenkripsi" },
                  {
                    icon: CheckCircle2,
                    label: "Konfirmasi via Email & WhatsApp",
                  },
                  { icon: CheckCircle2, label: "Batalkan gratis min. H-7" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon
                      size={14}
                      color="#896d51"
                      strokeWidth={1.5}
                      className="shrink-0"
                    />
                    <span className="text-xs text-black/50">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Need help */}
            <div className="flex items-center justify-center gap-2 text-xs text-black/40">
              <Users size={13} strokeWidth={1.5} />
              <span>
                Butuh bantuan?{" "}
                <span className="text-[#896d51] underline cursor-pointer">
                  Hubungi kami
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
