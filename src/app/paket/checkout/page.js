"use client";

import LeftColumn from "@/components/Checkout/LeftColumn";
import PageHeader from "@/components/Checkout/PageHeader";
import RightColumn from "@/components/Checkout/RightColumn";
import Navbar from "@/components/Landing/Navbar";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { reguler_packages, wedding_packages } from "@/constants/package";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const FALLBACK_ADDONS = [
  {
    id: 1,
    name: "Dokumentasi Tambahan (Foto & Video)",
    price: 3500000,
    description: "Sesi liputan foto & video sepanjang acara oleh fotografer & videografer profesional.",
  },
  {
    id: 2,
    name: "Sound System & Lighting Premium",
    price: 5000000,
    description: "Sistem suara konser & tata lampu panggung profesional untuk kemeriahan acara.",
  },
  {
    id: 3,
    name: "Catering Buffet Premium (per 50 pax)",
    price: 7500000,
    description: "Menu prasmanan mewah khas Bango Parc untuk 50 pax tamu undangan.",
  },
  {
    id: 4,
    name: "Live Band & Music Performance",
    price: 4000000,
    description: "Pemusik dan penyanyi profesional untuk menghibur tamu undangan sepanjang acara.",
  },
  {
    id: 5,
    name: "Dekorasi Bunga Segar (Premium Florist)",
    price: 8000000,
    description: "Dekorasi bunga hidup segar eksklusif di area panggung utama dan meja VIP.",
  },
];

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
  const [areas, setAreas] = useState([]);
  const [addonsList, setAddonsList] = useState([]);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [bookingSession, setBookingSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Get booking session from localStorage
    const saved = localStorage.getItem("bango_parc_booking_session");
    if (saved) {
      try {
        setBookingSession(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal membaca session booking:", e);
      }
    }

    // 2. Fetch areas & addons list
    const fetchData = async () => {
      try {
        const [areasRes, addonsRes] = await Promise.allSettled([
          axiosInstance.get("https://bango-parc-service.vercel.app/api/area"),
          axiosInstance.get("https://bango-parc-service.vercel.app/api/addon")
        ]);

        if (areasRes.status === "fulfilled") {
          setAreas(areasRes.value.data.data || []);
        }

        if (addonsRes.status === "fulfilled" && addonsRes.value.data?.data?.length > 0) {
          setAddonsList(addonsRes.value.data.data);
        } else {
          setAddonsList(FALLBACK_ADDONS);
        }
      } catch (err) {
        console.error("Gagal mengambil data checkout:", err);
        setAddonsList(FALLBACK_ADDONS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleAddon = (addonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

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

  if (!bookingSession) {
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

  // Deconstruct parameters from local storage session
  const { ids: idsParam, type, date: dateStr, start, end } = bookingSession;

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

  // Selected area IDs
  const selectedAreaIds = idsParam.split(",");

  // Parse duration
  const startHour = parseInt(start.split(":")[0]) || 8;
  const endHour = parseInt(end.split(":")[0]) || 11;
  const duration = endHour - startHour;

  // Calculate booking interval multiplier
  const intervalDuration = type === "wedding" ? 5 : 3;
  const numIntervals = Math.max(1, Math.round(duration / intervalDuration));

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
      const baseDiscounted = priceObj ? Number(priceObj.price) : 0;
      const discountedPrice = baseDiscounted * numIntervals;
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
        
        let baseDiscounted = 0;
        let baseOriginal = 0;
        if (type === "wedding") {
          baseDiscounted = fallbackPkg.five_hours_disc_val || 0;
          baseOriginal = fallbackPkg.current_five_hours_val || baseDiscounted;
        } else {
          baseDiscounted = fallbackPkg.priceVal || 0;
          baseOriginal = fallbackPkg.priceOriVal || baseDiscounted;
        }
        const discountedPrice = baseDiscounted * numIntervals;
        const originalPrice = baseOriginal * numIntervals;
        totalDiscountedPrice += discountedPrice;
        totalOriginalPrice += originalPrice;
      } else {
        resolvedAreaNames.push(`Area ${areaId}`);
      }
    }
  });

  const venueName = (type === "wedding" ? "Wedding " : "") + resolvedAreaNames.join(" & ");
  const formattedDate = formatIndonesianDate(dateStr);

  const selectedAddons = addonsList.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotalPrice = selectedAddons.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const bookingData = {
    venueName: venueName || "Semi-Indoor & Outdoor",
    venueLocation: "Bango Parc, Depok",
    date: formattedDate,
    startTime: start,
    endTime: end,
    duration,
    pricePerSession: totalDiscountedPrice,
    originalPrice: totalDiscountedPrice,
    discount: 0,
    tax: 0,
    total: totalDiscountedPrice + addonsTotalPrice,
    image: firstAreaImage,
    selectedAddons: selectedAddons,
  };

  const handlePaymentProceed = async () => {
    // 1. Get customerId from localStorage profile
    let customerId = 1;
    const savedProfile = localStorage.getItem("bango_parc_user_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        customerId = Number(parsed.id) || 1;
      } catch (e) {
        console.error("Error parsing user profile:", e);
      }
    }

    // 2. Map reservationTypeId from type
    const reservationTypeId = type === "wedding" ? 3 : 1;

    // 3. Format ISO timestamps (UTC format)
    const startDateTime = `${dateStr}T${start}:00.000Z`;
    const endDateTime = `${dateStr}T${end}:00.000Z`;

    // 4. Map areas
    const areasPayload = selectedAreaIds.map((id) => ({
      areaId: Number(id) || id,
    }));

    const reqBody = {
      customerId,
      reservationTypeId,
      startDateTime,
      endDateTime,
      areas: areasPayload,
      addons: selectedAddonIds.map((id) => ({
        addonId: Number(id) || id,
      })),
    };

    try {
      const res = await axiosInstance.post("https://bango-parc-service.vercel.app/api/reservation", reqBody);
      const responseData = res.data.data || res.data;

      // Save order details to localStorage for /payment page display
      const totalAmount = totalDiscountedPrice + addonsTotalPrice;
      const dpAmount = totalAmount > 2000000 ? 1000000 : totalAmount * 0.5;
      const createdOrder = {
        venueName: bookingData.venueName,
        venueLocation: bookingData.venueLocation,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        duration: bookingData.duration,
        subtotal: totalAmount,
        discount: 0,
        tax: 0,
        total: totalAmount,
        dpAmount: dpAmount,
        orderCode: responseData.bookingCode || responseData.code || `BGP-${Date.now()}`,
        reservationId: responseData.id,
      };
      localStorage.setItem("bango_parc_payment_order", JSON.stringify(createdOrder));
      localStorage.removeItem("bango_parc_payment_timer_start");

      router.push("/payment");
    } catch (err) {
      console.error("Gagal membuat reservasi:", err);
      alert(err.response?.data?.message || "Gagal memproses pemesanan. Silakan coba lagi.");
      throw err;
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader />
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-12 gap-6 sm:gap-8">
        <LeftColumn
          data={bookingData}
          addonsList={addonsList}
          selectedAddonIds={selectedAddonIds}
          onToggleAddon={handleToggleAddon}
        />
        <RightColumn data={bookingData} onPaymentProceed={handlePaymentProceed} />
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
