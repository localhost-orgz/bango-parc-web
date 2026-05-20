"use client";

// ─── External Libraries ───────────────────────────────────────────────────────
import {
  AirVent,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ParkingCircle,
  Projector,
  UtensilsCrossed,
  Users,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// ─── Internal Components & Data ────────────────────────────────────────────────
import BookingCalendar from "@/components/BookingCalendar";
import Navbar from "@/components/Landing/Navbar";
import { reguler_packages, wedding_packages } from "@/constants/package";

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

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop",
];

const BOOKING_TERMS = [
  "Pembayaran DP minimal 50% untuk konfirmasi booking",
  "Acara pernikahan hanya 1 per hari (full day exclusive)",
  "Acara umum maksimal 2 per hari",
  "Pembatalan kurang dari 3 hari tidak dapat dikembalikan",
  "Jam operasional venue: 07.00 – 22.00 WIB",
];

// ─── Pure Utility Functions ───────────────────────────────────────────────────
function getBookedHours(events = []) {
  return events.flatMap((event) => {
    const [start, end] = event.time.split(" – ");
    const startHour = parseInt(start.split(":")[0]);
    const endHour = parseInt(end.split(":")[0]);
    return Array.from(
      { length: endHour - startHour },
      (_, i) => `${String(startHour + i).padStart(2, "0")}:00`,
    );
  });
}

function isEndTimeValid(time, selectedStart, bookedHours) {
  const startHour = parseInt(selectedStart.split(":")[0]);
  const endHour = parseInt(time.split(":")[0]);
  const duration = endHour - startHour;
  return (
    endHour > startHour &&
    duration >= MIN_DURATION &&
    duration % MIN_DURATION === 0 &&
    !bookedHours.includes(time)
  );
}

function getEndTimeLabel(time, selectedStart, bookedHours) {
  if (!isEndTimeValid(time, selectedStart, bookedHours)) {
    return bookedHours.includes(time) ? " • BOOKED" : " • INVALID";
  }
  const duration =
    parseInt(time.split(":")[0]) - parseInt(selectedStart.split(":")[0]);
  return ` • ${duration} jam`;
}

