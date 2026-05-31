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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

// ─── Internal Components & Data ────────────────────────────────────────────────
import BookingCalendar from "@/components/BookingCalendar";
import Navbar from "@/components/Landing/Navbar";
import { reguler_packages, wedding_packages } from "@/constants/package";

const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
})();

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
  "Jam operasional venue: 08.00 – 22.00 WIB",
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

function isStartHourValid(time, pkgType, dayReservations) {
  const S = parseInt(time.split(":")[0]);
  const duration = pkgType === "wedding" ? 5 : 3;
  const E = S + duration;
  if (E > CLOSE_HOUR) return false;
  
  // Check overlap with any reservation in dayReservations
  return !dayReservations.some((r) => {
    const exStart = new Date(r.startDateTime).getUTCHours();
    const exEnd = new Date(r.endDateTime).getUTCHours();
    
    // Enforce Rule 1: clear time is not needed if the event ends at or after 20:00 (8 PM)
    const exEndBuffer = exEnd >= 20 ? exEnd : exEnd + 1;
    const candidateEndBuffer = E >= 20 ? E : E + 1;
    
    return Math.max(S, exStart) < Math.min(candidateEndBuffer, exEndBuffer);
  });
}

function isEndTimeValid(time, selectedStart, pkgType, dayReservations) {
  const S = parseInt(selectedStart.split(":")[0]);
  const E = parseInt(time.split(":")[0]);
  const duration = E - S;
  
  if (pkgType === "wedding") {
    if (duration !== 5) return false;
  } else {
    if (duration < 3 || duration % 3 !== 0) return false;
  }
  
  if (E > CLOSE_HOUR) return false;
  
  // Check overlap with any reservation in dayReservations
  return !dayReservations.some((r) => {
    const exStart = new Date(r.startDateTime).getUTCHours();
    const exEnd = new Date(r.endDateTime).getUTCHours();
    
    // Enforce Rule 1: clear time is not needed if the event ends at or after 20:00 (8 PM)
    const exEndBuffer = exEnd >= 20 ? exEnd : exEnd + 1;
    const candidateEndBuffer = E >= 20 ? E : E + 1;
    
    return Math.max(S, exStart) < Math.min(candidateEndBuffer, exEndBuffer);
  });
}

