"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ImageIcon, Mail, Phone, Building2, Download, XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import DetailPanel from "@/components/admin/verification/DetailPanel";

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

export default function PaymentVerificationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const [payRes, resvRes] = await Promise.all([
        axiosInstance.get("https://bango-parc-service.vercel.app/api/payment"),
        axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all")
      ]);
      const apiData = payRes.data?.result || payRes.data?.data || [];
      const allReservations = resvRes.data?.data || [];

      const mapped = apiData.map((item) => {
        const sched = item.paymentSchedule || {};
        const resvId = sched.reservationId || item.reservationId;
        const matchedResv = allReservations.find(r => r.id === resvId);
        const enriched = {
          ...item,
          paymentSchedule: {
            ...sched,
            reservation: matchedResv || sched.reservation
          }
        };
        return mapApiPaymentToUi(enriched);
      });

      const found = mapped.find((p) => String(p.apiId) === String(id));
      if (found) {
        setItem(found);
        setError(null);
      } else {
        setError("Detail verifikasi pembayaran tidak ditemukan.");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat detail verifikasi pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleApprove = async () => {
    if (!item) return;
    
    // Optimistic state
    setItem(prev => prev ? { ...prev, status: "Approved" } : null);

    try {
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/approve", {
        paymentProofId: Number(item.apiId)
      });
    } catch (err) {
      console.error("Gagal memperbarui status di server:", err);
      alert("Gagal memverifikasi pembayaran: " + (err.response?.data?.error || err.message));
      fetchDetail(); // rollback
    }
  };

  const handleReject = () => {
    setRejectReason("");
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!rejectReason.trim() || !item) return;

    try {
      setIsRejecting(true);
      
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/reject", {
        paymentProofId: Number(item.apiId),
        rejectionReason: rejectReason
      });

      setItem(prev => prev ? { ...prev, status: "Rejected" } : null);
      setShowRejectModal(false);
      setRejectReason("");
    } catch (err) {
      console.error("Gagal memperbarui status di server:", err);
      alert("Gagal menolak pembayaran: " + (err.response?.data?.error || err.message));
    } finally {
      setIsRejecting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#f3f4f7] min-h-screen flex flex-col font-sans">
        <div className="mb-6 max-w-2xl mx-auto w-full">
          <div className="h-5 w-20 bg-black/5 animate-pulse rounded" />
        </div>
        <div className="bg-white border border-[#0F131F]/10 flex-1 flex flex-col max-w-2xl mx-auto w-full p-6 gap-6">
          <div className="flex justify-between border-b border-[#0F131F]/10 pb-4">
            <div className="flex flex-col gap-2">
              <div className="h-7 w-32 bg-black/5 animate-pulse rounded" />
              <div className="h-4 w-40 bg-black/5 animate-pulse rounded" />
            </div>
            <div className="h-6 w-20 bg-black/5 animate-pulse rounded" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-black/5 animate-pulse rounded" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black/5 animate-pulse rounded" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-4 w-28 bg-black/5 animate-pulse rounded" />
                <div className="h-3 w-16 bg-black/5 animate-pulse rounded" />
              </div>
            </div>
          </div>
          <div className="h-px bg-black/5" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-black/5 animate-pulse rounded" />
            <div className="h-32 w-full bg-black/5 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen bg-[#f3f4f7] flex flex-col gap-4 items-center justify-center font-sans">
        <p className="text-red-500 text-sm font-semibold">{error}</p>
        <Link href="/admin/verifikasi" className="px-4 py-2 border border-[#0F131F] text-xs font-bold uppercase tracking-wider text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors bg-white">
          Kembali ke List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f3f4f7] min-h-screen font-sans">
      {/* Top Navbar */}
      <div className="mb-6 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Link
          href="/admin/verifikasi"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F131F]/60 hover:text-[#0F131F] transition-colors"
        >
          <ArrowLeft size={14} /> Kembali
        </Link>
        <span className="text-[10px] font-bold text-black/30 bg-[#0F131F]/5 border border-[#0F131F]/10 px-2.5 py-1 uppercase tracking-wider">
          Pembayaran ID: {item.apiId}
        </span>
      </div>

      <div className="bg-white border border-[#0F131F]/10 max-w-2xl mx-auto w-full shadow-sm">
        <DetailPanel
          item={item}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Rejection Modal Overlay */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md shadow-2xl p-6 border border-[#0F131F]/10 rounded flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <h3 className="font-crimson-pro text-xl font-bold text-[#0F131F]">
              Tolak Bukti Pembayaran
            </h3>
            <p className="text-xs text-black/55 leading-relaxed">
              Silakan masukkan alasan penolakan untuk kode order <span className="font-mono font-bold text-[#0F131F]">{item.id}</span>. Alasan ini akan dapat dilihat langsung oleh pelanggan pada halaman profil mereka.
            </p>
            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Bukti transfer tidak terbaca / buram. Silakan unggah kembali bukti pembayaran yang jelas."
              className="w-full p-3 border border-[#0F131F]/15 text-sm outline-none focus:border-[#0F131F] transition-colors resize-none bg-[#f3f4f7]/20 placeholder:text-black/35 rounded"
            />
            <div className="flex justify-end gap-3 text-sm pt-2">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                }}
                disabled={isRejecting}
                className="px-4 py-2 border border-[#0F131F]/15 hover:bg-black/5 font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason.trim() || isRejecting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-1.5 transition-all disabled:bg-red-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Kirim Penolakan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