// Helper function to format as Rupiah
function formatRupiah(amount) {
  if (amount === null || amount === undefined || amount === 0) return null;
  return "Rp" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader({ pkg }) {
  return (
    <header className="h-60 w-full relative flex justify-center items-center">
      <div
        style={{ backgroundImage: "url(/detail-header.jpg)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 flex flex-col items-center gap-2">
        <nav className="flex items-center gap-1 text-white/70 text-xs mb-1">
          <span>Beranda</span>
          <ChevronRight size={12} />
          <span>Venue</span>
          <ChevronRight size={12} />
          <span className="text-white">{pkg.name}</span>
        </nav>
        <h1 className="font-crimson-pro text-white text-5xl">
          Detail Paket &amp; Venue
        </h1>
      </div>
    </header>
  );
}

function ImageGallery({ pkg }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [pkg.img || pkg.thumbnail || GALLERY_IMAGES[0], ...GALLERY_IMAGES.slice(1)];

  function goTo(index) {
    setActiveIndex((index + images.length) % images.length);
  }

  return (
    <div>
      {/* Main image */}
      <div className="w-full h-auto aspect-video bg-gray-400 relative shadow-xs">
        <div
          className="inset-0 absolute bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[activeIndex]})` }}
        />
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="rounded-full p-3 z-10 absolute top-1/2 -translate-y-1/2 bg-[#0F131F] -left-3 shadow-2xl border border-[#0F131F] group transition-all cursor-pointer hover:scale-105"
        >
          <ChevronLeft
            color="#fff"
            className="group-hover:stroke-white transition-colors"
          />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="rounded-full p-3 z-10 absolute top-1/2 -translate-y-1/2 -right-3 shadow-2xl border border-[#0F131F] bg-[#0F131F] group transition-all hover:scale-105 cursor-pointer"
        >
          <ChevronRight color="#fff" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-5">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-full h-auto aspect-video bg-gray-400 cursor-pointer transition-opacity bg-cover bg-center ${
              i === activeIndex
                ? "ring-2 ring-[#0F131F] opacity-100"
                : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
    </div>
  );
}

function VenueDescription({ pkg }) {
  return (
    <div className="mt-8">
      <h4 className="font-crimson-pro text-3xl text-[#2c2218] mb-3">
        Tentang Paket
      </h4>
      <p className="text-sm text-black/60 leading-relaxed">
        {pkg.desc}
      </p>
      <p className="text-sm text-black/60 leading-relaxed mt-3">
        Venue semi-indoor dan outdoor kami menawarkan suasana yang fleksibel dan
        elegan untuk berbagai jenis acara. Dengan desain terbuka yang menyatu
        dengan alam namun tetap terlindungi, venue ini memberikan pengalaman
        yang tak terlupakan bagi setiap tamu.
      </p>
    </div>
  );
}

function FacilitiesGrid({ items }) {
  return (
    <div className="mt-8">
      <h4 className="font-crimson-pro text-3xl text-[#0F131F] mb-4">
        Fasilitas &amp; Fitur Paket
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 p-3 border border-[#0F131F]/20 bg-white"
          >
            <Icon size={18} className="text-[#896d51] shrink-0" strokeWidth={1.5} />
            <span className="text-xs text-[#0F131F]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingTerms() {
  return (
    <div className="mt-8 mb-10">
      <h4 className="font-crimson-pro text-3xl text-[#0F131F] mb-4">
        Ketentuan Booking
      </h4>
      <div className="flex flex-col gap-2">
        {BOOKING_TERMS.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <CheckCircle2
              size={15}
              color="#0F131F"
              strokeWidth={1.5}
              className="mt-0.5 shrink-0"
            />
            <span className="text-sm text-black/60">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookedEventsList({ events }) {
  if (!events?.length) return null;
  return (
    <div className="mb-4 flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-wide text-black/40 font-semibold">
        Jadwal Terbooking
      </span>
      {events.map((event, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border border-red-200 bg-red-50 px-3 py-2"
        >
          <div className="flex flex-col">
            <span className="text-xs font-medium text-red-700">
              {event.name}
            </span>
            <span className="text-[11px] text-red-500">{event.time}</span>
          </div>
          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1">
            Booked
          </span>
        </div>
      ))}
    </div>
  );
}

function AvailabilityLegend({ bookedHours }) {
  return (
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
  );
}

function TimeSlotPicker({
  selectedDate,
  selectedStart,
  selectedEnd,
  bookedHours,
  onStartChange,
  onEndChange,
}) {
  return (
    <div className="flex flex-col mt-1">
      <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
        Pilih Jam
      </div>

      {!selectedDate ? (
        <div className="border border-dashed border-[#0F131F]/30 p-4 text-xs text-black/40">
          Pilih tanggal terlebih dahulu untuk melihat slot jam tersedia
        </div>
      ) : (
        <>
          <BookedEventsList events={selectedDate.events} />

          <div className="flex gap-4 items-start">
            {/* Start time */}
            <div className="flex-1 flex flex-col">
              <select
                value={selectedStart}
                onChange={(e) => onStartChange(e.target.value)}
                className="h-11 border-b-2 border-[#0F131F] bg-transparent text-sm outline-none"
              >
                <option value="">Jam mulai</option>
                {TIME_SLOTS.map((time) => {
                  const isBooked = bookedHours.includes(time);
                  return (
                    <option key={time} value={time} disabled={isBooked}>
                      {time} {isBooked ? "• BOOKED" : ""}
                    </option>
                  );
                })}
              </select>
              <span className="text-[10px] text-black/30 mt-1">Check-in</span>
            </div>

            <ArrowRight
              className="shrink-0 mt-2"
              size={20}
              strokeWidth={1.5}
              color="#0F131F"
            />

            {/* End time */}
            <div className="flex-1 flex flex-col">
              <select
                value={selectedEnd}
                onChange={(e) => onEndChange(e.target.value)}
                disabled={!selectedStart}
                className={`h-11 border-b-2 border-[#0F131F] bg-transparent text-sm outline-none ${
                  !selectedStart ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                <option value="">
                  {!selectedStart ? "Pilih jam mulai dulu" : "Jam selesai"}
                </option>
                {selectedStart &&
                  TIME_SLOTS.map((time) => {
                    const valid = isEndTimeValid(
                      time,
                      selectedStart,
                      bookedHours,
                    );
                    const label = getEndTimeLabel(
                      time,
                      selectedStart,
                      bookedHours,
                    );
                    return (
                      <option key={time} value={time} disabled={!valid}>
                        {time}
                        {label}
                      </option>
                    );
                  })}
              </select>
              <span className="text-[10px] text-black/30 mt-1">Check-out</span>
            </div>
          </div>

          <AvailabilityLegend bookedHours={bookedHours} />

          <div className="mt-4 p-3 bg-[#0F131F]/5 border border-[#0F131F]/15">
            <p className="text-[11px] text-black/50 leading-relaxed">
              Slot merah sudah digunakan oleh acara lain. Kamu hanya bisa
              memilih jam yang masih tersedia.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function DatePickerField({ selectedDate, onOpenCalendar }) {
  return (
    <div className="flex flex-col">
      <div className="w-full font-crimson-text mb-2 font-semibold text-sm">
        Pilih Tanggal
      </div>
      <div className="flex items-stretch gap-4 w-full">
        <button
          onClick={onOpenCalendar}
          className="h-13 w-13 bg-[#0F131F] flex justify-center items-center shrink-0 hover:bg-[#192034] transition-colors"
        >
          <CalendarDays size={24} strokeWidth={1.5} color="#fff" />
        </button>
        <button
          onClick={onOpenCalendar}
          className="flex flex-1 border-2 border-[#0F131F]/70 items-center px-3 h-13 bg-white text-left"
        >
          <span
            className={`text-sm ${selectedDate ? "text-[#0F131F]" : "text-gray-400"}`}
          >
            {selectedDate?.label ?? "Pilih tanggal acara"}
          </span>
        </button>
      </div>
    </div>
  );
}

function BookingCard({
  pkg,
  selectedAreaIds,
  selectedDate,
  selectedStart,
  selectedEnd,
  bookedHours,
  onOpenCalendar,
  onStartChange,
  onEndChange,
}) {
  const selectedDateKey = selectedDate?.key || "";
  const areaIdsParam = selectedAreaIds.join(",");

  return (
    <div className="w-full p-5 border-2 border-[#0F131F] mt-8 bg-white">
      <h6 className="text-xl font-crimson-text font-semibold mb-1">
        Booking Paket
      </h6>
      <p className="text-xs text-black/40 mb-5">
        Isi detail di bawah untuk melanjutkan pemesanan
      </p>

      <div className="flex flex-col gap-4 w-full">
        <DatePickerField
          selectedDate={selectedDate}
          onOpenCalendar={onOpenCalendar}
        />

        <TimeSlotPicker
          selectedDate={selectedDate}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          bookedHours={bookedHours}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />

        <div className="flex items-center gap-1.5 mt-1">
          <Clock size={12} color="#0F131F" strokeWidth={1.5} />
          <span className="text-[11px] text-black/40">
            Jam operasional: 07.00 – 22.00 WIB · Min. 3 jam
          </span>
        </div>

        <div className="h-px w-full bg-[#0F131F]/70 mb-1 mt-3" />

        <Link
          href={`/paket/checkout?ids=${areaIdsParam}&type=${pkg.type}&date=${selectedDateKey}&start=${selectedStart}&end=${selectedEnd}`}
          className="bg-[#0F131F] flex justify-center items-center py-3 text-sm font-medium text-white hover:bg-[#7a6047] transition-colors"
        >
          Lanjutkan Booking
        </Link>

        <p className="text-[10px] text-center text-black/30">
          Dengan melanjutkan, Anda menyetujui syarat &amp; ketentuan kami
        </p>
      </div>
    </div>
  );
}

function CalendarModal({ pkg, onClose, onDateSelect }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-120 border border-[#0F131F]/20 shadow-2xl p-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
        >
          ✕
        </button>

        <div className="mb-5">
          <h3 className="font-crimson-pro text-4xl text-[#0F131F]">
            Cek Ketersediaan
          </h3>
          <p className="text-sm text-black/50 mt-1">
            {pkg.name}
          </p>
        </div>

        <BookingCalendar onDateSelect={onDateSelect} />

        <div className="mt-5 pt-4 border-t border-[#0F131F]/10 flex items-start gap-2">
          <Clock
            size={14}
            color="#0F131F"
            strokeWidth={1.5}
            className="mt-0.5 shrink-0"
          />
          <p className="text-[11px] text-black/40 leading-relaxed">
            Durasi sewa minimal 3 jam. Kelebihan waktu dikenakan biaya tambahan.
          </p>
        </div>
      </div>
    </div>
  );
}

function VenueSidebar({
  pkg,
  selectedAreaIds,
  onToggleArea,
  selectedPackages,
  combinedName,
  selectedDate,
  selectedStart,
  selectedEnd,
  bookedHours,
  onOpenCalendar,
  onStartChange,
  onEndChange,
}) {
  const allAreas = [
    { id: "depan", label: "Area Depan" },
    { id: "tengah", label: "Ruang Tengah" },
    { id: "belakang", label: "Area Belakang" },
  ];

  const isWedding = pkg.type === "wedding";

  // Calculate dynamic pricing sums
  const totalThreeHoursDiscVal = selectedPackages.reduce((sum, p) => sum + (p.three_hours_disc_val || 0), 0);
  const totalCurrentThreeHoursVal = selectedPackages.reduce((sum, p) => sum + (p.current_three_hours_val || 0), 0);
  const totalFiveHoursDiscVal = selectedPackages.reduce((sum, p) => sum + (p.five_hours_disc_val || 0), 0);
  const totalCurrentFiveHoursVal = selectedPackages.reduce((sum, p) => sum + (p.current_five_hours_val || 0), 0);

  const totalPriceVal = selectedPackages.reduce((sum, p) => sum + (p.priceVal || 0), 0);
  const totalPriceOriVal = selectedPackages.reduce((sum, p) => sum + (p.priceOriVal || 0), 0);

  return (
    <div className="w-full px-15 col-span-5">
      <h3 className="text-5xl font-crimson-pro text-[#0F131F]">
        {combinedName}
      </h3>

      {/* Chip Select Component */}
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">
          Pilih Area Sewa
        </span>
        <div className="flex flex-wrap gap-2">
          {allAreas.map((area) => {
            const isSelected = selectedAreaIds.includes(area.id);
            return (
              <button
                key={area.id}
                onClick={() => onToggleArea(area.id)}
                className={`text-xs px-3.5 py-1.5 border-2 transition-all duration-200 cursor-pointer font-semibold flex items-center gap-1.5 ${
                  isSelected
                    ? "border-[#15803D] bg-[#F0FDF4] text-[#15803D]"
                    : "border-black/15 bg-white text-black/60 hover:border-black/35 hover:text-black"
                }`}
              >
                {isSelected && <Check size={13} strokeWidth={2.5} className="text-[#15803D]" />}
                {area.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-black/50 mt-4 w-[80%]">
        {pkg.desc}
      </p>

      {isWedding ? (
        <div className="flex flex-col gap-1.5 mt-5">
          <div className="flex items-end gap-2 flex-wrap">
            <span className="text-2xl font-semibold text-[#0F131F]">
              {formatRupiah(totalThreeHoursDiscVal)}
            </span>
            {totalCurrentThreeHoursVal > 0 && (
              <span className="line-through text-black/30 mb-0.5 text-sm">{formatRupiah(totalCurrentThreeHoursVal)}</span>
            )}
            <span className="font-semibold text-black/50 text-xs">/ 3 jam</span>
          </div>
          <div className="flex items-end gap-2 flex-wrap">
            <span className="text-2xl font-semibold text-[#0F131F]">
              {formatRupiah(totalFiveHoursDiscVal)}
            </span>
            {totalCurrentFiveHoursVal > 0 && (
              <span className="line-through text-black/30 mb-0.5 text-sm">{formatRupiah(totalCurrentFiveHoursVal)}</span>
            )}
            <span className="font-semibold text-black/50 text-xs">/ 5 jam</span>
          </div>
        </div>
      ) : (
        <div className="flex mt-5 items-end gap-2 flex-wrap">
          <span className="text-3xl font-semibold text-[#0F131F]">
            {formatRupiah(totalPriceVal)}
          </span>
          {totalPriceOriVal > 0 && (
            <span className="line-through text-black/30 mb-0.5">{formatRupiah(totalPriceOriVal)}</span>
          )}
          <span className="font-semibold text-[#0F131F]">/ 3 jam</span>
        </div>
      )}

      <p className="text-xs text-black/40 mt-1">
        *Harga belum termasuk katering dan dekorasi
      </p>

      <BookingCard
        pkg={pkg}
        selectedAreaIds={selectedAreaIds}
        selectedDate={selectedDate}
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        bookedHours={bookedHours}
        onOpenCalendar={onOpenCalendar}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
    </div>
  );
}

// ─── Reguler Card (for Recommendations) ───────────────────────────────────────
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
          Lihat Detail &amp; Book
          <ArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

// ─── Wedding Card (for Recommendations) ───────────────────────────────────────
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
          Lihat Detail &amp; Book
          <ArrowRight size={15} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}

// ─── Main Client Logic Wrapper ─────────────────────────────────────────────────
function DetailPaketContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "depan";
  const type = searchParams.get("type") || "reguler";

  const currentPackages = type === "wedding" ? wedding_packages : reguler_packages;
  const pkg = currentPackages.find((p) => p.id === id) || currentPackages[0];

  const [selectedAreaIds, setSelectedAreaIds] = useState([id]);

  useEffect(() => {
    setSelectedAreaIds([id]);
  }, [id]);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");

  const bookedHours = selectedDate ? getBookedHours(selectedDate.events) : [];

  const toggleArea = (areaId) => {
    // Keep at least one area selected at all times
    setSelectedAreaIds((prev) => {
      if (prev.includes(areaId)) {
        if (prev.length > 1) {
          return prev.filter((item) => item !== areaId);
        }
        return prev;
      }
      return [...prev, areaId];
    });
  };

  const selectedPackages = selectedAreaIds
    .map((areaId) => currentPackages.find((p) => p.id === areaId))
    .filter(Boolean);

  const getCombinedName = () => {
    if (selectedPackages.length === 0) return "";
    const names = selectedPackages.map((p) => p.name.replace("Wedding ", ""));
    return (pkg.name.startsWith("Wedding") ? "Wedding " : "") + names.join(" & ");
  };

  const combinedName = getCombinedName();

  const getCombinedFeatures = () => {
    const allItems = [];
    const seen = new Set();
    selectedPackages.forEach((p) => {
      const items = p.type === "wedding"
        ? p.features.map((f) => ({ icon: f.icon, label: f.label }))
        : p.stats.map((s) => ({ icon: s.icon, label: `${s.label}: ${s.value}` }));

      items.forEach((item) => {
        if (!seen.has(item.label)) {
          seen.add(item.label);
          allItems.push(item);
        }
      });
    });
    return allItems;
  };

  const combinedFeatures = getCombinedFeatures();

  function handleDateSelect(date) {
    setSelectedDate(date);
    setSelectedStart("");
    setSelectedEnd("");
    setOpenCalendar(false);
  }

  function handleStartChange(time) {
    setSelectedStart(time);
    setSelectedEnd(""); // reset end when start changes
  }

  const otherPackages = currentPackages.filter((p) => p.id !== id);

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader pkg={{ name: combinedName }} />
      <Navbar />

      <section className="section-layout grid-12">
        {/* Left column — gallery + info */}
        <div className="col-span-7 w-full">
          <ImageGallery pkg={pkg} />
          <VenueDescription pkg={pkg} />
          <FacilitiesGrid items={combinedFeatures} />
          <BookingTerms />
        </div>

        {/* Right column — booking sidebar */}
        <VenueSidebar
          pkg={pkg}
          selectedAreaIds={selectedAreaIds}
          onToggleArea={toggleArea}
          selectedPackages={selectedPackages}
          combinedName={combinedName}
          selectedDate={selectedDate}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          bookedHours={bookedHours}
          onOpenCalendar={() => setOpenCalendar(true)}
          onStartChange={handleStartChange}
          onEndChange={setSelectedEnd}
        />
      </section>

      {/* Others Areas Recommendation Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-[#0F131F]/15 mt-10">
        <h3 className="font-crimson-pro text-4xl text-[#0F131F] text-center mb-2">
          Area Bango Parc Lainnya
        </h3>
        <p className="text-sm text-black/50 text-center mb-10 max-w-md mx-auto">
          Temukan pilihan area dan suasana lainnya untuk melengkapi kebutuhan acara Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {otherPackages.map((otherPkg) =>
            type === "wedding" ? (
              <WeddingCard key={otherPkg.id} pkg={otherPkg} />
            ) : (
              <RegulerCard key={otherPkg.id} venue={otherPkg} />
            )
          )}
        </div>
      </section>

      {openCalendar && (
        <CalendarModal
          pkg={{ name: combinedName }}
          onClose={() => setOpenCalendar(false)}
          onDateSelect={handleDateSelect}
        />
      )}
    </main>
  );
}

// ─── Exported Page (wrapped in Suspense) ───────────────────────────────────────
export default function DetailPaketPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f3f4f7] text-[#0F131F]">
        <span className="text-lg font-medium">Memuat detail paket...</span>
      </div>
    }>
      <DetailPaketContent />
    </Suspense>
  );
}
