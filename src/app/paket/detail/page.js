"use client";

import BookingCalendar from "@/components/BookingCalendar";
import { getLocalTimeZone, today } from "@internationalized/date";
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
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const now = today(getLocalTimeZone());
const TIME_SLOTS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const MIN_DURATION = 3;

function getBookedHours(events = []) {
  const booked = [];

  events.forEach((event) => {
    const [start, end] = event.time.split(" – ");

    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);

    for (let h = startHour; h < endHour; h++) {
      booked.push(`${String(h).padStart(2, "0")}:00`);
    }
  });

  return booked;
}

function addHours(time, hoursToAdd) {
  const hour = parseInt(time.split(":")[0]);

  const newHour = hour + hoursToAdd;

  return `${String(newHour).padStart(2, "0")}:00`;
}

function page() {
  const [value, setValue] = useState(now);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");

  const bookedHours = selectedDate ? getBookedHours(selectedDate.events) : [];
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

            <div className="bg-white rounded-full p-3 z-100 absolute top-1/2 -translate-y-1/2 cursor-pointer -left-3 shadow-2xl border border-[#896d51]">
              <ChevronLeft color="#896d51" />
            </div>
            <div className="bg-white rounded-full p-3 z-100 absolute top-1/2 -translate-y-1/2 cursor-pointer -right-3 shadow-2xl border border-[#896d51]">
              <ChevronRight color="#896d51" />
            </div>
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
          {/* Booking Card */}
          <div className="w-full p-5 border-2 border-[#896d51] mt-8 bg-white">
            <h6 className="text-xl font-crimson-text font-semibold mb-1">
              Booking Paket
            </h6>

            <p className="text-xs text-black/40 mb-5">
              Isi detail di bawah untuk melanjutkan pemesanan
            </p>

            <div className="flex flex-col gap-4 w-full">
              {/* DATE PICKER */}
              <div className="flex flex-col">
                <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
                  Pilih Tanggal
                </div>

                <div className="flex items-stretch gap-4 w-full">
                  {/* Icon */}
                  <button
                    onClick={() => setOpenCalendar(true)}
                    className="h-13 w-13 bg-[#896d51] flex justify-center items-center shrink-0 hover:bg-[#755840] transition-colors"
                  >
                    <CalendarDays size={24} strokeWidth={1.5} color="#fff" />
                  </button>

                  {/* Input */}
                  <button
                    onClick={() => setOpenCalendar(true)}
                    className="flex flex-1 border-2 border-[#896d51]/70 items-center px-3 h-13 bg-white text-left"
                  >
                    <span
                      className={`text-sm ${
                        selectedDate ? "text-[#2c2218]" : "text-gray-400"
                      }`}
                    >
                      {selectedDate?.label || "Pilih tanggal acara"}
                    </span>
                  </button>
                </div>
              </div>

              {/* JAM */}
              {/* Pilih Jam */}
              <div className="flex flex-col mt-1">
                <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
                  Pilih Jam
                </div>

                {!selectedDate && (
                  <div className="border border-dashed border-[#896d51]/30 p-4 text-xs text-black/40">
                    Pilih tanggal terlebih dahulu untuk melihat slot jam
                    tersedia
                  </div>
                )}

                {selectedDate && (
                  <>
                    {/* Existing Events */}
                    {selectedDate.events?.length > 0 && (
                      <div className="mb-4 flex flex-col gap-2">
                        <span className="text-[11px] uppercase tracking-wide text-black/40 font-semibold">
                          Jadwal Terbooking
                        </span>

                        {selectedDate.events.map((event, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between border border-red-200 bg-red-50 px-3 py-2"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-red-700">
                                {event.name}
                              </span>

                              <span className="text-[11px] text-red-500">
                                {event.time}
                              </span>
                            </div>

                            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1">
                              Booked
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dropdowns */}
                    <div className="flex gap-4 items-start">
                      {/* START */}
                      <div className="flex-1 flex flex-col">
                        <select
                          value={selectedStart}
                          onChange={(e) => setSelectedStart(e.target.value)}
                          className="h-11 border-b-2 border-[#896d51] bg-transparent text-sm outline-none"
                        >
                          <option value="">Jam mulai</option>

                          {TIME_SLOTS.map((time) => {
                            const isBooked = bookedHours.includes(time);

                            return (
                              <option
                                key={time}
                                value={time}
                                disabled={isBooked}
                              >
                                {time} {isBooked ? "• BOOKED" : ""}
                              </option>
                            );
                          })}
                        </select>

                        <span className="text-[10px] text-black/30 mt-1">
                          Check-in
                        </span>
                      </div>

                      <ArrowRight
                        className="shrink-0 mt-2"
                        size={20}
                        strokeWidth={1.5}
                        color="#896d51"
                      />

                      {/* END */}
                      {/* END */}
                      <div className="flex-1 flex flex-col">
                        <select
                          value={selectedEnd}
                          onChange={(e) => setSelectedEnd(e.target.value)}
                          disabled={!selectedStart}
                          className={`h-11 border-b-2 border-[#896d51] bg-transparent text-sm outline-none ${
                            !selectedStart
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <option value="">
                            {!selectedStart
                              ? "Pilih jam mulai dulu"
                              : "Jam selesai"}
                          </option>

                          {selectedStart &&
                            (() => {
                              const startHour = parseInt(
                                selectedStart.split(":")[0],
                              );

                              return TIME_SLOTS.map((time) => {
                                const endHour = parseInt(time.split(":")[0]);

                                const duration = endHour - startHour;

                                const isBooked = bookedHours.includes(time);

                                // minimal 3 jam
                                const isTooShort = duration < MIN_DURATION;

                                // harus kelipatan 3
                                const isNotMultiple = duration % 3 !== 0;

                                // end harus setelah start
                                const isBeforeStart = endHour <= startHour;

                                const isDisabled =
                                  isBooked ||
                                  isTooShort ||
                                  isNotMultiple ||
                                  isBeforeStart;

                                return (
                                  <option
                                    key={time}
                                    value={time}
                                    disabled={isDisabled}
                                  >
                                    {time}
                                    {isDisabled
                                      ? isBooked
                                        ? " • BOOKED"
                                        : " • INVALID"
                                      : ` • ${duration} jam`}
                                  </option>
                                );
                              });
                            })()}
                        </select>

                        <span className="text-[10px] text-black/30 mt-1">
                          Check-out
                        </span>
                      </div>
                    </div>

                    {/* Availability Legend */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {TIME_SLOTS.map((time) => {
                        const isBooked = bookedHours.includes(time);

                        return (
                          <div
                            key={time}
                            className={`px-2 py-1 text-[10px] border ${
                              isBooked
                                ? "bg-red-50 border-red-200 text-red-700"
                                : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            }`}
                          >
                            {time}
                          </div>
                        );
                      })}
                    </div>

                    {/* Hint */}
                    <div className="mt-4 p-3 bg-[#896d51]/5 border border-[#896d51]/15">
                      <p className="text-[11px] text-black/50 leading-relaxed">
                        Slot merah sudah digunakan oleh acara lain. Kamu hanya
                        bisa memilih jam yang masih tersedia.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* HINT */}
              <div className="flex items-center gap-1.5 mt-1">
                <Clock size={12} color="#896d51" strokeWidth={1.5} />
                <span className="text-[11px] text-black/40">
                  Jam operasional: 07.00 – 22.00 WIB · Min. 3 jam
                </span>
              </div>

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

          {/* MODAL CALENDAR */}
          {openCalendar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
              <div className="relative bg-white w-full max-w-[480px] border border-[#896d51]/20 shadow-2xl p-5">
                {/* CLOSE */}
                <button
                  onClick={() => setOpenCalendar(false)}
                  className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
                >
                  ✕
                </button>

                {/* HEADER */}
                <div className="mb-5">
                  <h3 className="font-crimson-pro text-4xl text-[#2c2218]">
                    Cek Ketersediaan
                  </h3>

                  <p className="text-sm text-black/50 mt-1">
                    Semi Indoor & Outdoor
                  </p>
                </div>

                {/* CALENDAR */}
                <BookingCalendar
                  onDateSelect={(date) => {
                    setSelectedDate(date);
                    setOpenCalendar(false);
                  }}
                />

                {/* FOOTER */}
                <div className="mt-5 pt-4 border-t border-[#896d51]/10 flex items-start gap-2">
                  <Clock
                    size={14}
                    color="#896d51"
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-[11px] text-black/40 leading-relaxed">
                    Durasi sewa minimal 3 jam. Kelebihan waktu dikenakan biaya
                    tambahan.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default page;
