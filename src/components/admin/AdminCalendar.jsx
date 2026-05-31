"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Loader2 } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

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

const STATUS_CONFIG = {
  wedding: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    dot: "bg-red-400",
    badge: "bg-red-100 text-red-700",
    label: "Wedding",
  },
  full: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700",
    label: "Penuh",
  },
  half: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Tersisa 1 slot",
  },
  available: {
    bg: "",
    border: "border-transparent",
    text: "",
    dot: null,
    badge: "bg-[#f5ede0] text-[#896d51]",
    label: "Tersedia",
  },
};

export default function AdminCalendar({ onDateSelect }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null); // "YYYY-MM-DD"

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        setReservations(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data reservasi untuk kalender:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  // Compute dynamic booked dates dictionary YYYY-MM-DD
  const activeBookedDates = (() => {
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
        id: r.id,
        name: isWedding
          ? `Wedding ${r.customer?.fullName || "Guest"}`
          : `Acara ${r.customer?.fullName || "Guest"}`,
        time: timeStr,
        isWedding,
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
  })();

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDaySlot = getFirstDayOfMonth(year, month); // 0 = Sun

  function handleDayClick(day) {
    const key = toKey(year, month, day);
    const data = activeBookedDates[key];
    const status = data?.status ?? "available";

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

  const selectedData = selected ? activeBookedDates[selected] : null;
  const selectedStatus = selectedData?.status ?? (selected ? "available" : null);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── Calendar card ── */}
      <div className="w-full border border-[#896d51]/30 bg-white select-none">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#896d51]/20">
          <button
            onClick={prevMonth}
            className="h-8 w-8 flex items-center justify-center border border-[#896d51]/30 text-[#896d51] hover:bg-[#896d51]/5 transition-colors cursor-pointer"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          <span className="font-crimson-text text-lg text-[#2c2218] flex items-center gap-2">
            {MONTHS[month]} {year}
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#896d51]" />}
          </span>

          <button
            onClick={nextMonth}
            className="h-8 w-8 flex items-center justify-center border border-[#896d51]/30 text-[#896d51] hover:bg-[#896d51]/5 transition-colors cursor-pointer"
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
            const data = activeBookedDates[key];
            const status = data?.status ?? "available";
            const cfg = STATUS_CONFIG[status];
            const isSelected = selected === key;
            const isToday = date.getTime() === today.getTime();

            let cellClass =
              "relative flex flex-col items-center justify-center aspect-square rounded-none text-sm transition-all duration-100 cursor-pointer ";

            if (isSelected) {
              cellClass +=
                "bg-[#896d51] text-white border border-[#896d51] ";
            } else if (status !== "available") {
              cellClass += `${cfg.bg} ${cfg.text} border ${cfg.border} hover:border-[#896d51]/60 `;
            } else {
              // available
              cellClass +=
                "hover:bg-[#896d51]/5 hover:border hover:border-[#896d51]/40 text-[#2c2218] border border-transparent ";
            }

            if (isPast && !isSelected) {
              cellClass += "opacity-60 ";
            }

            return (
              <button
                key={key}
                onClick={() => handleDayClick(day)}
                className={cellClass}
                aria-label={`${day} ${MONTHS[month]} ${year} – ${cfg.label}`}
                aria-pressed={isSelected}
              >
                <span
                  className={`text-xs font-medium leading-none ${isToday && !isSelected ? "underline underline-offset-2 font-bold" : ""}`}
                >
                  {day}
                </span>

                {/* status dot */}
                {cfg.dot && (
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

          {selectedData?.events?.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              <p className="text-[10px] uppercase tracking-wide text-black/40 font-semibold">
                Acara terjadwal (Klik untuk detail)
              </p>
              {selectedData.events.map((ev, idx) => (
                <Link
                  key={idx}
                  href={`/admin/reservasi/${ev.id}`}
                  className="flex items-center justify-between text-xs text-[#0f131f] hover:text-[#896d51] bg-[#896d51]/5 hover:bg-[#896d51]/10 border border-[#896d51]/10 px-2.5 py-2.5 transition-all cursor-pointer font-medium"
                >
                  <span>{ev.name}</span>
                  <span className="text-black/40 shrink-0 ml-2 font-mono">{ev.time}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2">
              Tanggal ini kosong dan tidak memiliki acara terjadwal.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
