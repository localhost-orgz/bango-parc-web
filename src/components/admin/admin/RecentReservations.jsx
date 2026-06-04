"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

// ─── Format Helpers ──────────────────────────────────────────────────────────

function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const STATUS_MAP = {
  WAITING_DP: { bg: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Menunggu DP" },
  WAITING_CONFIRMATION: { bg: "bg-orange-50 text-orange-700 border-orange-200", label: "Menunggu Konfirmasi" },
  CONFIRMED: { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Dikonfirmasi" },
  ONGOING: { bg: "bg-blue-50 text-blue-700 border-blue-200", label: "Berjalan" },
  COMPLETED: { bg: "bg-purple-50 text-purple-700 border-purple-200", label: "Selesai" },
  CANCELLED: { bg: "bg-red-50 text-red-700 border-red-200", label: "Dibatalkan" },
  EXPIRED: { bg: "bg-stone-50 text-stone-500 border-stone-200", label: "Kedaluwarsa" },
};

function RecentReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        
        // Deduplicate list in case of duplicate entries
        const uniqueMap = {};
        const dataList = res.data.data || [];
        dataList.forEach((item) => {
          if (item && item.id) {
            uniqueMap[item.id] = item;
          }
        });
        const uniqueList = Object.values(uniqueMap);
        
        // Sort reservations by creation time / ID descending to get newest first
        uniqueList.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
          return b.id - a.id;
        });

        // Map to UI-friendly structure
        const mapped = uniqueList.map((r) => {
          const eventType = r.reservationType?.name || "Reguler";
          const customerName = r.customer?.fullName || "Guest";
          const dateStr = formatDateIndo(r.startDateTime);
          
          const cfg = STATUS_MAP[r.status] || {
            bg: "bg-zinc-50 border-zinc-200 text-zinc-600",
            label: r.status,
          };

          return {
            id: r.id,
            code: r.bookingCode || `BP-${r.id}`,
            event: `${eventType} (${customerName}) - ${dateStr}`,
            statusLabel: cfg.label,
            statusBg: cfg.bg,
          };
        });

        setReservations(mapped.slice(0, 5));
      } catch (err) {
        console.error("Gagal mengambil data reservasi terbaru:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
      <h3 className="font-crimson-pro text-xl text-[#0F131F]">
        Reservasi Terbaru
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0F131F]/10">
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Kode
              </th>
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Acara
              </th>
              <th className="text-right pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-black/40">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#896d51]" />
                    <span>Memuat reservasi...</span>
                  </div>
                </td>
              </tr>
            ) : reservations.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-black/40">
                  Tidak ada reservasi terbaru.
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[#0F131F]/5 last:border-0 hover:bg-[#896d51]/5 transition-colors duration-150"
                >
                  <td className="py-3 text-black/60 font-mono text-xs">
                    <Link href={`/admin/reservasi/${r.id}`} className="hover:text-[#896d51] underline font-bold">
                      {r.code}
                    </Link>
                  </td>
                  <td className="py-3 text-[#0F131F]">
                    <Link href={`/admin/reservasi/${r.id}`} className="hover:text-[#896d51] transition-colors">
                      {r.event}
                    </Link>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] font-semibold border ${r.statusBg}`}
                    >
                      {r.statusLabel}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentReservations;
