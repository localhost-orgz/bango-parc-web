"use client";

import {
  ChevronRight,
  Upload,
  CloudUpload,
  AlertCircle,
  CheckCircle2,
  Clock,
  CalendarDays,
  ArrowRight,
  Building2,
  MapPin,
  Banknote,
  Smartphone,
  CreditCard,
  X,
  FileImage,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useRef } from "react";

// Simulasi data dari halaman checkout
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
    icon: Banknote,
    accountNumber: "1234567890",
    accountName: "PT Luwihaja Hill Indonesia",
    info: "Transfer Bank",
  },
  {
    id: "mandiri",
    type: "transfer",
    label: "Bank Mandiri",
    icon: Banknote,
    accountNumber: "0987654321",
    accountName: "PT Luwihaja Hill Indonesia",
    info: "Transfer Bank",
  },
  {
    id: "qris",
    type: "qris",
    label: "QRIS",
    icon: Smartphone,
    info: "Semua e-wallet & m-banking",
  },
  {
    id: "va",
    type: "va",
    label: "Virtual Account",
    icon: CreditCard,
    accountNumber: "8800-2025-0391",
    accountName: "Luwihaja Hill",
    info: "Berlaku 24 jam",
  },
];

// Fake QR SVG as placeholder
function QRPlaceholder() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-44 h-44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" fill="white" />
      {/* Top-left finder */}
      <rect
        x="10"
        y="10"
        width="60"
        height="60"
        fill="none"
        stroke="#2c2218"
        strokeWidth="6"
      />
      <rect x="22" y="22" width="36" height="36" fill="#2c2218" />
      {/* Top-right finder */}
      <rect
        x="130"
        y="10"
        width="60"
        height="60"
        fill="none"
        stroke="#2c2218"
        strokeWidth="6"
      />
      <rect x="142" y="22" width="36" height="36" fill="#2c2218" />
      {/* Bottom-left finder */}
      <rect
        x="10"
        y="130"
        width="60"
        height="60"
        fill="none"
        stroke="#2c2218"
        strokeWidth="6"
      />
      <rect x="22" y="142" width="36" height="36" fill="#2c2218" />
      {/* Data modules */}
      {[
        [80, 10],
        [90, 10],
        [100, 10],
        [110, 10],
        [80, 20],
        [100, 20],
        [120, 20],
        [80, 30],
        [90, 30],
        [110, 30],
        [120, 30],
        [80, 40],
        [100, 40],
        [110, 40],
        [80, 50],
        [90, 50],
        [100, 50],
        [120, 50],
        [130, 80],
        [140, 80],
        [160, 80],
        [170, 80],
        [130, 90],
        [150, 90],
        [170, 90],
        [130, 100],
        [140, 100],
        [160, 100],
        [130, 110],
        [150, 110],
        [160, 110],
        [170, 110],
        [130, 120],
        [140, 120],
        [170, 120],
        [80, 80],
        [90, 80],
        [100, 80],
        [80, 90],
        [100, 90],
        [80, 100],
        [90, 100],
        [100, 100],
        [10, 80],
        [20, 80],
        [30, 80],
        [40, 80],
        [50, 80],
        [60, 80],
        [10, 90],
        [30, 90],
        [50, 90],
        [10, 100],
        [20, 100],
        [40, 100],
        [60, 100],
        [10, 110],
        [30, 110],
        [40, 110],
        [60, 110],
        [10, 120],
        [20, 120],
        [30, 120],
        [50, 120],
        [60, 120],
        [80, 130],
        [90, 130],
        [100, 130],
        [110, 130],
        [120, 130],
        [80, 140],
        [100, 140],
        [120, 140],
        [80, 150],
        [90, 150],
        [110, 150],
        [80, 160],
        [100, 160],
        [110, 160],
        [120, 160],
        [80, 170],
        [90, 170],
        [100, 170],
        [120, 170],
        [130, 130],
        [150, 130],
        [170, 130],
        [130, 140],
        [140, 140],
        [160, 140],
        [170, 140],
        [130, 150],
        [150, 150],
        [140, 160],
        [150, 160],
        [170, 160],
        [130, 170],
        [140, 170],
        [160, 170],
        [170, 170],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" fill="#2c2218" />
      ))}
    </svg>
  );
}

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const selected = paymentMethods.find((m) => m.id === selectedMethod);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <main className="w-full min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="h-52 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/detail-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="z-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-white/60 text-xs mb-1">
            <span>Beranda</span>
            <ChevronRight size={12} />
            <span>Detail Paket</span>
            <ChevronRight size={12} />
            <span>Checkout</span>
            <ChevronRight size={12} />
            <span className="text-white">Pembayaran</span>
          </div>
          <h1 className="font-crimson-pro text-white text-5xl">Pembayaran</h1>
          <p className="text-white/60 text-xs mt-1 text-center max-w-sm">
            Selesaikan pembayaran dan unggah bukti transfer untuk konfirmasi
            booking Anda.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* LEFT — Order Summary */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Order Code */}
          <div className="bg-[#896d51] p-4 flex flex-col gap-1">
            <span className="text-white/70 text-xs uppercase tracking-wider">
              Kode Pemesanan
            </span>
            <span className="text-white font-crimson-pro text-2xl tracking-widest">
              {orderData.orderCode}
            </span>
          </div>

          {/* Venue Info */}
          <div className="bg-white border border-[#896d51]/15 p-5 flex flex-col gap-3">
            <h5 className="font-crimson-text font-semibold text-xl text-[#2c2218] pb-2 border-b border-[#896d51]/15">
              Detail Venue
            </h5>
            <div
              className="w-full aspect-video bg-gray-300 bg-cover bg-center"
              style={{ backgroundImage: "url(/about-us2.jpg)" }}
            />
            <div className="flex flex-col gap-1.5">
              <h6 className="font-crimson-pro text-2xl text-[#2c2218]">
                {orderData.venueName}
              </h6>
              {/* <div className="flex items-center gap-1.5 text-black/40 text-xs">
                <MapPin size={11} strokeWidth={1.5} />
                <span>{orderData.venueLocation}</span>
              </div> */}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/15 px-3 py-2">
                <CalendarDays size={12} strokeWidth={1.5} color="#896d51" />
                <span>{orderData.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-black/60 bg-[#896d51]/5 border border-[#896d51]/15 px-3 py-2">
                <Clock size={12} strokeWidth={1.5} color="#896d51" />
                <span>{orderData.startTime}</span>
                <ArrowRight size={10} strokeWidth={1.5} color="#896d51" />
                <span>{orderData.endTime}</span>
                <span className="text-black/30 ml-auto">
                  {orderData.duration} jam
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white border border-[#896d51]/15 p-5 flex flex-col gap-3">
            <h5 className="font-crimson-pro text-lg text-[#2c2218] pb-2 border-b border-[#896d51]/15">
              Ringkasan Pembayaran
            </h5>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-sm text-black/55">
                <span>Subtotal</span>
                <span>Rp{orderData.subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm text-black/55">
                <span>Pajak & Biaya (10%)</span>
                <span>Rp{orderData.tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm text-green-700">
                <span>Diskon</span>
                <span>-Rp{orderData.discount.toLocaleString("id-ID")}</span>
              </div>
              <div className="h-px bg-[#896d51]/15" />
              <div className="flex justify-between">
                <span className="font-semibold text-[#2c2218]">Total</span>
                <span className="font-semibold text-lg text-[#896d51]">
                  Rp{orderData.total.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-xs bg-[#896d51]/5 border border-[#896d51]/20 px-3 py-2">
                <span className="text-[#896d51] font-medium">
                  DP Minimum (50%)
                </span>
                <span className="text-[#896d51] font-semibold">
                  Rp{orderData.dpAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Timer notice */}
          <div className="flex items-start gap-2.5 p-4 border border-amber-200 bg-amber-50">
            <Clock
              size={14}
              color="#d97706"
              strokeWidth={1.5}
              className="shrink-0 mt-0.5"
            />
            <p className="text-xs text-amber-700 leading-relaxed">
              Selesaikan pembayaran dalam <strong>24 jam</strong> untuk
              menghindari pembatalan otomatis.
            </p>
          </div>
        </div>

        {/* RIGHT — Payment Method + QR/Transfer + Upload */}
        <div className="col-span-8 flex flex-col gap-5">
          {/* Payment Method Selector */}
          <div className="bg-white border border-[#896d51]/15 p-6">
            <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
              Metode Pembayaran
            </h5>
            <p className="text-xs text-black/40 mb-5">
              Pilih metode yang paling mudah untuk Anda.
            </p>

            <div className="grid grid-cols-4 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex flex-col items-center gap-2 p-3.5 border-2 transition-all cursor-pointer ${
                      selectedMethod === method.id
                        ? "border-[#896d51] bg-[#896d51]/5"
                        : "border-[#896d51]/15 hover:border-[#896d51]/40 bg-white"
                    }`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      color={
                        selectedMethod === method.id ? "#896d51" : "#9ca3af"
                      }
                    />
                    <span
                      className={`text-xs font-medium text-center ${
                        selectedMethod === method.id
                          ? "text-[#896d51]"
                          : "text-black/50"
                      }`}
                    >
                      {method.label}
                    </span>
                    <span className="text-[10px] text-black/30 text-center leading-tight">
                      {method.info}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Detail — QRIS */}
          {selected.type === "qris" && (
            <div className="bg-white border border-[#896d51]/15 p-6">
              <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
                Scan QR Code
              </h5>
              <div className="w-full h-px bg-[#896d51]/20 mb-5" />
              <div className="flex gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 border-2 border-[#896d51]/20">
                    <QRPlaceholder />
                  </div>
                  <p className="text-xs text-black/40 text-center max-w-[160px] leading-relaxed">
                    Arahkan kamera smartphone ke QR Code di atas. Scan dengan
                    aplikasi mobile banking atau e-wallet.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="bg-[#896d51]/5 border border-[#896d51]/15 p-4 flex flex-col gap-1.5">
                    <span className="text-xs text-black/40 uppercase tracking-wide">
                      Nominal Transfer
                    </span>
                    <span className="text-2xl font-semibold text-[#896d51]">
                      Rp{orderData.dpAmount.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[10px] text-black/30">
                      DP 50% dari total Rp
                      {orderData.total.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      "GoPay",
                      "OVO",
                      "Dana",
                      "ShopeePay",
                      "LinkAja",
                      "Semua m-banking",
                    ].map((app) => (
                      <div
                        key={app}
                        className="flex items-center gap-2 text-xs text-black/55"
                      >
                        <CheckCircle2
                          size={12}
                          color="#896d51"
                          strokeWidth={1.5}
                        />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Detail — Transfer / VA */}
          {(selected.type === "transfer" || selected.type === "va") && (
            <div className="bg-white border border-[#896d51]/15 p-6">
              <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
                {selected.type === "va"
                  ? "Virtual Account"
                  : `Transfer ke ${selected.label}`}
              </h5>
              <div className="w-full h-px bg-[#896d51]/20 mb-5" />
              <div className="flex flex-col gap-4">
                {/* Amount */}
                <div className="bg-[#896d51]/5 border border-[#896d51]/15 p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-black/40 uppercase tracking-wide">
                      Nominal Transfer (DP)
                    </span>
                    <span className="text-2xl font-semibold text-[#896d51]">
                      Rp{orderData.dpAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(String(orderData.dpAmount))}
                    className="text-xs border border-[#896d51] text-[#896d51] px-3 py-1.5 hover:bg-[#896d51] hover:text-white transition-colors"
                  >
                    {copied ? "Tersalin!" : "Salin"}
                  </button>
                </div>

                {/* Account Number */}
                <div className="border border-[#896d51]/15 p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-black/40 uppercase tracking-wide">
                      {selected.type === "va"
                        ? "Nomor Virtual Account"
                        : "Nomor Rekening"}
                    </span>
                    <span className="text-xl font-semibold tracking-widest text-[#2c2218]">
                      {selected.accountNumber}
                    </span>
                    <span className="text-xs text-black/40">
                      {selected.accountName}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(selected.accountNumber || "")}
                    className="text-xs border border-[#896d51] text-[#896d51] px-3 py-1.5 hover:bg-[#896d51] hover:text-white transition-colors shrink-0"
                  >
                    Salin
                  </button>
                </div>

                <div className="flex items-start gap-2 text-xs text-black/50 bg-[#896d51]/5 p-3 border border-[#896d51]/10">
                  <AlertCircle
                    size={13}
                    color="#896d51"
                    strokeWidth={1.5}
                    className="shrink-0 mt-0.5"
                  />
                  <span>
                    {selected.type === "va"
                      ? "Virtual account ini hanya berlaku selama 24 jam. Gunakan kode yang sama persis."
                      : "Transfer harus dari rekening atas nama Anda sendiri untuk memudahkan verifikasi."}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Upload Bukti */}
          <div className="bg-white border border-[#896d51]/15 p-6">
            <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
              Upload Bukti Pembayaran
            </h5>
            <div className="w-full h-px bg-[#896d51]/20 mb-5" />

            {/* Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors ${
                isDragging
                  ? "border-[#896d51] bg-[#896d51]/5"
                  : uploadedFile
                    ? "border-green-400 bg-green-50"
                    : "border-[#896d51]/30 hover:border-[#896d51] hover:bg-[#896d51]/5"
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
                  <FileImage size={36} color="#22c55e" strokeWidth={1.5} />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-green-700">
                      {uploadedFile.name}
                    </span>
                    <span className="text-xs text-black/40">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="flex items-center gap-1.5 text-xs text-red-400 border border-red-200 px-3 py-1 hover:bg-red-50 transition-colors"
                  >
                    <X size={12} />
                    Hapus file
                  </button>
                </>
              ) : (
                <>
                  <CloudUpload size={36} color="#896d51" strokeWidth={1.5} />
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm text-black/60">
                      Klik untuk upload atau{" "}
                      <span className="text-[#896d51] font-medium">
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

            {/* Info Penting */}
            <div className="mt-4 p-4 border border-[#896d51]/15 bg-[#896d51]/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={14} color="#896d51" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-[#896d51]">
                  Informasi Penting:
                </span>
              </div>
              {[
                "Pastikan bukti pembayaran menunjukkan jumlah yang sesuai",
                "Upload screenshot atau foto yang jelas dan tidak blur",
                "Verifikasi akan dilakukan dalam 1–24 jam kerja",
                "Setelah terverifikasi, tiket check-in akan otomatis tersedia di halaman Profil",
                "Jika tiket belum muncul, hubungi kami via WhatsApp di 0821-1555-1822",
                "Mohon simpan bukti pembayaran asli hingga menerima tiket check-in",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="text-[#896d51] text-xs mt-0.5 shrink-0">
                    ·
                  </span>
                  <span className="text-xs text-black/55 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-5 flex flex-col gap-3">
              <button
                disabled={!uploadedFile}
                className={`w-full flex justify-center items-center gap-2 py-3.5 text-sm font-medium transition-colors ${
                  uploadedFile
                    ? "bg-[#896d51] text-white hover:bg-[#7a6047]"
                    : "bg-[#896d51]/30 text-white/50 cursor-not-allowed"
                }`}
              >
                <Upload size={16} strokeWidth={1.5} />
                Kirim Bukti Pembayaran
              </button>
              <p className="text-[10px] text-center text-black/30">
                Dengan mengirim, Anda menyetujui{" "}
                <span className="underline cursor-pointer">
                  syarat & ketentuan
                </span>{" "}
                pembayaran kami.
              </p>
            </div>
          </div>

          {/* Back */}
          <Link
            href="/checkout"
            className="flex items-center gap-2 text-sm text-[#896d51] hover:text-[#7a6047] transition-colors w-fit"
          >
            ← Kembali ke Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
