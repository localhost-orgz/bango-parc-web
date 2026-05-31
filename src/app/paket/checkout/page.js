"use client";

import LeftColumn from "@/components/Checkout/LeftColumn";
import PageHeader from "@/components/Checkout/PageHeader";
import RightColumn from "@/components/Checkout/RightColumn";
import Navbar from "@/components/Landing/Navbar";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { reguler_packages, wedding_packages } from "@/constants/package";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatIndonesianDate(dateStr) {
  if (!dateStr) return "";
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  return `${dayName}, ${day} ${monthName} ${year}`;
}

const getAreaImage = (name) => {
  const lowercaseName = (name || "").toLowerCase();
  if (lowercaseName.includes("depan")) return "/depan.jpg";
  if (lowercaseName.includes("tengah")) return "/tengah.jpg";
  if (lowercaseName.includes("belakang")) return "/belakang.jpg";
  return "/depan.jpg";
};

// ─── Content Component ─────────────────────────────────────────────────────────
function CheckoutContent() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const type = searchParams.get("type") || "reguler";
  const dateStr = searchParams.get("date") || "";
  const start = searchParams.get("start") || "";
  const end = searchParams.get("end") || "";

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/area");
        setAreas(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data area:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  if (!idsParam || !dateStr || !start || !end) {
    return (
      <main className="w-full min-h-screen bg-[#f3f4f7]">
        <PageHeader />
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="bg-white border border-[#0F131F]/10 p-8 shadow-sm">
            <h4 className="font-crimson-pro text-2xl text-[#0F131F] mb-3">
              Pemesanan Tidak Ditemukan
            </h4>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              Detail pemesanan Anda tidak lengkap. Silakan pilih area, tanggal, dan waktu terlebih dahulu.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#0F131F] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#7a6047] transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f3f4f7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-black/55 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#896d51]" />
          <span>Memuat detail pemesanan...</span>
        </div>
      </div>
    );
  }

  // Selected area IDs from query
  const selectedAreaIds = idsParam.split(",");

  // Parse duration
  const startHour = parseInt(start.split(":")[0]) || 8;
  const endHour = parseInt(end.split(":")[0]) || 11;
  const duration = endHour - startHour;

  // Resolve areas and calculate prices
  let totalDiscountedPrice = 0;
  let totalOriginalPrice = 0;
  let resolvedAreaNames = [];
  let firstAreaImage = "/depan.jpg";

  selectedAreaIds.forEach((areaId, idx) => {
    // Try finding in API fetched areas
    const foundArea = areas.find((a) => String(a.id) === String(areaId));
    if (foundArea) {
      resolvedAreaNames.push(foundArea.name);
      if (idx === 0) {
        firstAreaImage = getAreaImage(foundArea.name);
      }
      
      const priceObj = foundArea.areaPrices?.find(
        (ap) => ap.reservationType?.name?.toLowerCase() === type
      );
      const discountedPrice = priceObj ? Number(priceObj.price) : 0;
      // Add a premium aesthetic 25% discount to API area prices
      const originalPrice = Math.round(discountedPrice * 1.25 / 50000) * 50000;
      
      totalDiscountedPrice += discountedPrice;
      totalOriginalPrice += originalPrice;
    } else {
      // Try finding in local fallback constants
      const currentPackages = type === "wedding" ? wedding_packages : reguler_packages;
      const fallbackPkg = currentPackages.find((p) => String(p.id) === String(areaId));
      if (fallbackPkg) {
        const nameClean = fallbackPkg.name.replace("Wedding ", "");
        resolvedAreaNames.push(nameClean);
        if (idx === 0) {
          firstAreaImage = fallbackPkg.img || fallbackPkg.thumbnail || "/depan.jpg";
        }
        
        let discountedPrice = 0;
        let originalPrice = 0;
        if (type === "wedding") {
          discountedPrice = fallbackPkg.five_hours_disc_val || 0;
          originalPrice = fallbackPkg.current_five_hours_val || discountedPrice;
        } else {
          discountedPrice = fallbackPkg.priceVal || 0;
          originalPrice = fallbackPkg.priceOriVal || discountedPrice;
        }
        totalDiscountedPrice += discountedPrice;
        totalOriginalPrice += originalPrice;
      } else {
        resolvedAreaNames.push(`Area ${areaId}`);
      }
    }
  });

  const venueName = (type === "wedding" ? "Wedding " : "") + resolvedAreaNames.join(" & ");
  const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
  const totalTax = Math.round(totalDiscountedPrice * 0.1);
  const totalPayable = totalDiscountedPrice + totalTax;
  const formattedDate = formatIndonesianDate(dateStr);

  const bookingData = {
    venueName: venueName || "Semi-Indoor & Outdoor",
    venueLocation: "Bango Parc, Depok",
    date: formattedDate,
    startTime: start,
    endTime: end,
    duration,
    pricePerSession: totalDiscountedPrice,
    originalPrice: totalOriginalPrice,
    discount: totalDiscount,
    tax: totalTax,
    total: totalPayable,
    image: firstAreaImage,
  };

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader />
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-12 gap-6 sm:gap-8">
        <LeftColumn data={bookingData} />
        <RightColumn data={bookingData} />
      </section>
    </main>
  );
}

// ─── Main Page Export with Suspense ────────────────────────────────────────────
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f3f4f7] text-[#0F131F]">
          <span className="text-lg font-medium">Memuat halaman checkout...</span>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
