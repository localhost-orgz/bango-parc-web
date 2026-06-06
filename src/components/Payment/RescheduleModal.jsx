"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, CalendarDays, Clock, ArrowRight, Loader2 } from "lucide-react";
import BookingCalendar from "../BookingCalendar";
import axiosInstance from "@/lib/axios";

const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;
const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
})();

function isStartHourValid(time, pkgType, dayReservations) {
  const S = parseInt(time.split(":")[0]);
  const duration = pkgType === "wedding" ? 5 : 3;
  const E = S + duration;
  if (E > CLOSE_HOUR) return false;
  
  return !dayReservations.some((r) => {
    const exStart = new Date(r.startDateTime).getUTCHours();
    const exEnd = new Date(r.endDateTime).getUTCHours();
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
  
  return !dayReservations.some((r) => {
    const exStart = new Date(r.startDateTime).getUTCHours();
    const exEnd = new Date(r.endDateTime).getUTCHours();
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

// Custom select UI
function CustomSelect({ value, onChange, options, placeholder, disabled, label }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col text-left">
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
        <span className="text-[#0F131F]/60 text-[9px] ml-2">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && !disabled && (
        <>
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

export default function RescheduleModal({ isOpen, onClose, reservation, onSuccess, showNotification }) {
  const [allReservations, setAllReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reservationId = reservation?.id;
  const pkgType = reservation?.reservationType?.name?.toLowerCase() === "wedding" ? "wedding" : "reguler";

  useEffect(() => {
    const fetchReservations = async () => {
      if (!isOpen) return;
      try {
        setLoadingReservations(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        setAllReservations(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data reservasi:", err);
      } finally {
        setLoadingReservations(false);
      }
    };
    fetchReservations();
  }, [isOpen]);

  const activeReservations = allReservations.filter((r) => r.id !== Number(reservationId));

  const getDynamicBookedDates = () => {
    const computed = {};
    const active = activeReservations.filter(
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
    return activeReservations.filter((r) => {
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

  function handleDateSelect(date) {
    setSelectedDate(date);
    setSelectedStart("");
    setSelectedEnd("");
    setOpenCalendar(false);
  }

  const handleStartChange = (time) => {
    setSelectedStart(time);
    setSelectedEnd("");
  };

  const handleConfirmReschedule = async () => {
    if (!selectedDate || !selectedStart || !selectedEnd) return;
    
    const startDateTime = `${selectedDate.key}T${selectedStart}:00.000Z`;
    const endDateTime = `${selectedDate.key}T${selectedEnd}:00.000Z`;

    try {
      setIsSubmitting(true);
      await axiosInstance.patch(
        `https://bango-parc-service.vercel.app/api/reservation/${reservationId}/reschedule`,
        {
          startDateTime,
          endDateTime,
        }
      );
      
      if (showNotification) {
        showNotification(
          "success",
          "Reschedule Berhasil",
          "Jadwal reservasi Anda berhasil diubah!",
          () => {
            onSuccess(startDateTime, endDateTime);
            onClose();
          }
        );
      } else {
        alert("Jadwal reservasi Anda berhasil diubah!");
        onSuccess(startDateTime, endDateTime);
        onClose();
      }
    } catch (err) {
      console.error("Gagal melakukan reschedule:", err);
      const errMsg = err.response?.data?.message || "Gagal mengubah jadwal reservasi. Silakan hubungi admin.";
      if (showNotification) {
        showNotification("error", "Gagal Reschedule", errMsg);
      } else {
        alert(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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

  const isReady = selectedDate && selectedStart && selectedEnd;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-lg shadow-2xl p-6 border border-[#0F131F]/10 flex flex-col gap-5 rounded-none max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors cursor-pointer text-lg font-bold"
        >
          ✕
        </button>

        <div>
          <h3 className="font-crimson-pro text-2xl font-bold text-[#0F131F]">
            Reschedule Reservasi
          </h3>
          <p className="text-xs text-black/55 mt-1 leading-relaxed">
            Silakan pilih tanggal dan jam baru untuk reservasi Anda. Waktu sewa yang tersedia telah disesuaikan secara dinamis dengan jadwal acara lainnya.
          </p>
        </div>

        {loadingReservations ? (
          <div className="flex items-center justify-center gap-2 text-black/55 text-sm py-12">
            <Loader2 className="w-5 h-5 animate-spin text-[#896d51]" />
            <span>Memeriksa ketersediaan jadwal...</span>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Date picker */}
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase mb-2">
                Pilih Tanggal Baru
              </span>
              <div className="flex items-stretch gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setOpenCalendar(true)}
                  className="h-11 w-11 bg-[#0F131F] flex justify-center items-center shrink-0 hover:bg-[#896d51] transition-colors cursor-pointer"
                >
                  <CalendarDays size={20} strokeWidth={1.5} color="#fff" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenCalendar(true)}
                  className="flex flex-1 border border-[#0F131F]/20 items-center px-3 h-11 bg-white text-left hover:border-[#896d51] transition-colors cursor-pointer"
                >
                  <span className={`text-sm ${selectedDate ? "text-[#0F131F] font-semibold" : "text-black/35"}`}>
                    {selectedDate?.label ?? "Pilih tanggal acara baru"}
                  </span>
                </button>
              </div>
            </div>

            {/* Time Slot Picker */}
            {selectedDate && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase mb-1">
                  Pilih Sesi / Jam
                </span>

                <BookedEventsList events={selectedDate.events} />

                <div className="flex gap-4 items-start">
                  <CustomSelect
                    value={selectedStart}
                    onChange={handleStartChange}
                    options={startOptions}
                    placeholder="Jam mulai"
                    label="Check-in"
                  />

                  <ArrowRight className="shrink-0 mt-3" size={18} strokeWidth={1.5} color="#0F131F" />

                  <CustomSelect
                    value={selectedEnd}
                    onChange={setSelectedEnd}
                    options={endOptions}
                    placeholder={!selectedStart ? "Pilih jam mulai dulu" : "Jam selesai"}
                    disabled={!selectedStart}
                    label="Check-out"
                  />
                </div>

                <AvailabilityLegend dayReservations={dayReservations} />
              </div>
            )}

            {/* Warning Info */}
            <div className="p-3 bg-[#0F131F]/5 border border-[#0F131F]/15 rounded text-[11px] text-black/50 leading-relaxed">
              Jadwal operasional venue: <strong>08:00 – 22:00 WIB</strong>. Minimal durasi sewa adalah <strong>{pkgType === "wedding" ? 5 : 3} jam</strong>.
            </div>

            {/* Footer controls */}
            <div className="flex justify-end gap-3 pt-3 border-t border-[#0F131F]/10">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-[#0F131F]/15 hover:bg-black/5 text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReschedule}
                disabled={!isReady || isSubmitting}
                className="px-4 py-2 bg-[#0F131F] text-white hover:bg-[#896d51] text-xs font-semibold flex items-center gap-1.5 transition-all disabled:bg-black/10 disabled:text-black/40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Konfirmasi Reschedule"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Internal Calendar Overlay Dialog */}
      {openCalendar && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
          <div className="relative bg-white w-full max-w-sm border border-[#0F131F]/20 shadow-2xl p-5">
            <button
              onClick={() => setOpenCalendar(false)}
              className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors cursor-pointer text-lg font-bold"
            >
              ✕
            </button>
            <div className="mb-4">
              <h4 className="font-crimson-pro text-2xl text-[#0F131F] font-bold">
                Pilih Tanggal Reschedule
              </h4>
            </div>
            <BookingCalendar onDateSelect={handleDateSelect} bookedDates={dynamicBookedDates} />
          </div>
        </div>
      )}
    </div>
  );
}
