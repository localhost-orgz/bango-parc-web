"use client";

import { useState, useEffect } from "react";
import { Bell, Image as ImageIcon, ChevronDown, Loader2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

import AdminCalendar from "@/components/admin/AdminCalendar";

import RecentReservations from "@/components/admin/admin/RecentReservations";
import CategoryCard from "@/components/admin/admin/CategoryCard";
import TrendCard from "@/components/admin/admin/TrendCard";
import StatCard from "@/components/admin/admin/StatCard";

const formatRupiah = (amount) => {
  if (amount === null || amount === undefined) return "Rp0";
  return "Rp" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatIndonesianDate = (date) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default function AdminDashboard() {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState(today.getMonth() + 1);
  const [activeYear, setActiveYear] = useState(today.getFullYear());
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/dashboard", {
          params: { month: activeMonth, year: activeYear }
        });
        const rawData = res.data;
        const actualData = (rawData && rawData.data) ? rawData.data : rawData;
        setDashboardData(actualData || null);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [activeMonth, activeYear]);

  const defaultData = {
    reservationsThisMonth: 0,
    diffFromLastMonth: 0,
    waitingVerification: 0,
    revenueThisMonth: 0,
    occupancyRate: 0,
    reservationsPerMonth: [],
    reservationTypeCompare: [],
    areaReservationCount: []
  };

  const data = dashboardData || defaultData;

  // Format Category Data for PieChart
  const categoryData = (data.reservationTypeCompare || []).map((item) => ({
    name: item.type,
    value: item.percent,
    color: item.type?.toLowerCase() === "wedding" ? "#0F131F" : "#6ecac6",
  }));

  // Format Venue Data for progress bars
  const venueData = (data.areaReservationCount || []).map((item) => ({
    name: item.area,
    count: item.count,
    max: Math.max(...(data.areaReservationCount || []).map(a => a.count), 1),
  }));

  return (
    <>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#0F131F]/10 px-4 md:px-8 flex items-center justify-between shrink-0">
          <h1 className="font-crimson-pro text-2xl text-[#0F131F]">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-black/40 hidden sm:inline">
              {formatIndonesianDate(today)}
            </span>
            <button className="relative p-2 hover:bg-[#0F131F]/5 transition-colors">
              <Bell size={18} strokeWidth={1.5} color="#0F131F" />
            </button>
            <div className="w-9 h-9 bg-[#0F131F] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 overflow-auto relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-xs flex items-center justify-center z-50">
              <Loader2 className="w-8 h-8 animate-spin text-[#896d51]" />
            </div>
          )}

          {/* Overview */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40">
                Overview
              </h2>
              <select
                value={activeMonth}
                onChange={(e) => setActiveMonth(Number(e.target.value))}
                className="border border-[#0F131F] px-3 py-1.5 text-xs font-semibold bg-[#0F131F] text-white outline-none cursor-pointer"
              >
                <option value={1}>Januari</option>
                <option value={2}>Februari</option>
                <option value={3}>Maret</option>
                <option value={4}>April</option>
                <option value={5}>Mei</option>
                <option value={6}>Juni</option>
                <option value={7}>Juli</option>
                <option value={8}>Agustus</option>
                <option value={9}>September</option>
                <option value={10}>Oktober</option>
                <option value={11}>November</option>
                <option value={12}>Desember</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Reservasi bulan ini"
                value={String(data.reservationsThisMonth)}
                sub={`${data.diffFromLastMonth >= 0 ? "+" : ""}${data.diffFromLastMonth} dari bulan lalu`}
              />
              <StatCard
                title="Menunggu Verifikasi"
                value={String(data.waitingVerification)}
                sub="Segera verifikasi!"
                accent
                highlight={data.waitingVerification > 0}
              />
              <StatCard
                title="Revenue Bulan ini"
                value={formatRupiah(data.revenueThisMonth)}
                sub="DP + Pelunasan"
              />
              <StatCard
                title="Tingkat Okupansi"
                value={`${data.occupancyRate}%`}
                sub="Bulan ini per hari ini"
              />
            </div>
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-1 lg:col-span-8">
              <TrendCard 
                trendData={data.reservationsPerMonth}
                activeYear={activeYear}
                onYearChange={setActiveYear}
              />
            </div>
            <div className="col-span-1 lg:col-span-4">
              <CategoryCard categoryData={categoryData} venueData={venueData} />
            </div>
          </section>

          {/* Calendar + Recent Row */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="col-span-1 lg:col-span-7">
              {/* <OccupancyCalendar /> */}
              <AdminCalendar
                onDateSelect={(date) => {
                  console.log("Selected date:", date);
                }}
              />
            </div>
            <div className="col-span-1 lg:col-span-5">
              <RecentReservations />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
