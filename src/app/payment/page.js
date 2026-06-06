"use client";

import AlertPayment from "@/components/Payment/AlertPayment";
import HeaderPayment from "@/components/Payment/HeaderPayment";
import InfoBukti from "@/components/Payment/InfoBukti";
import OrderCode from "@/components/Payment/OrderCode";
import PaymentMethodSelect from "@/components/Payment/PaymentMethodSelect";
import PriceBreakdown from "@/components/Payment/PriceBreakdown";
import QrisPayment from "@/components/Payment/QrisPayment";
import TransferPayment from "@/components/Payment/TransferPayment";
import VenueInfo from "@/components/Payment/VenueInfo";
import {
  Upload,
  CloudUpload,
  X,
  FileImage,
  QrCode,
  Landmark,
  User,
  CreditCard,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "@/components/Landing/Navbar";
import axiosInstance from "@/lib/axios";
import RescheduleModal from "@/components/Payment/RescheduleModal";
import NotificationModal from "@/components/Payment/NotificationModal";

// Simulasi data tetap sama
const orderData = {
  venueName: "Semi-Indoor & Outdoor",
  venueLocation: "Jl. Contoh No. 12, Depok",
  date: "Sabtu, 24 Mei 2025",
  startTime: "09:00",
  endTime: "12:00",
  duration: 3,
  subtotal: 2000000,
  discount: 500000,
  tax: 200000,
  total: 2200000,
  dpAmount: 1100000,
  orderCode: "LWH-20250524-0391",
};

const paymentMethods = [
  {
    id: "bca",
    type: "transfer",
    label: "Bank BCA",
    icon: Landmark,
    accountNumber: "0987654321",
    accountName: "PT Bango Parc",
    info: "Transfer Bank",
  },
  {
    id: "qris",
    type: "qris",
    label: "QRIS",
    icon: QrCode,
    info: "Semua e-wallet & m-banking",
    accountName: "PT Bango Parc",
  },
];

// ─── Payment Type Component ──────────────────────────────────────────────────
function PaymentTypeSelect({ paymentType, onSelectPaymentType, total, dpAmount, isDpVerified }) {
  if (isDpVerified) {
    const remainingAmount = total - dpAmount;
    return (
      <div className="bg-white border border-[#0f131f]/10 p-4 sm:p-6 shadow-sm">
        <h5 className="font-crimson-pro text-lg sm:text-xl text-[#0f131f] mb-1">
          Opsi Pembayaran
        </h5>
        <p className="text-xs text-black/45 mb-5">
          Pembayaran uang muka (DP 50%) Anda telah diverifikasi. Lakukan pelunasan sisa tagihan di bawah ini.
        </p>

        <div className="grid grid-cols-1 gap-4">
          {/* Pelunasan Payment */}
          <button
            type="button"
            className="flex flex-col text-left p-4 border border-[#0F131F] bg-[#0F131F]/5 cursor-default w-full"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold text-xs tracking-wider text-[#0f131f] uppercase">Bayar Pelunasan</span>
              <div className="w-4 h-4 rounded-full border border-[#0F131F] bg-[#0F131F] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-[#0F131F] mt-3">
              Rp{remainingAmount.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] text-black/40 mt-1.5 leading-relaxed">
              Pelunasan sisa 50% biaya reservasi venue.
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#0f131f]/10 p-4 sm:p-6 shadow-sm">
      <h5 className="font-crimson-pro text-lg sm:text-xl text-[#0f131f] mb-1">
        Opsi Pembayaran
      </h5>
      <p className="text-xs text-black/45 mb-5">
        Pilih untuk melakukan pembayaran lunas (100%) atau uang muka (DP) minimal 50%.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Payment */}
        <button
          type="button"
          onClick={() => onSelectPaymentType("full")}
          className={`flex flex-col text-left p-4 border transition-all duration-300 cursor-pointer ${
            paymentType === "full"
              ? "border-[#0F131F] bg-[#0F131F]/5"
              : "border-[#0f131f]/15 bg-white hover:border-[#0f131f]/35"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-xs tracking-wider text-[#0f131f] uppercase">Bayar Lunas</span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentType === "full" ? "border-[#0F131F] bg-[#0F131F]" : "border-black/20"
            }`}>
              {paymentType === "full" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
          <span className="text-xl font-bold text-[#0F131F] mt-3">
            Rp{total.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-black/40 mt-1.5 leading-relaxed">
            Pembayaran penuh 100% biaya reservasi venue.
          </span>
        </button>

        {/* DP Payment */}
        <button
          type="button"
          onClick={() => onSelectPaymentType("dp")}
          className={`flex flex-col text-left p-4 border transition-all duration-300 cursor-pointer ${
            paymentType === "dp"
              ? "border-[#0F131F] bg-[#0F131F]/5"
              : "border-[#0f131f]/15 bg-white hover:border-[#0f131f]/35"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold text-xs tracking-wider text-[#0f131f] uppercase">Uang Muka (DP 50%)</span>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
              paymentType === "dp" ? "border-[#0F131F] bg-[#0F131F]" : "border-black/20"
            }`}>
              {paymentType === "dp" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
          </div>
          <span className="text-xl font-bold text-[#0F131F] mt-3">
            Rp{dpAmount.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] text-black/40 mt-1.5 leading-relaxed">
            Biaya awal minimum 50%. Pelunasan H-7.
          </span>
        </button>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const [paymentType, setPaymentType] = useState("full");
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const [dynamicOrderData, setDynamicOrderData] = useState(orderData);

  const [senderName, setSenderName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [reservation, setReservation] = useState(null);
  const [loadingReservation, setLoadingReservation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showNotification = (type, title, message, onConfirm = null) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const isDpVerified = 
    dynamicOrderData.isDpVerified === true ||
    (reservation && (reservation.paymentStatus === "PARTIAL" || Number(reservation.paidAmount) > 0)) ||
    (reservation && reservation.paymentSchedules && reservation.paymentSchedules.some(
      (s) => s.installmentNumber === 1 && (s.status === "PAID" || s.status === "VERIFIED" || s.status === "SUCCESS" || s.status === "APPROVED" || s.status === "PARTIAL")
    ));

  const isFullyPaid = reservation && (
    reservation.paymentStatus === "PAID" || 
    reservation.paymentStatus === "FULL" || 
    reservation.paymentStatus === "SUCCESS" ||
    (reservation.totalPrice && Number(reservation.remainingBalance) === 0) ||
    (reservation.paymentSchedules && reservation.paymentSchedules.length > 0 && reservation.paymentSchedules.every(
      (s) => s.status === "PAID" || s.status === "VERIFIED" || s.status === "SUCCESS" || s.status === "APPROVED"
    ))
  );

  useEffect(() => {
    if (isDpVerified) {
      setPaymentType("full");
    }
  }, [isDpVerified]);

  // Source of truth totals derived from reservation if loaded, else from dynamicOrderData
  const reservationTotal = reservation ? Number(reservation.totalPrice) : (dynamicOrderData.total || 0);
  const reservationDp = reservation 
    ? (reservation.paymentSchedules?.find(s => s.installmentNumber === 1)?.amount 
       ? Number(reservation.paymentSchedules.find(s => s.installmentNumber === 1).amount)
       : (reservationTotal > 2000000 ? 1000000 : reservationTotal * 0.5))
    : (dynamicOrderData.dpAmount || 0);

  const reservationRemaining = reservation 
    ? Number(reservation.remainingBalance) 
    : (dynamicOrderData.isDpVerified ? dynamicOrderData.total : (reservationTotal - reservationDp));

  // Sync amount when payment option or order data changes
  const amountToPay = isFullyPaid
    ? 0
    : isDpVerified 
      ? reservationRemaining
      : (paymentType === "full" ? reservationTotal : reservationDp);

  useEffect(() => {
    if (amountToPay !== undefined && amountToPay !== null) {
      setPaymentAmount(amountToPay);
    }
  }, [amountToPay]);

  // Prefill sender name from user profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("bango_parc_user_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.fullName) {
          setSenderName(parsed.fullName);
        }
      } catch (e) {
        console.error("Gagal membaca profil dari localStorage:", e);
      }
    }
  }, []);

  // Fetch dynamic payment order from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bango_parc_payment_order");
    if (saved) {
      try {
        setDynamicOrderData(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal membaca payment order dari localStorage:", e);
      }
    }
  }, []);

  const [showReschedule, setShowReschedule] = useState(false);

  // Fetch reservation details to retrieve the paymentSchedules ID
  const fetchReservationDetails = useCallback(async () => {
    if (!dynamicOrderData.reservationId) return;
    try {
      setLoadingReservation(true);
      const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all");
      const found = res.data.data?.find((r) => r.id === Number(dynamicOrderData.reservationId));
      if (found) {
        setReservation(found);
        if (found.customer?.fullName) {
          setSenderName(found.customer.fullName);
        }
      }
    } catch (err) {
      console.error("Gagal mengambil detail reservasi:", err);
    } finally {
      setLoadingReservation(false);
    }
  }, [dynamicOrderData.reservationId]);

  useEffect(() => {
    fetchReservationDetails();
  }, [fetchReservationDetails]);

  const handleRescheduleSuccess = (newStart, newEnd) => {
    const startDate = new Date(newStart);
    const endDate = new Date(newEnd);
    
    const daysIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthsIndo = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    
    const dayName = daysIndo[startDate.getDay()];
    const dateNum = startDate.getDate();
    const monthName = monthsIndo[startDate.getMonth()];
    const yearNum = startDate.getFullYear();
    const dateLabel = `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
    
    const pad = (n) => String(n).padStart(2, "0");
    const startTimeLabel = `${pad(startDate.getUTCHours())}:${pad(startDate.getUTCMinutes())}`;
    const endTimeLabel = `${pad(endDate.getUTCHours())}:${pad(endDate.getUTCMinutes())}`;
    
    const duration = Math.round((endDate - startDate) / (1000 * 60 * 60));

    const updated = {
      ...dynamicOrderData,
      date: dateLabel,
      startTime: startTimeLabel,
      endTime: endTimeLabel,
      duration,
    };
    
    setDynamicOrderData(updated);
    localStorage.setItem("bango_parc_payment_order", JSON.stringify(updated));
    fetchReservationDetails();
  };

  const canReschedule = reservation && 
    reservation.status !== "CANCELLED" && 
    reservation.status !== "COMPLETED" && 
    reservation.status !== "EXPIRED";

  const handleSubmitPayment = async (e) => {
    if (e) e.preventDefault();
    if (!uploadedFile) {
      showNotification("warning", "File Belum Dipilih", "Silakan pilih atau seret berkas bukti pembayaran terlebih dahulu.");
      return;
    }
    if (!senderName.trim()) {
      showNotification("warning", "Nama Pengirim Kosong", "Silakan isi nama pengirim transfer.");
      return;
    }
    if (!paymentAmount) {
      showNotification("warning", "Nominal Kosong", "Silakan isi nominal transfer.");
      return;
    }

    // 1. Resolve paymentScheduleId
    let paymentScheduleId = null;
    if (reservation && reservation.paymentSchedules && reservation.paymentSchedules.length > 0) {
      const pendingSchedules = [...reservation.paymentSchedules]
        .filter(s => s.status === "PENDING" || s.status === "UNPAID")
        .sort((a, b) => a.installmentNumber - b.installmentNumber);

      if (pendingSchedules.length > 0) {
        if (paymentType === "dp") {
          const dpSched = pendingSchedules.find(s => s.installmentNumber === 1);
          paymentScheduleId = dpSched ? dpSched.id : pendingSchedules[0].id;
        } else {
          paymentScheduleId = pendingSchedules[0].id;
        }
      } else {
        paymentScheduleId = reservation.paymentSchedules[0].id;
      }
    }

    // Fallback if no paymentScheduleId is resolved
    if (!paymentScheduleId) {
      if (!dynamicOrderData.reservationId) {
        // Mock success for dummy order
        setIsSubmitting(true);
        setTimeout(() => {
          setIsSubmitting(false);
          showNotification(
            "success",
            "Bukti Terkirim",
            "Bukti pembayaran dikirim! (Pemesanan dummy disimulasikan berhasil)",
            () => router.push("/profile")
          );
        }, 1200);
        return;
      }
      showNotification("error", "Error Pembayaran", "Gagal memproses pembayaran: Jadwal pembayaran tidak ditemukan pada server.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("paymentScheduleId", String(paymentScheduleId));
      formData.append("amount", String(paymentAmount));
      formData.append("senderName", senderName);

      await axiosInstance.post(
        "https://bango-parc-service.vercel.app/api/payment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showNotification(
        "success",
        "Bukti Berhasil Dikirim",
        "Bukti pembayaran berhasil dikirim! Silakan tunggu konfirmasi admin.",
        () => router.push("/profile")
      );
    } catch (err) {
      console.error("Gagal mengirim bukti pembayaran:", err);
      showNotification(
        "error",
        "Gagal Mengirim",
        err.response?.data?.message || "Gagal mengirim bukti pembayaran. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selected = paymentMethods.find((m) => m.id === selectedMethod);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  return (
    <main className="w-full min-h-screen bg-[#F4F7FA]">
      <HeaderPayment />
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT — Order Summary */}
        <div className="lg:col-span-4 flex flex-col gap-4 order-1 lg:order-1">
          <OrderCode code={dynamicOrderData.orderCode} />
          <VenueInfo 
            orderData={dynamicOrderData} 
            onRescheduleClick={canReschedule ? () => setShowReschedule(true) : null}
          />
          <PriceBreakdown 
            orderData={{
              ...dynamicOrderData,
              total: reservationTotal,
              dpAmount: reservationDp,
            }} 
            paymentType={paymentType} 
            isDpVerified={isDpVerified}
            isFullyPaid={isFullyPaid}
            amountToPay={amountToPay}
          />
          <AlertPayment reservation={reservation} />
        </div>

        {/* RIGHT — Payment Detail */}
        <div className="lg:col-span-8 flex flex-col gap-5 order-2 lg:order-2">
          {isFullyPaid || dynamicOrderData.total === 0 ? (
            <div className="bg-white border border-emerald-100 p-6 sm:p-8 shadow-sm flex flex-col items-center text-center gap-4 rounded">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h5 className="font-crimson-pro text-2xl text-[#0f131f] font-bold">
                Pembayaran Selesai (Lunas)
              </h5>
              <p className="text-xs text-black/55 max-w-md leading-relaxed">
                Reservasi ini telah dibayar lunas dengan tagihan tersisa Rp0. Anda tidak perlu mengunggah bukti pembayaran baru.
              </p>
              <div className="w-full h-px bg-[#0f131f]/10 my-2" />
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  href="/profile"
                  className="px-6 py-2.5 bg-[#0f131f] text-white hover:bg-[#896d51] transition-all font-semibold text-[11px] uppercase tracking-wider rounded text-center cursor-pointer"
                >
                  Riwayat Reservasi
                </Link>
                <Link
                  href="/"
                  className="px-6 py-2.5 border border-[#0f131f]/20 text-[#0f131f]/70 hover:border-[#0f131f] hover:text-[#0f131f] transition-all font-semibold text-[11px] uppercase tracking-wider rounded text-center cursor-pointer"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          ) : (
            <>
              <PaymentTypeSelect
                paymentType={paymentType}
                onSelectPaymentType={setPaymentType}
                total={reservationTotal}
                dpAmount={reservationDp}
                isDpVerified={isDpVerified}
              />

              <PaymentMethodSelect
                selectedMethod={selectedMethod}
                paymentMethods={paymentMethods}
                onSelectedMethod={setSelectedMethod}
              />

              {selected.type === "qris" && (
                <QrisPayment 
                  orderData={{
                    ...dynamicOrderData,
                    total: reservationTotal,
                    dpAmount: reservationDp,
                  }} 
                  paymentType={paymentType} 
                  isDpVerified={isDpVerified} 
                  amountToPay={amountToPay}
                />
              )}

              {selected.type === "transfer" && (
                <TransferPayment
                  selected={selected}
                  orderData={{
                    ...dynamicOrderData,
                    total: reservationTotal,
                    dpAmount: reservationDp,
                  }}
                  copied={copied}
                  onCopy={setCopied}
                  paymentType={paymentType}
                  isDpVerified={isDpVerified}
                  amountToPay={amountToPay}
                />
              )}

              {/* Upload Bukti */}
              <div className="bg-white border border-[#0f131f]/10 p-4 sm:p-6 shadow-sm">
                <h5 className="font-crimson-pro text-lg sm:text-xl text-[#0f131f] mb-1">
                  Upload Bukti Pembayaran
                </h5>

                <div className="w-full h-px bg-[#0f131f]/10 mb-5" />

                {/* Form Inputs for Sender and Amount (Read-Only Info Panels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div className="flex flex-col gap-1.5 text-left bg-black/[0.02] border border-[#0f131f]/10 p-3">
                    <label htmlFor="senderName" className="text-[10px] font-bold text-[#0f131f]/50 tracking-wider uppercase flex items-center gap-1.5">
                      <User size={12} className="text-[#896d51]" />
                      Nama Pengirim
                    </label>
                    <input
                      id="senderName"
                      type="text"
                      required
                      readOnly
                      value={senderName}
                      placeholder="Nama pengirim transfer"
                      className="w-full h-8 bg-transparent text-sm text-[#0f131f]/60 cursor-not-allowed outline-none font-semibold px-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left bg-black/[0.02] border border-[#0f131f]/10 p-3">
                    <label htmlFor="paymentAmount" className="text-[10px] font-bold text-[#0f131f]/50 tracking-wider uppercase flex items-center gap-1.5">
                      <CreditCard size={12} className="text-[#896d51]" />
                      Nominal Transfer
                    </label>
                    <input
                      id="paymentAmount"
                      type="text"
                      required
                      readOnly
                      value={paymentAmount ? `Rp${Number(paymentAmount).toLocaleString("id-ID")}` : ""}
                      placeholder="Nominal transfer"
                      className="w-full h-8 bg-transparent text-sm text-[#0f131f]/60 cursor-not-allowed outline-none font-bold px-1"
                    />
                  </div>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 sm:py-10 px-4 text-center cursor-pointer transition-all mb-4 ${
                    isDragging
                      ? "border-[#0f131f] bg-[#0f131f]/5"
                      : uploadedFile
                        ? "border-green-400 bg-green-50"
                        : "border-[#0f131f]/20 hover:border-[#0f131f] hover:bg-[#0f131f]/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {uploadedFile ? (
                    <>
                      <FileImage
                        size={36}
                        className="text-green-500"
                        strokeWidth={1.5}
                      />

                      <div className="flex flex-col items-center gap-1 break-all">
                        <span className="text-sm font-medium text-green-700">
                          {uploadedFile.name}
                        </span>

                        <span className="text-xs text-black/45">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="flex items-center gap-1.5 text-xs text-red-500 border border-red-100 px-3 py-1 hover:bg-red-50 transition-colors"
                      >
                        <X size={12} /> Hapus file
                      </button>
                    </>
                  ) : (
                    <>
                      <CloudUpload
                        size={36}
                        className="text-[#0f131f]/60"
                        strokeWidth={1.5}
                      />

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-black/60 leading-relaxed">
                          Klik untuk upload atau{" "}
                          <span className="text-[#0f131f] font-semibold">
                            drag & drop
                          </span>
                        </span>

                        <span className="text-xs text-black/30">
                          Format: JPG, PNG, PDF · Maks. 5 MB
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <InfoBukti />

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleSubmitPayment}
                    disabled={!uploadedFile || !senderName || !paymentAmount || isSubmitting || loadingReservation}
                    className={`w-full flex justify-center items-center gap-2 py-3.5 text-sm font-medium transition-all ${
                      (uploadedFile && senderName && paymentAmount && !isSubmitting && !loadingReservation)
                        ? "bg-[#0f131f] text-white hover:bg-[#1a2135] active:scale-[0.98] cursor-pointer"
                        : "bg-[#0f131f]/20 text-[#0f131f]/40 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        Mengirim Bukti...
                      </>
                    ) : loadingReservation ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-[#0f131f]/40" />
                        Menghubungkan Server...
                      </>
                    ) : (
                      <>
                        <Upload size={16} strokeWidth={1.5} />
                        Kirim Bukti Pembayaran
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-xs text-center text-black/40 leading-relaxed">
                    Dengan mengirim, Anda menyetujui{" "}
                    <span className="underline cursor-pointer hover:text-[#0f131f]">
                      syarat & ketentuan
                    </span>{" "}
                    kami.
                  </p>
                </div>
              </div>
            </>
          )}

          <Link
            href="/paket/checkout"
            className="flex items-center gap-2 text-sm text-[#0f131f]/70 hover:text-[#0f131f] transition-colors w-fit font-medium"
          >
            ← Kembali ke Checkout
          </Link>
        </div>
      </section>

      <RescheduleModal
        isOpen={showReschedule}
        onClose={() => setShowReschedule(false)}
        reservation={reservation}
        onSuccess={handleRescheduleSuccess}
        showNotification={showNotification}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onConfirm={notification.onConfirm}
      />
    </main>
  );
}
