"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowRight, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

// ─── Custom Badge Components ──────────────────────────────────────────────────

function ReservationStatusBadge({ status }) {
  const map = {
    WAITING_DP: {
      bg: "bg-yellow-50 border-yellow-200 text-yellow-700",
      label: "Menunggu DP",
    },
    WAITING_CONFIRMATION: {
      bg: "bg-orange-50 border-orange-200 text-orange-700",
      label: "Menunggu Konfirmasi",
    },
    CONFIRMED: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      label: "Dikonfirmasi",
    },
    ONGOING: {
      bg: "bg-blue-50 border-blue-200 text-blue-700",
      label: "Berjalan",
    },
    COMPLETED: {
      bg: "bg-purple-50 border-purple-200 text-purple-700",
      label: "Selesai",
    },
    CANCELLED: {
      bg: "bg-red-50 border-red-200 text-red-600",
      label: "Dibatalkan",
    },
    EXPIRED: {
      bg: "bg-stone-50 border-stone-200 text-stone-500",
      label: "Kedaluwarsa",
    },
  };
  const cfg = map[status] || {
    bg: "bg-zinc-50 border-zinc-200 text-zinc-600",
    label: status,
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wide rounded-none ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
}

function PaymentStatusBadge({ status }) {
  const map = {
    UNPAID: {
      bg: "bg-red-50 border-red-200 text-red-600",
      label: "Belum Bayar",
    },
    PARTIAL: {
      bg: "bg-amber-50 border-amber-200 text-amber-700",
      label: "Sebagian",
    },
    PAID: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      label: "Lunas",
    },
    OVERDUE: {
      bg: "bg-rose-50 border-rose-200 text-rose-700",
      label: "Terlambat",
    },
  };
  const cfg = map[status] || {
    bg: "bg-zinc-50 border-zinc-200 text-zinc-600",
    label: status,
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wide rounded-none ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
}

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

