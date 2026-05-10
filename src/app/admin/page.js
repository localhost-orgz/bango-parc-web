"use client";

import { useState } from "react";
import { Bell, Image as ImageIcon, ChevronDown } from "lucide-react";

import BookingCalendar from "@/components/BookingCalendar";

import { bookedDates } from "@/constants/bookings";
import RecentReservations from "@/components/admin/admin/RecentReservations";
import CategoryCard from "@/components/admin/admin/CategoryCard";
import TrendCard from "@/components/admin/admin/TrendCard";
import StatCard from "@/components/admin/admin/StatCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

const categoryData = [
  { name: "Reguler", value: 60, color: "#6ecac6" },
  { name: "Wedding", value: 40, color: "#0F131F" },
];

const venueData = [
  { name: "Area Depan", count: 3, max: 14 },
  { name: "Area Tengah", count: 9, max: 14 },
  { name: "Area Belakang", count: 2, max: 14 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [filter, setFilter] = useState("Bulanan");

  return (
    <>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#0F131F]/10 px-8 flex items-center justify-between shrink-0">
          <h1 className="font-crimson-pro text-2xl text-[#0F131F]">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-black/40">Sabtu, 9 Mei 2026</span>
            <button className="relative p-2 hover:bg-[#0F131F]/5 transition-colors">
              <Bell size={18} strokeWidth={1.5} color="#0F131F" />
            </button>
            <div className="w-9 h-9 bg-[#0F131F] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-8 flex flex-col gap-6 overflow-auto">
          {/* Overview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Overview
              </h2>
              <button className="flex items-center gap-1.5 border border-[#0F131F] px-3 py-1.5 text-xs font-semibold bg-[#0F131F] text-white">
                {filter}
                <ChevronDown size={12} />
              </button>
            </div>

            <div className="flex gap-4">
              <StatCard
                title="Reservasi bulan ini"
                value="67"
                sub="+4 dari bulan lalu"
              />
              <StatCard
                title="Menunggu Verifikasi"
                value="3"
                sub="Segera verifikasi!"
                accent
                highlight
              />
              <StatCard
                title="Revenue Bulan ini"
                value="Rp. 19.000.000"
                sub="DP + Pelunasan"
              />
              <StatCard
                title="Tingkat Okupansi"
                value="50 %"
                sub="Bulan ini per hari ini"
              />
            </div>
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              <TrendCard />
            </div>
            <div className="col-span-4">
              <CategoryCard categoryData={categoryData} venueData={venueData} />
            </div>
          </section>

          {/* Calendar + Recent Row */}
          <section className="grid grid-cols-12 gap-4">
            <div className="col-span-7">
              {/* <OccupancyCalendar /> */}
              <BookingCalendar
                onDateSelect={(data) => {
                  console.log("Selected date:", data);
                }}
              />
            </div>
            <div className="col-span-5">
              <RecentReservations bookedDates={bookedDates} />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
