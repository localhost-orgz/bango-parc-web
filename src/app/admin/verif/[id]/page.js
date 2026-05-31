"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

// Formatting Helpers
const formatSubmittedAt = (dateStr) => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const pad = (n) => n.toString().padStart(2, "0");
    const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${datePart}, ${timePart}`;
  } catch {
    return dateStr;
  }
};

const mapApiPaymentToUi = (apiItem) => {
  const sched = apiItem.paymentSchedule || {};
  const resv = sched.reservation || apiItem.reservation || {};
  const cust = resv.customer || apiItem.customer || {};

  const orderer = {
    name: apiItem.senderName || cust.fullName || apiItem.orderer?.name || "Guest",
    email: cust.email || apiItem.orderer?.email || "-",
    phone: cust.whatsappNumber || apiItem.orderer?.phone || "-",
    avatar: (apiItem.senderName || cust.fullName || apiItem.orderer?.name || "G")[0].toUpperCase()
  };

  const areas = resv.areaReservations?.map(ar => ar.area?.name).filter(Boolean) || [];
  const areaName = areas.length > 0 ? areas.join(" & ") : (apiItem.area || "Semi-Indoor & Outdoor");

  const reservationType = resv.reservationType?.name || apiItem.type || "Reguler";

  const startDt = resv.startDateTime || apiItem.startDateTime;
  const endDt = resv.endDateTime || apiItem.endDateTime;
  
  let formattedDate = apiItem.date || "-";
  let formattedTime = apiItem.time || "-";
  let duration = apiItem.duration || 0;

  if (startDt) {
    try {
      const dateObj = new Date(startDt);
      formattedDate = dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      if (endDt) {
        const endDateObj = new Date(endDt);
        const pad = (n) => n.toString().padStart(2, "0");
        const sh = pad(dateObj.getUTCHours());
        const sm = pad(dateObj.getUTCMinutes());
        const eh = pad(endDateObj.getUTCHours());
        const em = pad(endDateObj.getUTCMinutes());
        formattedTime = `${sh}:${sm} – ${eh}:${em}`;
        
        duration = Math.round((endDateObj - dateObj) / (1000 * 60 * 60));
      }
    } catch (e) {
      console.error(e);
    }
  }

  let payType = apiItem.paymentType || (sched.installmentNumber === 1 ? "DP" : "Pelunasan") || "DP";
  if (payType === "FULL" || payType === "Lunas" || payType === "full") {
    payType = "Pelunasan";
  } else if (payType === "DP" || payType === "dp" || payType === "PARTIAL") {
    payType = "DP";
  }

  let status = "Pending";
  const rawStatus = (apiItem.approvalStatus || apiItem.status || "PENDING").toUpperCase();
  if (rawStatus === "APPROVED" || rawStatus === "VERIFIED") {
    status = "Approved";
  } else if (rawStatus === "REJECTED" || rawStatus === "DENIED" || rawStatus === "TOLAK") {
    status = "Rejected";
  }

  const subTime = apiItem.uploadedAt || apiItem.createdAt;

  return {
    id: resv.bookingCode || apiItem.bookingCode || `BP-${resv.id || apiItem.id}`,
    apiId: apiItem.id,
    orderer,
    area: areaName,
    type: reservationType,
    date: formattedDate,
    time: formattedTime,
    duration,
    paymentAmount: Number(apiItem.amount || 0),
    paymentType: payType,
    totalAmount: Number(resv.totalPrice || apiItem.totalAmount || 0),
    status,
    submittedAt: subTime ? formatSubmittedAt(subTime) : "-",
    evidenceUrl: apiItem.proofImage || apiItem.evidenceUrl || apiItem.proofImageUrl || apiItem.imageUrl || "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop"
  };
};

export default function PaymentVerifDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/payment");
        const apiData = res.data?.result || res.data?.data || [];
        const found = apiData.find((p) => p.id === Number(id));
        if (found) {
          setPayment(mapApiPaymentToUi(found));
        } else {
          setError("Data verifikasi pembayaran tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal memuat detail verifikasi pembayaran:", err);
        setError("Gagal memuat detail verifikasi pembayaran.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPaymentDetails();
    }
  }, [id]);

  const handleApprove = async () => {
    if (!payment) return;
    try {
      setIsSubmitting(true);
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/approve", {
        paymentProofId: Number(payment.apiId)
      });
      setPayment(prev => ({ ...prev, status: "Approved" }));
      alert("Pembayaran berhasil diverifikasi!");
    } catch (err) {
      console.error("Gagal menyetujui pembayaran:", err);
      alert(err.response?.data?.error || "Gagal menyetujui verifikasi pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!payment) return;
    if (!rejectionReason.trim()) {
      alert("Silakan masukkan alasan penolakan.");
      return;
    }
    try {
      setIsSubmitting(true);
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/reject", {
        paymentProofId: Number(payment.apiId),
        rejectionReason: rejectionReason.trim()
      });
      setPayment(prev => ({ ...prev, status: "Rejected" }));
      setRejectMode(false);
      alert("Pembayaran berhasil ditolak.");
    } catch (err) {
      console.error("Gagal menolak pembayaran:", err);
      alert(err.response?.data?.error || "Gagal menolak verifikasi pembayaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = async () => {
    if (!payment) return;
    const url = payment.evidenceUrl;
    const filename = `bukti-pembayaran-${payment.id}.jpg`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Gagal mengunduh gambar secara langsung:", err);
      window.open(url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] text-black/50 text-sm gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#0F131F]" />
        Memuat detail verifikasi pembayaran...
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="p-8 flex flex-col gap-4 items-center justify-center min-h-[400px]">
        <p className="text-red-500 text-sm font-semibold">{error || "Data tidak ditemukan."}</p>
        <Link href="/admin/verifikasi" className="px-4 py-2 border border-[#0F131F] text-xs font-bold uppercase tracking-wider text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors bg-white">
          Kembali ke List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto font-sans p-2">
      {/* Top Navbar */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin/verifikasi"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F131F]/60 hover:text-[#0F131F] transition-colors"
        >
          <ArrowLeft size={14} /> Kembali ke List
        </Link>
        <span className="text-[10px] font-bold text-black/30 bg-[#0F131F]/5 border border-[#0F131F]/10 px-2.5 py-1 uppercase tracking-wider">
          PAYMENT ID: {payment.apiId}
        </span>
      </div>

      {/* Header Info */}
      <div className="bg-white border border-[#0F131F]/10 p-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-crimson-pro text-3xl text-[#0F131F] font-semibold">
            Detail Verifikasi {payment.id}
          </h1>
          <p className="text-xs text-black/40 mt-1">
            Diajukan pada {payment.submittedAt}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span className={`inline-flex items-center px-3 py-1 border text-[11px] font-bold uppercase tracking-wide rounded-none ${
            payment.status === "Pending"
              ? "bg-amber-50 border-amber-200 text-amber-700"
              : payment.status === "Approved"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
          }`}>
            {payment.status === "Pending" ? "Pending" : payment.status === "Approved" ? "Disetujui" : "Ditolak"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Data Details (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Customer Information Card */}
          <div className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2">
              Informasi Pemesan
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F131F] flex items-center justify-center text-white font-semibold text-sm">
                  {payment.orderer.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F131F]">
                    {payment.orderer.name}
                  </p>
                  <p className="text-xs text-black/40">Customer / Pengirim</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#0F131F]/5 pt-4">
                <div className="flex items-center gap-2.5 text-xs text-black/60">
                  <Mail size={14} className="text-[#896d51]" />
                  <span className="break-all">{payment.orderer.email}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-black/60">
                  <Phone size={14} className="text-[#896d51]" />
                  <span>{payment.orderer.phone}</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0 mt-0.5">
                    <Building2 size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-black/35">Tipe Reservasi</p>
                    <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                      Tipe {payment.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0 mt-0.5">
                    <Calendar size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-black/35">Tanggal Pelaksanaan</p>
                    <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                      {payment.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-[#0F131F]/5 pt-3">
                <div className="w-8 h-8 rounded-full bg-[#0F131F]/5 flex items-center justify-center text-[#0F131F] shrink-0 mt-0.5">
                  <Clock size={15} />
                </div>
                <div>
                  <p className="text-xs text-black/35">Waktu Reservasi</p>
                  <p className="text-sm font-semibold text-[#0F131F] mt-0.5">
                    {payment.time} <span className="text-xs font-normal text-black/40 ml-1">({payment.duration} jam)</span>
                  </p>
                </div>
              </div>

              {/* Area reserved details */}
              <div className="flex items-start gap-3 border-t border-[#0F131F]/5 pt-3">
                <div className="w-8 h-8 rounded-full bg-[#896d51]/10 flex items-center justify-center text-[#896d51] shrink-0 mt-0.5">
                  <Building2 size={15} />
                </div>
                <div>
                  <p className="text-xs text-black/35">Area yang Dipesan</p>
                  <p className="text-sm font-semibold text-[#896d51] mt-0.5">
                    {payment.area}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Payment Info */}
          <div className="bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2">
              Rincian Pembayaran
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/50">Tipe Pembayaran</span>
                <span className="font-semibold text-[#0F131F] bg-[#0F131F]/5 px-2.5 py-0.5 border border-[#0F131F]/10 text-xs">
                  {payment.paymentType}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm border-t border-[#0F131F]/5 pt-3">
                <span className="text-black/50">Jumlah yang Ditransfer</span>
                <span className="font-bold text-[#0F131F] text-lg">
                  Rp{payment.paymentAmount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs border-t border-[#0F131F]/5 pt-2">
                <span className="text-black/40">Total Booking Keseluruhan</span>
                <span className="font-medium text-black/60">
                  Rp{payment.totalAmount.toLocaleString("id-ID")}
                </span>
              </div>

              {payment.paymentType === "DP" && (
                <div className="flex items-center justify-between text-xs bg-amber-50 border border-amber-100 p-2.5 mt-1 text-amber-700">
                  <span>Sisa Pelunasan</span>
                  <span className="font-bold">
                    Rp{(payment.totalAmount - payment.paymentAmount).toLocaleString("id-ID")}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Evidence Photo & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-6">
          
          {/* Uploader / Photo Card */}
          <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#0F131F]/5 pb-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60">
                Bukti Transfer
              </h3>
              <div className="flex items-center gap-2">
                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  title="Unduh Gambar"
                  className="p-1.5 border border-[#0F131F]/10 hover:bg-[#f3f4f7] transition-all text-[#896d51] cursor-pointer"
                >
                  <Download size={13} />
                </button>
                {/* External Tab Button */}
                <a
                  href={payment.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Buka Tab Baru"
                  className="p-1.5 border border-[#0F131F]/10 hover:bg-[#f3f4f7] transition-all text-[#896d51] block cursor-pointer"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Evidence Image Container */}
            <div 
              onClick={() => setLightboxOpen(true)}
              className="w-full aspect-[3/4] bg-gray-100 relative border border-[#0F131F]/10 cursor-zoom-in group overflow-hidden"
            >
              <img
                src={payment.evidenceUrl}
                alt="Bukti Transfer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1.5">
                <Eye size={16} />
                <span>Klik untuk memperbesar</span>
              </div>
            </div>
            
            <p className="text-[10px] text-black/35 text-center leading-relaxed">
              Format bukti transfer: JPG, PNG, PDF. Pastikan nominal dan nama rekening terlihat jelas.
            </p>
          </div>

          {/* Verification Operations Card */}
          <div className="bg-white border border-[#0F131F]/10 p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F131F]/60 border-b border-[#0F131F]/5 pb-2 mb-4">
              Status Verifikasi
            </h3>

            {payment.status === "Pending" ? (
              <div className="flex flex-col gap-3">
                {rejectMode ? (
                  <div className="flex flex-col gap-3 border border-red-100 bg-red-50/50 p-3.5">
                    <label htmlFor="rejectionReason" className="text-[10px] font-bold text-red-700 uppercase tracking-wide flex items-center gap-1">
                      <AlertCircle size={11} />
                      Alasan Penolakan
                    </label>
                    <textarea
                      id="rejectionReason"
                      required
                      rows={3}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Contoh: Bukti buram atau tidak terbaca, nominal kurang..."
                      className="w-full p-2 border border-red-200 bg-white text-xs text-[#0F131F] placeholder:text-black/30 outline-none focus:border-red-400 transition-colors"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setRejectMode(false)}
                        className="flex-1 py-2 border border-[#0F131F]/20 text-xs font-semibold hover:bg-black/5 transition-colors text-black/75 bg-white cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleReject}
                        disabled={isSubmitting}
                        className="flex-1 py-2 bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {isSubmitting && <Loader2 size={12} className="animate-spin" />}
                        Konfirmasi Tolak
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRejectMode(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-red-500 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <XCircle size={15} strokeWidth={2} />
                      Tolak
                    </button>
                    <button
                      onClick={handleApprove}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0F131F] text-white text-sm font-semibold hover:bg-[#896d51] transition-colors cursor-pointer"
                    >
                      {isSubmitting ? <Loader2 size={15} className="animate-spin text-white" /> : <CheckCircle2 size={15} strokeWidth={2} />}
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`flex items-center gap-2 p-3.5 border text-xs font-semibold ${
                payment.status === "Approved"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}>
                {payment.status === "Approved" ? (
                  <CheckCircle2 size={15} strokeWidth={2} />
                ) : (
                  <XCircle size={15} strokeWidth={2} />
                )}
                <span>
                  Pembayaran telah {payment.status === "Approved" ? "diverifikasi & disetujui" : "ditolak"}
                </span>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Lightbox / Zoom Dialog Modal */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out animate-in fade-in duration-300"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-4 right-4 text-white/70 hover:text-white font-semibold text-lg cursor-pointer transition-colors"
          >
            ✕ Tutup
          </button>
          <div className="relative max-w-full max-h-full">
            <img
              src={payment.evidenceUrl}
              alt="Bukti Transfer Perbesar"
              className="max-w-[90vw] max-h-[85vh] object-contain border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-center text-white/50 text-[10px] mt-2">
              Bukti Transfer {payment.id} · Scroll/Zoom browser untuk detail lebih besar
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
