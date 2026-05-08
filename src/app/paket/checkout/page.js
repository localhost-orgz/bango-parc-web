"use client";

import LeftColumn from "@/components/Checkout/LeftColumn";
import PageHeader from "@/components/Checkout/PageHeader";
import RightColumn from "@/components/Checkout/RightColumn";
import {
  CalendarDays,
  Clock,
  Users,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

// ─── Dummy Data ────────────────────────────────────────────────────────────────
const bookingData = {
  venueName: "Semi-Indoor & Outdoor",
  venueLocation: "Jl. Contoh No. 12, Depok",
  date: "Sabtu, 24 Mei 2025",
  startTime: "09:00",
  endTime: "12:00",
  duration: 3,
  pricePerSession: 2000000,
  originalPrice: 2500000,
  discount: 500000,
  tax: 200000,
  total: 2200000,
  image: "/about-us2.jpg",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

// ─── Page ──────────────────────────────────────────────────────────────────────

function Page() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <PageHeader />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-12 gap-6 sm:gap-8">
        <LeftColumn data={bookingData} />
        <RightColumn data={bookingData} />
      </section>
    </main>
  );
}

export default Page;
