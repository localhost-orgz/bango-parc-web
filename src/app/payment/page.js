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
} from "lucide-react";
import Link from "next/link";
import React, { useState, useRef } from "react";
import Navbar from "@/components/Landing/Navbar";

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
function PaymentTypeSelect({ paymentType, onSelectPaymentType, total, dpAmount }) {
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
  const [paymentType, setPaymentType] = useState("full");
  const [selectedMethod, setSelectedMethod] = useState("qris");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

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
          <OrderCode code={orderData.orderCode} />
          <VenueInfo orderData={orderData} />
          <PriceBreakdown orderData={orderData} paymentType={paymentType} />
          <AlertPayment />
        </div>

        {/* RIGHT — Payment Detail */}
        <div className="lg:col-span-8 flex flex-col gap-5 order-2 lg:order-2">
          <PaymentTypeSelect
            paymentType={paymentType}
            onSelectPaymentType={setPaymentType}
            total={orderData.total}
            dpAmount={orderData.dpAmount}
          />

          <PaymentMethodSelect
            selectedMethod={selectedMethod}
            paymentMethods={paymentMethods}
            onSelectedMethod={setSelectedMethod}
          />

          {selected.type === "qris" && (
            <QrisPayment orderData={orderData} paymentType={paymentType} />
          )}

          {selected.type === "transfer" && (
            <TransferPayment
              selected={selected}
              orderData={orderData}
              copied={copied}
              onCopy={setCopied}
              paymentType={paymentType}
            />
          )}

          {/* Upload Bukti */}
          <div className="bg-white border border-[#0f131f]/10 p-4 sm:p-6 shadow-sm">
            <h5 className="font-crimson-pro text-lg sm:text-xl text-[#0f131f] mb-1">
              Upload Bukti Pembayaran
            </h5>

            <div className="w-full h-px bg-[#0f131f]/10 mb-5" />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 sm:py-10 px-4 text-center cursor-pointer transition-all ${
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
                disabled={!uploadedFile}
                className={`w-full flex justify-center items-center gap-2 py-3.5 text-sm font-medium transition-all ${
                  uploadedFile
                    ? "bg-[#0f131f] text-white hover:bg-[#1a2135] active:scale-[0.98]"
                    : "bg-[#0f131f]/20 text-[#0f131f]/40 cursor-not-allowed"
                }`}
              >
                <Upload size={16} strokeWidth={1.5} />
                Kirim Bukti Pembayaran
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

          <Link
            href="/paket/checkout"
            className="flex items-center gap-2 text-sm text-[#0f131f]/70 hover:text-[#0f131f] transition-colors w-fit font-medium"
          >
            ← Kembali ke Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
