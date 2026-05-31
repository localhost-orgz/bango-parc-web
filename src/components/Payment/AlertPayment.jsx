"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";

const AlertPayment = ({ reservation }) => {
  // Initialize mock start time on client-side once
  const [mockStartTime] = useState(() => {
    if (typeof window !== "undefined") {
      let mockStart = localStorage.getItem("bango_parc_payment_timer_start");
      if (!mockStart) {
        mockStart = Date.now().toString();
        localStorage.setItem("bango_parc_payment_timer_start", mockStart);
      }
      return Number(mockStart);
    }
    return Date.now();
  });

  // Calculate target time and total duration synchronously from props
  let targetTime = null;
  let totalDuration = 24 * 60 * 60 * 1000;

  if (reservation) {
    const schedules = reservation.paymentSchedules || [];
    if (schedules.length > 0) {
      const sortedSchedules = [...schedules].sort(
        (a, b) => a.installmentNumber - b.installmentNumber
      );
      const firstSched = sortedSchedules[0];
      const dueDateStr = firstSched?.dueDate || firstSched?.dueDateTime || firstSched?.due_date;
      if (dueDateStr) {
        targetTime = new Date(dueDateStr).getTime();
        if (reservation.createdAt) {
          const created = new Date(reservation.createdAt).getTime();
          totalDuration = Math.max(1000, targetTime - created);
        }
      }
    }

    if (!targetTime && reservation.createdAt) {
      targetTime = new Date(reservation.createdAt).getTime() + (24 * 60 * 60 * 1000);
    }
  }

  // Fallback if targetTime is not calculated
  if (!targetTime) {
    targetTime = mockStartTime + (24 * 60 * 60 * 1000);
  }

  // Ticking time state (initialize directly to Date.now() to avoid null/skeleton delay)
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle various states based on reservation status
  if (reservation) {
    if (reservation.status === "WAITING_CONFIRMATION") {
      return (
        <div className="flex items-start gap-3 p-4 border border-blue-200 bg-blue-50/80 backdrop-blur-sm shadow-sm transition-all duration-300">
          <Info size={16} className="text-blue-600 shrink-0 mt-0.5 animate-pulse" />
          <div className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
              Menunggu Konfirmasi
            </span>
            <p className="text-xs text-blue-700 leading-relaxed">
              Bukti pembayaran Anda telah dikirim dan sedang diverifikasi oleh admin. Kami akan segera menginfokan status pemesanan Anda.
            </p>
          </div>
        </div>
      );
    }

    if (reservation.status === "CONFIRMED" || reservation.status === "ONGOING" || reservation.status === "COMPLETED") {
      return (
        <div className="flex items-start gap-3 p-4 border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm shadow-sm transition-all duration-300">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              Pemesanan Terkonfirmasi
            </span>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Pembayaran Anda berhasil diverifikasi. Reservasi venue Anda telah resmi terkonfirmasi!
            </p>
          </div>
        </div>
      );
    }

    if (reservation.status === "CANCELLED" || reservation.status === "EXPIRED") {
      return (
        <div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50/80 backdrop-blur-sm shadow-sm transition-all duration-300">
          <XCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 text-left">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
              Reservasi Tidak Aktif
            </span>
            <p className="text-xs text-red-700 leading-relaxed">
              Reservasi ini telah dibatalkan atau kedaluwarsa. Silakan lakukan pemesanan ulang di halaman paket.
            </p>
          </div>
        </div>
      );
    }
  }

  const timeLeft = Math.max(0, targetTime - now);

  // Expired state
  if (timeLeft <= 0) {
    return (
      <div className="flex flex-col gap-3 p-4 border border-red-200 bg-red-50/80 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="flex items-start gap-2.5">
          <XCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
              Batas Waktu Habis
            </span>
            <p className="text-xs text-red-700 leading-relaxed mt-0.5">
              Batas waktu 24 jam untuk pembayaran telah habis. Pemesanan ini otomatis dibatalkan oleh sistem.
            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-red-200 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 w-full" />
        </div>
      </div>
    );
  }

  // Active timer calculations
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const percentage = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));
  const isUrgent = hours < 6;

  // Indonesian deadline date formatting
  const formatDeadlineDate = (timestamp) => {
    const date = new Date(timestamp);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const dayName = days[date.getDay()];
    const dateNum = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hoursPart = String(date.getHours()).padStart(2, "0");
    const minutesPart = String(date.getMinutes()).padStart(2, "0");

    return `${dayName}, ${dateNum} ${monthName} ${year} pukul ${hoursPart}:${minutesPart}`;
  };

  return (
    <div
      className={`flex flex-col gap-3.5 p-4 sm:p-5 border shadow-sm transition-all duration-500 text-left ${
        isUrgent
          ? "border-rose-200 bg-gradient-to-br from-rose-50 to-red-50/30"
          : "border-amber-200 bg-gradient-to-br from-amber-50/80 to-orange-50/30"
      }`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-2.5">
        {isUrgent ? (
          <AlertTriangle
            size={16}
            className="text-rose-600 shrink-0 animate-bounce"
          />
        ) : (
          <Clock
            size={16}
            className="text-amber-600 shrink-0 animate-pulse"
          />
        )}
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            isUrgent ? "text-rose-800" : "text-amber-800"
          }`}
        >
          {isUrgent ? "Segera Lakukan Pembayaran" : "Batas Waktu Pembayaran"}
        </span>
      </div>

      {/* Countdown Timer Display */}
      <div className="flex items-center gap-2 mt-1">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className={`flex items-center justify-center w-10 h-10 font-mono text-lg font-bold shadow-sm border ${
            isUrgent ? "bg-rose-600 text-white border-rose-700" : "bg-white text-amber-900 border-amber-200"
          }`}>
            {String(hours).padStart(2, "0")}
          </div>
          <span className="text-[9px] uppercase tracking-wider text-black/35 mt-1 font-semibold">jam</span>
        </div>
        <span className={`text-lg font-bold font-mono ${isUrgent ? "text-rose-600 animate-pulse" : "text-amber-700"}`}>:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className={`flex items-center justify-center w-10 h-10 font-mono text-lg font-bold shadow-sm border ${
            isUrgent ? "bg-rose-600 text-white border-rose-700" : "bg-white text-amber-900 border-amber-200"
          }`}>
            {String(minutes).padStart(2, "0")}
          </div>
          <span className="text-[9px] uppercase tracking-wider text-black/35 mt-1 font-semibold">menit</span>
        </div>
        <span className={`text-lg font-bold font-mono ${isUrgent ? "text-rose-600 animate-pulse" : "text-amber-700"}`}>:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className={`flex items-center justify-center w-10 h-10 font-mono text-lg font-bold shadow-sm border ${
            isUrgent ? "bg-rose-600 text-white border-rose-700" : "bg-white text-amber-900 border-amber-200"
          }`}>
            {String(seconds).padStart(2, "0")}
          </div>
          <span className="text-[9px] uppercase tracking-wider text-black/35 mt-1 font-semibold">detik</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mt-1">
        <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              isUrgent
                ? "bg-gradient-to-r from-rose-500 to-red-600"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
          />
        </div>
      </div>

      {/* Helper text */}
      <p className={`text-[11px] leading-relaxed mt-1 ${
        isUrgent ? "text-rose-700/80 font-medium" : "text-amber-800/80"
      }`}>
        Lakukan transfer pembayaran sebelum{" "}
        <strong className="font-semibold text-black/85 underline underline-offset-2">
          {formatDeadlineDate(targetTime)}
        </strong>{" "}
        agar pesanan Anda tidak dibatalkan secara otomatis.
      </p>
    </div>
  );
};

export default AlertPayment;