function getEndTimeLabel(time, selectedStart, pkgType, dayReservations) {
  if (!isEndTimeValid(time, selectedStart, pkgType, dayReservations)) {
    return " • INVALID";
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
    <header className="h-64 sm:h-72 w-full relative flex flex-col justify-center items-center pt-20">
      <div
        style={{ backgroundImage: "url(/detail-header.jpg)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="z-10 flex flex-col items-center gap-2 text-center px-4">
        <nav className="flex items-center gap-1 text-white/70 text-xs mb-1 flex-wrap justify-center">
          <span>Beranda</span>
          <ChevronRight size={12} />
          <span>Venue</span>
          <ChevronRight size={12} />
          <span className="text-white">{pkg.name}</span>
        </nav>
        <h1 className="font-crimson-pro text-white text-4xl sm:text-5xl">
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
      <div className="w-full h-auto aspect-video bg-gray-400 relative shadow-xs overflow-hidden sm:overflow-visible">
        <div
          className="inset-0 absolute bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[activeIndex]})` }}
        />
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="rounded-full p-2.5 sm:p-3 z-10 absolute top-1/2 -translate-y-1/2 bg-[#0F131F] left-1 sm:-left-3 shadow-2xl border border-[#0F131F] group transition-all cursor-pointer hover:scale-105"
        >
          <ChevronLeft
            color="#fff"
            className="group-hover:stroke-white transition-colors"
          />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="rounded-full p-2.5 sm:p-3 z-10 absolute top-1/2 -translate-y-1/2 right-1 sm:-right-3 shadow-2xl border border-[#0F131F] bg-[#0F131F] group transition-all hover:scale-105 cursor-pointer"
        >
          <ChevronRight color="#fff" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-16 sm:w-20 lg:w-full shrink-0 lg:shrink h-auto aspect-video bg-gray-400 cursor-pointer transition-opacity bg-cover bg-center ${
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
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 p-3 border border-[#0F131F]/20 bg-white"
          >
            {item.icon && typeof item.icon === "string" && item.icon.includes("<svg") ? (
              <span
                className="text-[#896d51] shrink-0 w-6 h-6 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
            ) : (
              <div className="text-[#896d51] shrink-0 w-5 h-5 flex items-center justify-center">
                {item.icon ? (
                  <item.icon size={18} className="shrink-0" strokeWidth={1.5} />
                ) : null}
              </div>
            )}
            <span className="text-xs text-[#0F131F]">{item.label}</span>
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

function CustomSelect({ value, onChange, options, placeholder, disabled, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-11 items-center justify-between border-b-2 border-[#0F131F] bg-transparent text-sm outline-none px-1 text-[#0F131F] font-semibold text-left transition-all ${
          disabled ? "opacity-30 cursor-not-allowed" : "hover:border-[#896d51] cursor-pointer"
        }`}
      >
        <span className={value ? "text-[#0F131F]" : "text-black/35 font-normal"}>
          {value ? options.find((o) => o.value === value)?.label || value : placeholder}
        </span>
        <span className="text-[#0F131F]/60 text-[9px] ml-2 transition-transform duration-200">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && !disabled && (
        <>
          {/* Overlay to close on outside click */}
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 z-40 bg-white border border-[#0F131F]/15 shadow-xl max-h-60 overflow-y-auto rounded-none">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                  value === opt.value
                    ? "bg-[#896d51]/20 font-bold text-[#896d51]"
                    : "text-black/70 hover:bg-[#896d51]/10 hover:text-[#0F131F]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
      <span className="text-[10px] text-black/35 mt-1 font-semibold uppercase tracking-wider">{label}</span>
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

function AvailabilityLegend({ dayReservations }) {
  const isHourOccupied = (timeStr) => {
    const H = parseInt(timeStr.split(":")[0]);
    return dayReservations.some((r) => {
      const exStart = new Date(r.startDateTime).getUTCHours();
      const exEnd = new Date(r.endDateTime).getUTCHours();
      return H >= exStart && H <= exEnd;
    });
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {TIME_SLOTS.map((time) => {
        const isBooked = isHourOccupied(time);
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
  dayReservations,
  pkgType,
  onStartChange,
  onEndChange,
}) {
  const startOptions = TIME_SLOTS.map((time) => {
    const valid = isStartHourValid(time, pkgType, dayReservations);
    return {
      value: time,
      label: time,
      disabled: !valid,
    };
  }).filter((o) => !o.disabled);

  const endOptions = selectedStart
    ? TIME_SLOTS.map((time) => {
        const valid = isEndTimeValid(time, selectedStart, pkgType, dayReservations);
        const label = getEndTimeLabel(time, selectedStart, pkgType, dayReservations);
        return {
          value: time,
          label: time + label,
          disabled: !valid,
        };
      }).filter((o) => !o.disabled)
    : [];

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
            <CustomSelect
              value={selectedStart}
              onChange={onStartChange}
              options={startOptions}
              placeholder="Jam mulai"
              label="Check-in"
            />

            <ArrowRight
              className="shrink-0 mt-3"
              size={20}
              strokeWidth={1.5}
              color="#0F131F"
            />

            {/* End time */}
            <CustomSelect
              value={selectedEnd}
              onChange={onEndChange}
              options={endOptions}
              placeholder={!selectedStart ? "Pilih jam mulai dulu" : "Jam selesai"}
              disabled={!selectedStart}
              label="Check-out"
            />
          </div>

          <AvailabilityLegend dayReservations={dayReservations} />

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
  dayReservations,
  onOpenCalendar,
  onStartChange,
  onEndChange,
}) {
  const router = useRouter();
  const selectedDateKey = selectedDate?.key || "";
  const areaIdsParam = selectedAreaIds.join(",");
  const isReady = selectedAreaIds.length > 0 && selectedDate && selectedStart && selectedEnd;

  const handleContinue = () => {
    if (!isReady) return;
    const sessionData = {
      ids: areaIdsParam,
      type: pkg.type,
      date: selectedDateKey,
      start: selectedStart,
      end: selectedEnd,
    };
    localStorage.setItem("bango_parc_booking_session", JSON.stringify(sessionData));
    router.push("/paket/checkout");
  };

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
          dayReservations={dayReservations}
          pkgType={pkg.type}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />

        <div className="flex items-center gap-1.5 mt-1">
          <Clock size={12} color="#0F131F" strokeWidth={1.5} />
          <span className="text-[11px] text-black/40">
            Jam operasional: 08.00 – 22.00 WIB · Min. {pkg.type === "wedding" ? 5 : 3} jam
          </span>
        </div>

        <div className="h-px w-full bg-[#0F131F]/70 mb-1 mt-3" />

        {isReady ? (
          <button
            onClick={handleContinue}
            className="w-full bg-[#0F131F] flex justify-center items-center py-3 text-sm font-medium text-white hover:bg-[#7a6047] transition-colors cursor-pointer"
          >
            Lanjutkan Booking
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 flex justify-center items-center py-3 text-sm font-medium text-gray-500 cursor-not-allowed border border-gray-200"
          >
            Lanjutkan Booking
          </button>
        )}

        <p className="text-[10px] text-center text-black/30">
          Dengan melanjutkan, Anda menyetujui syarat &amp; ketentuan kami
        </p>
      </div>
    </div>
  );
}

function CalendarModal({ pkg, onClose, onDateSelect, bookedDates }) {
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

        <BookingCalendar onDateSelect={onDateSelect} bookedDates={bookedDates} />

        <div className="mt-5 pt-4 border-t border-[#0F131F]/10 flex items-start gap-2">
          <Clock
            size={14}
            color="#0F131F"
            strokeWidth={1.5}
            className="mt-0.5 shrink-0"
          />
          <p className="text-[11px] text-black/40 leading-relaxed">
            Durasi sewa minimal {pkg.type === "wedding" ? 5 : 3} jam. Kelebihan waktu dikenakan biaya tambahan.
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
  dayReservations,
  onOpenCalendar,
  onStartChange,
  onEndChange,
  areas = [],
}) {
  const allAreas = areas.length > 0
    ? areas.map((area) => ({ id: area.id, label: area.name }))
    : [
        { id: "depan", label: "Area Depan" },
        { id: "tengah", label: "Ruang Tengah" },
        { id: "belakang", label: "Area Belakang" },
      ];

  const isWedding = pkg.type === "wedding";

  const getAreaPrice = (area, typeName) => {
    if (area.areaPrices) {
      const priceObj = area.areaPrices?.find(
        (ap) => ap.reservationType?.name?.toLowerCase() === typeName
      );
      return Number(priceObj?.price) || 0;
    }
    // Fallback dummy
    return isWedding
      ? (area.five_hours_disc_val || 0)
      : (area.priceVal || 0);
  };

  const totalPriceVal = selectedPackages.reduce(
    (sum, p) => sum + getAreaPrice(p, isWedding ? "wedding" : "reguler"),
    0
  );

  return (
    <div className="w-full px-4 lg:px-15 col-span-1 lg:col-span-5">
      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-crimson-pro text-[#0F131F] leading-tight">
        {combinedName}
      </h3>

      {/* Chip Select Component */}
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">
          Pilih Area Sewa
        </span>
        <div className="flex flex-wrap gap-2">
          {allAreas.map((area) => {
            const isSelected = selectedAreaIds.map(String).includes(String(area.id));
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

      <p className="text-sm text-black/50 mt-4 w-full lg:w-[80%] leading-relaxed line-clamp-3">
        {pkg.desc}
      </p>

      <div className="flex mt-5 items-end gap-2 flex-wrap">
        <span className="text-3xl font-semibold text-[#0F131F]">
          {formatRupiah(totalPriceVal)}
        </span>
        <span className="font-semibold text-[#0F131F]">/ {isWedding ? "5" : "3"} jam</span>
      </div>

      <p className="text-xs text-black/40 mt-1">
        *Harga belum termasuk katering dan dekorasi
      </p>

      <BookingCard
        pkg={pkg}
        selectedAreaIds={selectedAreaIds}
        selectedDate={selectedDate}
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
        dayReservations={dayReservations}
        onOpenCalendar={onOpenCalendar}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
    </div>
  );
}

// ─── Facility Ordering & Label Helpers ──────────────────────────────────────────

const getFacilityLabel = (fac) => {
  if (!fac) return "";
  const name = typeof fac === "string" ? fac : fac.name || "";
  const icon = typeof fac === "object" && fac.icon ? fac.icon : "";
  const n = name.toLowerCase();
  const i = icon.toLowerCase();
  if (n.includes("kapasitas") || n.includes("pax") || i.includes("users")) return "Kapasitas";
  if (n.includes("listrik") || n.includes("watt") || i.includes("zap")) return "Listrik";
  if (n.includes("area") || n.includes("dekor") || i.includes("sparkles")) return "Area";
  if (n.includes("kursi") || n.includes("chair") || i.includes("armchair")) return "Kursi Variasi";
  return name;
};

const getFacilityWeight = (fac) => {
  if (!fac) return 99;
  const name = typeof fac === "string" ? fac : fac.name || "";
  const icon = typeof fac === "object" && fac.icon ? fac.icon : "";
  const n = name.toLowerCase();
  const i = icon.toLowerCase();
  if (n.includes("kapasitas") || n.includes("pax") || i.includes("users")) return 1;
  if (n.includes("listrik") || n.includes("watt") || i.includes("zap")) return 2;
  if (n.includes("area") || n.includes("dekor") || i.includes("sparkles")) return 3;
  if (n.includes("kursi") || n.includes("chair") || i.includes("armchair")) return 4;
  return 99;
};

const getFacilityDisplayValue = (fac) => {
  if (!fac) return "";
  if (typeof fac === "string") return fac;
  const label = getFacilityLabel(fac);
  const rawValue = fac.value && fac.value !== "-" ? fac.value : fac.name;
  if (label === "Kapasitas" && /^\d+$/.test(rawValue)) {
    return `${rawValue} Pax`;
  }
  return rawValue;
};

// ─── Reguler Card (for Recommendations) ───────────────────────────────────────
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
            {venue.price}
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
              {stat.icon && typeof stat.icon === "string" && stat.icon.includes("<svg") ? (
                <span
                  className="text-[#896d51] shrink-0 w-7 h-7 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6"
                  dangerouslySetInnerHTML={{ __html: stat.icon }}
                />
              ) : (
                <div className="text-[#896d51] shrink-0 w-7 h-7 flex items-center justify-center">
                  {stat.icon ? (
                    <stat.icon size={20} className="shrink-0" strokeWidth={1.8} />
                  ) : null}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-black/45 uppercase tracking-wider font-bold leading-none">
                  {getFacilityLabel(stat)}
                </span>
                <span className="text-sm font-semibold text-[#0F131F] mt-1 break-words leading-tight">
                  {getFacilityDisplayValue(stat)}
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
              {stat.icon && typeof stat.icon === "string" && stat.icon.includes("<svg") ? (
                <span
                  className="text-[#896d51] shrink-0 w-7 h-7 flex items-center justify-center [&>svg]:w-6 [&>svg]:h-6"
                  dangerouslySetInnerHTML={{ __html: stat.icon }}
                />
              ) : (
                <div className="text-[#896d51] shrink-0 w-7 h-7 flex items-center justify-center">
                  {stat.icon ? (
                    <stat.icon size={20} className="shrink-0" strokeWidth={1.8} />
                  ) : null}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-black/45 uppercase tracking-wider font-bold leading-none">
                  {getFacilityLabel(stat)}
                </span>
                <span className="text-sm font-semibold text-[#0F131F] mt-1 break-words leading-tight">
                  {getFacilityDisplayValue(stat)}
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

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAreaIds, setSelectedAreaIds] = useState([id]);

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

  useEffect(() => {
    const parsedId = isNaN(Number(id)) ? id : Number(id);
    setSelectedAreaIds([parsedId]);
  }, [id]);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        setReservations(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data reservasi:", err);
      }
    };
    fetchReservations();
  }, []);

  const getDynamicBookedDates = () => {
    const computed = {};
    const active = reservations.filter(
      (r) => r.status !== "CANCELLED" && r.status !== "EXPIRED"
    );
    active.forEach((r) => {
      const d = new Date(r.startDateTime);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      const dateKey = `${y}-${m}-${day}`;
      
      const startH = String(d.getUTCHours()).padStart(2, "0");
      const startM = String(d.getUTCMinutes()).padStart(2, "0");
      const endD = new Date(r.endDateTime);
      const endH = String(endD.getUTCHours()).padStart(2, "0");
      const endM = String(endD.getUTCMinutes()).padStart(2, "0");
      
      const timeStr = `${startH}:${startM} – ${endH}:${endM}`;
      const isWedding = r.reservationType?.name?.toLowerCase() === "wedding";
      
      if (!computed[dateKey]) {
        computed[dateKey] = {
          status: "available",
          events: [],
        };
      }
      
      computed[dateKey].events.push({
        name: isWedding
          ? `Wedding ${r.customer?.fullName || "Guest"}`
          : `Acara ${r.customer?.fullName || "Guest"}`,
        time: timeStr,
        isWedding,
        rawStart: r.startDateTime,
        rawEnd: r.endDateTime,
      });
    });
    
    Object.keys(computed).forEach((key) => {
      const dayData = computed[key];
      const hasWedding = dayData.events.some((e) => e.isWedding);
      if (hasWedding) {
        dayData.status = "wedding";
      } else if (dayData.events.length >= 2) {
        dayData.status = "full";
      } else if (dayData.events.length === 1) {
        dayData.status = "half";
      }
    });
    return computed;
  };

  const dynamicBookedDates = getDynamicBookedDates();

  const getDayReservations = () => {
    if (!selectedDate?.key) return [];
    return reservations.filter((r) => {
      if (r.status === "CANCELLED" || r.status === "EXPIRED") return false;
      const d = new Date(r.startDateTime);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      const dateKey = `${y}-${m}-${day}`;
      return dateKey === selectedDate.key;
    });
  };

  const dayReservations = getDayReservations();

  const toggleArea = (areaId) => {
    setSelectedAreaIds((prev) => {
      const parsedId = typeof areaId === "number" ? areaId : Number(areaId) || areaId;
      const normalizedPrev = prev.map((p) => (typeof p === "number" ? p : Number(p) || p));
      if (normalizedPrev.includes(parsedId)) {
        if (normalizedPrev.length > 1) {
          return normalizedPrev.filter((item) => item !== parsedId);
        }
        return prev;
      }
      return [...normalizedPrev, parsedId];
    });
  };

  const getAreaImage = (name) => {
    const lowercaseName = (name || "").toLowerCase();
    if (lowercaseName.includes("depan")) return "/depan.jpg";
    if (lowercaseName.includes("tengah")) return "/tengah.jpg";
    if (lowercaseName.includes("belakang")) return "/belakang.jpg";
    return "/depan.jpg";
  };

  const getAreaPrice = (area, typeName) => {
    if (area.areaPrices) {
      const priceObj = area.areaPrices?.find(
        (ap) => ap.reservationType?.name?.toLowerCase() === typeName
      );
      return Number(priceObj?.price) || 0;
    }
    return area.priceVal || 0;
  };

  const activeArea = areas.find((a) => String(a.id) === String(id));
  const currentPackages = type === "wedding" ? wedding_packages : reguler_packages;

  const pkg = activeArea
    ? {
        id: activeArea.id,
        type: type,
        name: type === "wedding" ? "Wedding " + activeArea.name : activeArea.name,
        img: getAreaImage(activeArea.name),
        thumbnail: getAreaImage(activeArea.name),
        desc: activeArea.description,
        priceVal: getAreaPrice(activeArea, type),
        price: formatRupiah(getAreaPrice(activeArea, type)),
        areaFacilities: activeArea.areaFacilities,
        areaPrices: activeArea.areaPrices,
      }
    : (currentPackages.find((p) => String(p.id) === String(id)) || currentPackages[0]);

  const selectedPackages = selectedAreaIds
    .map((areaId) => {
      const foundArea = areas.find((a) => String(a.id) === String(areaId));
      if (foundArea) {
        return {
          id: foundArea.id,
          type: type,
          name: type === "wedding" ? "Wedding " + foundArea.name : foundArea.name,
          img: getAreaImage(foundArea.name),
          thumbnail: getAreaImage(foundArea.name),
          desc: foundArea.description,
          priceVal: getAreaPrice(foundArea, type),
          price: formatRupiah(getAreaPrice(foundArea, type)),
          areaFacilities: foundArea.areaFacilities,
          areaPrices: foundArea.areaPrices,
        };
      }
      return currentPackages.find((p) => String(p.id) === String(areaId));
    })
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
      if (p.areaFacilities) {
        // Real API data
        const facilities = p.areaFacilities
          ?.map((af) => af.facility)
          ?.filter((f) => f) || [];

        facilities.forEach((f) => {
          const label = getFacilityLabel(f);
          const displayValue = getFacilityDisplayValue(f);
          const combinedLabel = `${label}: ${displayValue}`;
          if (!seen.has(combinedLabel)) {
            seen.add(combinedLabel);
            allItems.push({
              icon: f.icon,
              label: combinedLabel,
            });
          }
        });
      } else {
        // Fallback dummy data
        const items = p.type === "wedding"
          ? p.features.map((f) => ({ icon: f.icon, label: f.label }))
          : p.stats.map((s) => ({ icon: s.icon, label: `${s.label}: ${s.value}` }));

        items.forEach((item) => {
          if (!seen.has(item.label)) {
            seen.add(item.label);
            allItems.push(item);
          }
        });
      }
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

  const getOtherPackages = () => {
    if (areas.length > 0) {
      const filteredAreas = areas.filter((area) => String(area.id) !== String(id));
      return filteredAreas.map((area) => {
        const price = getAreaPrice(area, type);
        const stats = area.areaFacilities
          ?.map((af) => af.facility)
          ?.filter((f) => f && f.isDisplay) || [];

        if (type === "wedding") {
          return {
            id: area.id,
            name: "Wedding " + area.name,
            thumbnail: getAreaImage(area.name),
            desc: area.description,
            price: formatRupiah(price),
            stats,
          };
        } else {
          return {
            id: area.id,
            name: area.name,
            img: getAreaImage(area.name),
            desc: area.description,
            price: formatRupiah(price),
            stats,
          };
        }
      });
    }
    return currentPackages.filter((p) => String(p.id) !== String(id));
  };

  const otherPackages = getOtherPackages();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f3f4f7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-black/55 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#896d51]" />
          <span>Memuat detail paket &amp; area...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader pkg={{ name: combinedName }} />
      <Navbar />

      <section className="section-layout grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column — gallery + info */}
        <div className="col-span-1 lg:col-span-7 w-full">
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
          dayReservations={dayReservations}
          onOpenCalendar={() => setOpenCalendar(true)}
          onStartChange={handleStartChange}
          onEndChange={setSelectedEnd}
          areas={areas}
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
          pkg={pkg}
          onClose={() => setOpenCalendar(false)}
          onDateSelect={handleDateSelect}
          bookedDates={dynamicBookedDates}
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
