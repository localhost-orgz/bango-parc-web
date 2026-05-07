"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { bookedDates } from "@/constants/bookings";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ── colour tokens that match the Bango Parc palette ──────────────────────────
const STATUS_CONFIG = {
  wedding: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-400",
    badge: "bg-red-100 text-red-700",
    label: "Wedding",
    blockedMsg: "Tanggal ini sudah dipesan untuk pernikahan (full day).",
  },
  full: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
    label: "Penuh",
    blockedMsg: "Sudah ada 2 acara umum terjadwal. Tidak tersedia.",
  },
  half: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Tersisa 1 slot",
    blockedMsg: null,
  },
  available: {
    bg: "",
    border: "border-transparent",
    text: "",
    dot: null,
    badge: "bg-[#f5ede0] text-[#896d51]",
    label: "Tersedia",
    blockedMsg: null,
  },
};

export default function BookingCalendar({ onDateSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null); // "YYYY-MM-DD"

  const prevMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const nextMonth = useCallback(() => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  // Prevent navigating to months before the current one
  const isAtMinMonth =
    year === today.getFullYear() && month === today.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDaySlot = getFirstDayOfMonth(year, month); // 0 = Sun

  function handleDayClick(day) {
    const key = toKey(year, month, day);
    const data = bookedDates[key];
    const status = data?.status ?? "available";

    // Blocked statuses cannot be selected
    if (status === "wedding" || status === "full") return;

    setSelected(key);
    onDateSelect?.({
      key,
      day,
      month: month + 1,
      year,
      label: `${day} ${MONTHS[month]} ${year}`,
      status,
      events: data?.events ?? [],
    });
  }

  const selectedData = selected ? bookedDates[selected] : null;
  const selectedStatus =
    selectedData?.status ?? (selected ? "available" : null);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── Calendar card ── */}
      <div className="w-full border border-[#896d51]/30 bg-white select-none">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#896d51]/20">
          <button
            onClick={prevMonth}
            disabled={isAtMinMonth}
            className="h-8 w-8 flex items-center justify-center border border-[#896d51]/30 text-[#896d51] hover:bg-[#896d51]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <span className="font-crimson-text text-lg text-[#2c2218]">
            {MONTHS[month]} {year}
          </span>

          <button
            onClick={nextMonth}
            className="h-8 w-8 flex items-center justify-center border border-[#896d51]/30 text-[#896d51] hover:bg-[#896d51]/5 transition-colors"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* day-of-week headers */}
        <div className="grid grid-cols-7 px-3 pt-3">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] font-semibold uppercase tracking-wide text-black/35 pb-2"
            >
              {d}
            </div>
          ))}
        </div>

        {/* day cells */}
        <div className="grid grid-cols-7 px-3 pb-3 gap-1">
          {/* empty leading slots */}
          {Array.from({ length: firstDaySlot }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = toKey(year, month, day);
            const date = new Date(year, month, day);
            const isPast = date < today;
            const data = bookedDates[key];
            const status = data?.status ?? "available";
            const cfg = STATUS_CONFIG[status];
            const isSelected = selected === key;
            const isToday = date.getTime() === today.getTime();
            const isBlocked = status === "wedding" || status === "full";

            let cellClass =
              "relative flex flex-col items-center justify-center aspect-square rounded-none text-sm transition-all duration-100 ";

            if (isPast) {
              cellClass += "opacity-25 cursor-not-allowed text-black/40 ";
            } else if (isSelected) {
              cellClass +=
                "bg-[#896d51] text-white cursor-pointer border border-[#896d51] ";
            } else if (isBlocked) {
              cellClass += `${cfg.bg} ${cfg.text} border ${cfg.border} cursor-not-allowed `;
            } else if (status === "half") {
              cellClass += `${cfg.bg} ${cfg.text} border ${cfg.border} cursor-pointer hover:border-[#896d51]/60 hover:bg-emerald-100 `;
            } else {
              // available
              cellClass +=
                "cursor-pointer hover:bg-[#896d51]/5 hover:border hover:border-[#896d51]/40 text-[#2c2218] border border-transparent ";
            }

            return (
              <button
                key={key}
                onClick={() => !isPast && handleDayClick(day)}
                disabled={isPast || isBlocked}
                className={cellClass}
                aria-label={`${day} ${MONTHS[month]} ${year} – ${cfg.label}`}
                aria-pressed={isSelected}
              >
                <span
                  className={`text-xs font-medium leading-none ${isToday && !isSelected ? "underline underline-offset-2" : ""}`}
                >
                  {day}
                </span>

                {/* status dot */}
                {cfg.dot && !isPast && (
                  <span
                    className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-white/70" : cfg.dot}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* legend */}
        <div className="border-t border-[#896d51]/15 px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {[
            { dot: "bg-red-400", label: "Wedding (penuh)" },
            { dot: "bg-amber-400", label: "2 acara umum (penuh)" },
            { dot: "bg-emerald-400", label: "1 acara umum (tersisa)" },
          ].map(({ dot, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${dot}`} />
              <span className="text-[10px] text-black/45">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Selected date info panel ── */}
      {selected && (
        <div className="w-full border border-[#896d51]/30 bg-white p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays size={14} strokeWidth={1.5} color="#896d51" />
              <span className="text-sm font-semibold text-[#2c2218]">
                {(() => {
                  const [y, m, d] = selected.split("-");
                  return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]} ${y}`;
                })()}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${STATUS_CONFIG[selectedStatus ?? "available"].badge}`}
            >
              {STATUS_CONFIG[selectedStatus ?? "available"].label}
            </span>
          </div>

          {selectedData?.events?.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] uppercase tracking-wide text-black/40 font-semibold">
                Acara terjadwal
              </p>
              {selectedData.events.map((ev, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/10 px-2.5 py-1.5"
                >
                  <span>{ev.name}</span>
                  <span className="text-black/40 shrink-0 ml-2">{ev.time}</span>
                </div>
              ))}
            </div>
          )}

          {selectedStatus === "available" && (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2">
              Tanggal ini tersedia penuh. Anda dapat memesan sesi pagi maupun
              sore.
            </p>
          )}

          {selectedStatus === "half" && (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2">
              Masih tersedia 1 slot acara umum di tanggal ini.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