function formatTimeRange(startStr, endStr) {
  if (!startStr || !endStr) return "-";
  try {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(start.getUTCHours())}.${pad(start.getUTCMinutes())} - ${pad(end.getUTCHours())}.${pad(end.getUTCMinutes())}`;
  } catch {
    return "-";
  }
}

const STATUS_OPTIONS = [
  { value: "ALL", label: "Semua Status" },
  { value: "WAITING_DP", label: "Menunggu DP" },
  { value: "WAITING_CONFIRMATION", label: "Menunggu Konfirmasi" },
  { value: "CONFIRMED", label: "Dikonfirmasi" },
  { value: "ONGOING", label: "Berjalan" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
  { value: "EXPIRED", label: "Kedaluwarsa" },
];

const TYPE_OPTIONS = [
  { value: "ALL", label: "Semua Tipe" },
  { value: "REGULER", label: "Reguler" },
  { value: "WEDDING", label: "Wedding" },
];

const SORT_OPTIONS = [
  { value: "date-desc", label: "Tanggal Reservasi (Terbaru)" },
  { value: "date-asc", label: "Tanggal Reservasi (Terlama)" },
  { value: "created-desc", label: "Tanggal Pemesanan (Terbaru)" },
  { value: "created-asc", label: "Tanggal Pemesanan (Terlama)" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReservasiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Sort States
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        const rawList = res.data.data || [];
        const uniqueList = [];
        const seenIds = new Set();
        for (const item of rawList) {
          if (item && item.id && !seenIds.has(item.id)) {
            seenIds.add(item.id);
            uniqueList.push(item);
          }
        }
        setReservations(uniqueList);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data reservasi dari server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "ALL") count++;
    if (typeFilter !== "ALL") count++;
    if (sortBy !== "date-desc") count++;
    return count;
  }, [statusFilter, typeFilter, sortBy]);

  const handleResetFilters = () => {
    setStatusFilter("ALL");
    setTypeFilter("ALL");
    setSortBy("date-desc");
  };

  const filteredReservations = useMemo(() => {
    let result = [...reservations];

    // 1. Search Term Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.bookingCode?.toLowerCase().includes(q) ||
          r.customer?.fullName?.toLowerCase().includes(q) ||
          r.customer?.email?.toLowerCase().includes(q)
      );
    }

    // 2. Status Filter
    if (statusFilter !== "ALL") {
      result = result.filter((r) => r.status === statusFilter);
    }

    // 3. Type Filter
    if (typeFilter !== "ALL") {
      result = result.filter((r) => {
        const typeName = (r.reservationType?.name || "Reguler").toLowerCase();
        return typeName === typeFilter.toLowerCase();
      });
    }

    // 4. Sorting
    result.sort((a, b) => {
      let valA, valB;
      if (sortBy.startsWith("date")) {
        valA = a.startDateTime ? new Date(a.startDateTime).getTime() : 0;
        valB = b.startDateTime ? new Date(b.startDateTime).getTime() : 0;
      } else if (sortBy.startsWith("created")) {
        valA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        valB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      }

      if (sortBy.endsWith("-desc")) {
        return valB - valA;
      } else {
        return valA - valB;
      }
    });

    return result;
  }, [reservations, searchTerm, statusFilter, typeFilter, sortBy]);

  if (error) {
    return <div className="p-8 text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="-m-4 md:-m-6 p-4 md:p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-crimson-pro text-3xl text-[#0F131F] font-semibold">Data Reservasi</h1>
          <p className="text-black/40 text-sm mt-1">
            Kelola semua pesanan dan jadwal venue kamu di sini.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
          <input
            type="text"
            placeholder="Cari nama pemesan atau kode booking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors placeholder:text-black/25"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 border transition-all duration-200 text-sm font-semibold relative cursor-pointer ${
            showFilters || activeFiltersCount > 0
              ? "border-[#0F131F] bg-[#0F131F] text-white"
              : "border-[#0F131F]/15 hover:border-[#0F131F]/30 bg-white text-black/60"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className={`inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full ${
              showFilters || activeFiltersCount > 0
                ? "bg-white text-[#0F131F]"
                : "bg-[#0F131F] text-white"
            }`}>
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Collapsible Filter Panel */}
      {showFilters && (
        <div className="p-4 md:p-6 mb-6 bg-[#f9f8f6] border border-[#0F131F]/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#0F131F]/40 uppercase tracking-widest">
                Status Reservasi
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors text-[#0F131F]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#0F131F]/40 uppercase tracking-widest">
                Tipe Reservasi
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors text-[#0F131F]"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#0F131F]/40 uppercase tracking-widest">
                Urutkan Tanggal
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors text-[#0F131F]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex justify-end mt-4 pt-4 border-t border-[#0F131F]/5">
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white border border-[#0F131F]/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[900px] text-left">
          <thead className="sticky top-0 bg-white z-10 border-b border-[#0F131F]/10">
            <tr>
              {[
                { label: "Kode", sortKey: null },
                { label: "Customer", sortKey: null },
                { label: "Tipe", sortKey: null },
                { label: "Tanggal", sortKey: "date" },
                { label: "Waktu (UTC)", sortKey: null },
                { label: "Total Harga", sortKey: null },
                { label: "Status", sortKey: null },
                { label: "Pembayaran", sortKey: null },
                { label: "Aksi", sortKey: null },
              ].map((head) => {
                if (head.sortKey === "date") {
                  const isSorted = sortBy.startsWith("date");
                  const isDesc = sortBy === "date-desc";
                  return (
                    <th
                      key={head.label}
                      onClick={() => setSortBy(isSorted && isDesc ? "date-asc" : "date-desc")}
                      className="px-5 py-3 text-[10px] font-semibold text-[#0F131F]/60 hover:text-[#0F131F] uppercase tracking-widest whitespace-nowrap cursor-pointer transition-colors group select-none"
                    >
                      <div className="flex items-center gap-1">
                        <span>{head.label}</span>
                        <span className="text-[#0F131F]/30 group-hover:text-[#0F131F]/60">
                          {isSorted ? (isDesc ? "↓" : "↑") : "↕"}
                        </span>
                      </div>
                    </th>
                  );
                }
                return (
                  <th
                    key={head.label}
                    className="px-5 py-3 text-[10px] font-semibold text-black/40 uppercase tracking-widest whitespace-nowrap"
                  >
                    {head.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-[#0F131F]/5 last:border-0">
                  <td className="px-5 py-4"><div className="h-4 bg-black/5 animate-pulse rounded w-16" /></td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 bg-black/5 animate-pulse rounded w-24" />
                      <div className="h-3 bg-black/5 animate-pulse rounded w-32" />
                    </div>
                  </td>
                  <td className="px-5 py-4"><div className="h-4 bg-black/5 animate-pulse rounded w-16" /></td>
                  <td className="px-5 py-4"><div className="h-4 bg-black/5 animate-pulse rounded w-20" /></td>
                  <td className="px-5 py-4"><div className="h-4 bg-black/5 animate-pulse rounded w-24" /></td>
                  <td className="px-5 py-4"><div className="h-4 bg-black/5 animate-pulse rounded w-20" /></td>
                  <td className="px-5 py-4"><div className="h-6 bg-black/5 animate-pulse rounded w-16" /></td>
                  <td className="px-5 py-4"><div className="h-6 bg-black/5 animate-pulse rounded w-16" /></td>
                  <td className="px-5 py-4"><div className="h-8 bg-black/5 animate-pulse rounded w-20" /></td>
                </tr>
              ))
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-16 text-sm text-black/30 bg-white">
                  Tidak ada data reservasi ditemukan.
                </td>
              </tr>
            ) : (
              filteredReservations.map((item) => {
                const totalVal = Number(item.totalPrice) || 0;
                return (
                  <tr
                    key={item.id}
                    className="border-b border-[#0F131F]/5 last:border-0 hover:bg-[#f9f8f6] border-l-2 border-l-transparent transition-colors"
                  >
                    {/* Booking Code */}
                    <td className="px-5 py-4 whitespace-nowrap font-mono text-xs font-semibold text-[#0F131F]">
                      {item.bookingCode}
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-[#0F131F] text-sm">
                          {item.customer?.fullName || "Guest"}
                        </p>
                        <p className="text-[10px] text-black/35 mt-0.5">
                          {item.customer?.email || "No Email"}
                        </p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4 whitespace-nowrap text-[#0F131F]/80">
                      {item.reservationType?.name || "Reguler"}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 whitespace-nowrap text-black/60">
                      {formatDateIndo(item.startDateTime)}
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4 whitespace-nowrap text-black/60 font-mono text-xs">
                      {formatTimeRange(item.startDateTime, item.endDateTime)}
                    </td>

                    {/* Total Price */}
                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-[#0F131F]">
                      Rp{totalVal.toLocaleString("id-ID")}
                    </td>

                    {/* Reservation Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <ReservationStatusBadge status={item.status} />
                    </td>

                    {/* Payment Status */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={item.paymentStatus} />
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/reservasi/${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-[#0F131F]/20 text-[#0F131F]/60 hover:border-[#0F131F] hover:text-[#0F131F] bg-white transition-colors"
                      >
                        Detail <ArrowRight size={11} strokeWidth={2.5} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
