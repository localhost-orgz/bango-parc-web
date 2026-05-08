"use client";

// ─── External Libraries ───────────────────────────────────────────────────────
import {
  AirVent,
  ArrowRight,
  CalendarDays,
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
import { useState } from "react";

// ─── Internal Components ──────────────────────────────────────────────────────
import BookingCalendar from "@/components/BookingCalendar";
import Footer from "@/components/Footer";

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

const FACILITIES = [
  { icon: Wifi, label: "Wi-Fi Gratis" },
  { icon: ParkingCircle, label: "Area Parkir" },
  { icon: UtensilsCrossed, label: "Katering Tersedia" },
  { icon: Projector, label: "Proyektor & Sound" },
  { icon: AirVent, label: "Area Ber-AC" },
  { icon: Users, label: "Kapasitas 200 orang" },
];

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

const VENUE_TAGS = ["Semi-Indoor", "Outdoor"];

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader() {
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
          <span className="text-white">Semi-Indoor &amp; Outdoor</span>
        </nav>
        <h1 className="font-crimson-pro text-white text-5xl">
          Detail Paket &amp; Venue
        </h1>
      </div>
    </header>
  );
}

// function ImageGallery() {
//   return (
//     <div>
//       <div className="w-full h-auto aspect-video bg-gray-400 relative">
//         <div
//           className="inset-0 absolute bg-cover bg-center"
//           style={{ backgroundImage: "url(/about-us2.jpg)" }}
//         />
//         <button className="bg-white rounded-full p-3 z-10 absolute top-1/2 -translate-y-1/2 -left-3 shadow-2xl border border-[#896d51]">
//           <ChevronLeft color="#896d51" />
//         </button>
//         <button className="bg-white rounded-full p-3 z-10 absolute top-1/2 -translate-y-1/2 -right-3 shadow-2xl border border-[#896d51]">
//           <ChevronRight color="#896d51" />
//         </button>
//       </div>

//       <div className="flex gap-2 mt-5">
//         {[0, 1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className={`w-full h-auto aspect-video bg-gray-400 cursor-pointer transition-opacity ${
//               i === 0 ? "ring-2 ring-[#896d51]" : "opacity-70 hover:opacity-100"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index) {
    setActiveIndex((index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }

  return (
    <div>
      {/* Main image */}
      <div className="w-full h-auto aspect-video bg-gray-400 relative shadow-xs">
        <div
          className="inset-0 absolute bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${GALLERY_IMAGES[activeIndex]})` }}
        />
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="rounded-full p-3 z-10 absolute top-1/2 -translate-y-1/2 bg-[#0F131F] -left-3 shadow-2xl border border-[#0F131F]bg-[#0F131F] group transition-all cursor-pointer hover:scale-105"
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
        {GALLERY_IMAGES.map((src, i) => (
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

function VenueDescription() {
  return (
    <div className="mt-8">
      <h4 className="font-crimson-pro text-3xl text-[#2c2218] mb-3">
        Tentang Paket
      </h4>
      <p className="text-sm text-black/60 leading-relaxed">
        Venue semi-indoor dan outdoor kami menawarkan suasana yang fleksibel dan
        elegan untuk berbagai jenis acara. Dengan desain terbuka yang menyatu
        dengan alam namun tetap terlindungi, venue ini memberikan pengalaman
        yang tak terlupakan bagi setiap tamu.
      </p>
      <p className="text-sm text-black/60 leading-relaxed mt-3">
        Tersedia area parkir luas, tim profesional siap membantu, dan berbagai
        pilihan konfigurasi ruangan sesuai kebutuhan acara Anda.
      </p>
    </div>
  );
}

function FacilitiesGrid() {
  return (
    <div className="mt-8">
      <h4 className="font-crimson-pro text-3xl text-[#0F131F] mb-4">
        Fasilitas
      </h4>
      <div className="grid grid-cols-4 gap-3">
        {FACILITIES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 p-3 border border-[#0F131F]/20 bg-white"
          >
            <Icon size={18} color="#0F131F" strokeWidth={1.5} />
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
  selectedDate,
  selectedStart,
  selectedEnd,
  bookedHours,
  onOpenCalendar,
  onStartChange,
  onEndChange,
}) {
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
          href="/paket/checkout"
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

function CalendarModal({ onClose, onDateSelect }) {
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
            Semi Indoor &amp; Outdoor
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
  selectedDate,
  selectedStart,
  selectedEnd,
  bookedHours,
  onOpenCalendar,
  onStartChange,
  onEndChange,
}) {
  return (
    <div className="w-full px-15 col-span-5">
      <h3 className="text-5xl font-crimson-pro text-[#0F131F]">
        Semi-Indoor &amp; Outdoor
      </h3>

      <div className="flex flex-wrap gap-2 mt-3">
        {VENUE_TAGS.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 border-2 border-[#0F131F]/70 text-[#0F131F]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-black/50 mt-3 w-[80%]">
        Cocok untuk meeting, ulang tahun, gathering, pengajian, dan acara
        lainnya.
      </p>

      <div className="flex mt-5 items-end gap-2">
        <span className="text-3xl font-semibold text-[#0F131F]">
          Rp2.000.000
        </span>
        <span className="line-through text-black/30 mb-0.5">Rp2.500.000</span>
        <span className="font-semibold text-[#0F131F]">/ 3 jam</span>
      </div>

      <p className="text-xs text-black/40 mt-1">
        *Harga belum termasuk katering dan dekorasi
      </p>

      <BookingCard
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

// ─── Page Component ───────────────────────────────────────────────────────────
export default function DetailPaketPage() {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");

  const bookedHours = selectedDate ? getBookedHours(selectedDate.events) : [];

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

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader />

      <section className="section-layout grid-12">
        {/* Left column — gallery + info */}
        <div className="col-span-7 w-full">
          <ImageGallery />
          <VenueDescription />
          <FacilitiesGrid />
          <BookingTerms />
        </div>

        {/* Right column — booking sidebar */}
        <VenueSidebar
          selectedDate={selectedDate}
          selectedStart={selectedStart}
          selectedEnd={selectedEnd}
          bookedHours={bookedHours}
          onOpenCalendar={() => setOpenCalendar(true)}
          onStartChange={handleStartChange}
          onEndChange={setSelectedEnd}
        />
      </section>

      {openCalendar && (
        <CalendarModal
          onClose={() => setOpenCalendar(false)}
          onDateSelect={handleDateSelect}
        />
      )}
    </main>
  );
}
