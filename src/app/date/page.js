"use client";

import { useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <main className="min-h-screen bg-[#f8f5f1]">
      {/* Hero */}
      <section className="border-b border-[#896d51]/15 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#896d51] font-semibold">
              Booking Venue
            </span>

            <h1 className="font-crimson-text text-5xl text-[#2c2218] leading-tight">
              Cek Ketersediaan Jadwal Acara
            </h1>

            <p className="text-sm leading-7 text-black/60">
              Pilih tanggal untuk melihat ketersediaan venue. Tanggal dengan
              warna tertentu menandakan status booking yang berbeda.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
        {/* Calendar */}
        <div>
          <BookingCalendar onDateSelect={setSelectedDate} />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          {/* Info Card */}
          <div className="bg-white border border-[#896d51]/20 p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#896d51] font-semibold">
                Informasi
              </span>

              <h2 className="font-crimson-text text-3xl text-[#2c2218]">
                Venue Booking System
              </h2>
            </div>

            <p className="text-sm text-black/60 leading-7">
              Sistem booking ini digunakan untuk mengecek apakah venue masih
              tersedia atau sudah penuh pada tanggal tertentu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border border-[#896d51]/15 bg-[#faf7f3] p-4">
                <p className="text-xs uppercase tracking-wide text-black/40 mb-2">
                  Wedding
                </p>

                <p className="text-sm text-black/65 leading-6">
                  Booking wedding akan memblok seluruh venue selama 1 hari
                  penuh.
                </p>
              </div>

              <div className="border border-[#896d51]/15 bg-[#faf7f3] p-4">
                <p className="text-xs uppercase tracking-wide text-black/40 mb-2">
                  Acara Umum
                </p>

                <p className="text-sm text-black/65 leading-6">
                  Venue dapat menerima maksimal 2 acara umum dalam 1 hari.
                </p>
              </div>
            </div>
          </div>

          {/* Selected Date Preview */}
          <div className="bg-white border border-[#896d51]/20 p-6 flex flex-col gap-4 min-h-[220px]">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#896d51] font-semibold">
                Tanggal Dipilih
              </span>

              <h2 className="font-crimson-text text-3xl text-[#2c2218]">
                {selectedDate
                  ? selectedDate.label
                  : "Belum ada tanggal dipilih"}
              </h2>
            </div>

            {!selectedDate && (
              <p className="text-sm text-black/50 leading-7">
                Klik salah satu tanggal pada kalender untuk melihat detail
                ketersediaan acara.
              </p>
            )}

            {selectedDate && (
              <div className="flex flex-col gap-4">
                <div className="border border-[#896d51]/15 bg-[#faf7f3] p-4">
                  <p className="text-xs uppercase tracking-wide text-black/40 mb-2">
                    Status
                  </p>

                  <p className="text-sm text-black/70">
                    {selectedDate.status === "available" &&
                      "Tanggal tersedia penuh."}

                    {selectedDate.status === "half" &&
                      "Masih tersedia 1 slot acara."}
                  </p>
                </div>

                {selectedDate.events?.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wide text-black/40 font-semibold">
                      Acara Terjadwal
                    </p>

                    {selectedDate.events.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border border-[#896d51]/10 bg-[#896d51]/5 px-4 py-3 text-sm"
                      >
                        <span className="text-black/70">{event.name}</span>

                        <span className="text-black/40 text-xs">
                          {event.time}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <button className="mt-2 h-11 bg-[#896d51] hover:bg-[#73563e] text-white text-sm transition-colors">
                  Lanjutkan Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
