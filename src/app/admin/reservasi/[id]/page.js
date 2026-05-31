"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Calendar, Clock, CreditCard, User, Mail, Phone, Building2 } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

// ─── Badge Formatters ─────────────────────────────────────────────────────────

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
    <span className={`inline-flex items-center px-2.5 py-1 border text-[11px] font-bold uppercase tracking-wide rounded-none ${cfg.bg}`}>
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
    <span className={`inline-flex items-center px-2.5 py-1 border text-[11px] font-bold uppercase tracking-wide rounded-none ${cfg.bg}`}>
      {cfg.label}
    </span>
  );
}

// ─── Format Helpers ──────────────────────────────────────────────────────────

function formatDateFullIndo(dateStr) {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatTimeOnly(dateStr) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
  } catch {
    return "";
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReservationDetailPage() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
        const found = res.data.data?.find((r) => r.id === Number(id));
        if (found) {
          setReservation(found);
        } else {
          setError("Reservasi tidak ditemukan.");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat detail reservasi.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-[#f3f4f7] min-h-screen font-sans">
        {/* Top Navbar Skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <div className="h-5 w-20 bg-black/5 animate-pulse rounded" />
          <div className="h-5 w-24 bg-black/5 animate-pulse rounded" />
        </div>

        {/* Header Info Skeleton */}
        <div className="bg-white border border-[#0F131F]/10 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-64 bg-black/5 animate-pulse rounded" />
            <div className="h-4 w-40 bg-black/5 animate-pulse rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-black/5 animate-pulse rounded" />
            <div className="h-6 w-20 bg-black/5 animate-pulse rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
              <div className="h-4 w-28 bg-black/5 animate-pulse rounded" />
              <div className="flex flex-col gap-4 mt-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-black/5 animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1.5 flex-1">
                      <div className="h-3 w-16 bg-black/5 animate-pulse rounded" />
                      <div className="h-4 w-32 bg-black/5 animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen bg-[#f3f4f7] flex flex-col gap-4 items-center justify-center">
        <p className="text-red-500 text-sm font-semibold">{error}</p>
        <Link href="/admin/reservasi" className="px-4 py-2 border border-[#0F131F] text-xs font-bold uppercase tracking-wider text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors bg-white">
          Kembali ke List
        </Link>
      </div>
    );
  }

  const priceArea = Number(reservation.totalAreaPrice) || 0;
  const priceAddon = Number(reservation.totalAddonPrice) || 0;
  const priceTotal = Number(reservation.totalPrice) || 0;
  const amountPaid = Number(reservation.paidAmount) || 0;
  const amountRemaining = Number(reservation.remainingBalance) || 0;

  return (
    <div className="p-6 bg-[#f3f4f7] min-h-screen font-sans">
      {/* Top Navbar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/reservasi"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F131F]/60 hover:text-[#0F131F] transition-colors"
        >
          <ArrowLeft size={14} /> Kembali
        </Link>
        <span className="text-[10px] font-bold text-black/30 bg-[#0F131F]/5 border border-[#0F131F]/10 px-2.5 py-1 uppercase tracking-wider">
          ID: {reservation.id}
        </span>
      </div>

      {/* Header Info */}
      <div className="bg-white border border-[#0F131F]/10 p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-crimson-pro text-3xl text-[#0F131F] font-semibold">
            Booking {reservation.bookingCode}
          </h1>
          <p className="text-xs text-black/40 mt-1">
            Dibuat pada {formatDateFullIndo(reservation.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <ReservationStatusBadge status={reservation.status} />
          <PaymentStatusBadge status={reservation.paymentStatus} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information Card */}
        <div className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2">
            Informasi Customer
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <User size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Nama Lengkap</p>
                <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                  {reservation.customer?.fullName || "Guest"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <Mail size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Alamat Email</p>
                <p className="text-sm font-mono text-black/70 mt-0.5 break-all">
                  {reservation.customer?.email || "Tidak ada email"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <Phone size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Nomor WhatsApp</p>
                <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                  {reservation.customer?.whatsappNumber || "Tidak ada nomor WA"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Specs Card */}
        <div className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2">
            Rincian Reservasi
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <Building2 size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Tipe & Area</p>
                <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                  Tipe {reservation.reservationType?.name || "Reguler"}
                </p>
                <p className="text-xs text-black/50 mt-0.5">
                  {reservation.areaReservations?.map((ar) => ar.area?.name).join(", ") || "Seluruh Area"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <Calendar size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Tanggal Pelaksanaan</p>
                <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                  {formatDateFullIndo(reservation.startDateTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0">
                <Clock size={15} />
              </div>
              <div>
                <p className="text-xs text-black/35">Waktu Reservasi (UTC)</p>
                <p className="text-sm font-semibold text-[#0F131F] mt-0.5 font-mono">
                  {formatTimeOnly(reservation.startDateTime)} - {formatTimeOnly(reservation.endDateTime)}
                </p>
                <p className="text-xs text-black/40 mt-0.5">
                  Durasi {reservation.reservationType?.durationIntervalHour || 0} Jam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Payments Card */}
        <div className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2">
            Rincian Pembayaran
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs border-b border-[#0F131F]/5 pb-2">
              <span className="text-black/50">Harga Area</span>
              <span className="font-semibold text-black/80">Rp{priceArea.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between text-xs border-b border-[#0F131F]/5 pb-2">
              <span className="text-black/50">Harga Add-on</span>
              <span className="font-semibold text-black/80">Rp{priceAddon.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between text-sm font-bold border-b-2 border-double border-[#0F131F]/10 pb-2">
              <span className="text-[#0F131F]">Total Tagihan</span>
              <span className="text-[#0F131F]">Rp{priceTotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 p-2 mt-2">
              <span>Sudah Dibayar</span>
              <span className="font-bold">Rp{amountPaid.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#896d51] bg-[#896d51]/5 border border-[#896d51]/15 p-2">
              <span>Sisa Tagihan</span>
              <span className="font-bold">Rp{amountRemaining.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
