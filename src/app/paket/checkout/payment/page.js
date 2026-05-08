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
  ChevronRight,
  Upload,
  CloudUpload,
  AlertCircle,
  CheckCircle2,
  Clock,
  CalendarDays,
  ArrowRight,
  X,
  FileImage,
  QrCode,
  Landmark,
} from "lucide-react";
import Image from "next/image";
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
      <HeaderPayment />

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* LEFT — Order Summary */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Order Code */}
          <OrderCode code={orderData.orderCode} />

          {/* Venue Info */}
          <VenueInfo orderData={orderData} />

          {/* Price Breakdown */}
          <PriceBreakdown orderData={orderData} />

          {/* Timer notice */}
          <AlertPayment />
        </div>

        {/* RIGHT — Payment Method + QR/Transfer + Upload */}
        <div className="col-span-8 flex flex-col gap-5">
          {/* Payment Method Selector */}
          <PaymentMethodSelect
            selectedMethod={selectedMethod}
            paymentMethods={paymentMethods}
            onSelectedMethod={setSelectedMethod}
          />

          {/* Payment Detail — QRIS */}
          {selected.type === "qris" && <QrisPayment orderData={orderData} />}

          {/* Payment Detail — Transfer / VA */}
          {selected.type === "transfer" && (
            <TransferPayment
              selected={selected}
              orderData={orderData}
              copied={copied}
              onCopy={setCopied}
            />
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
            <InfoBukti />

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
