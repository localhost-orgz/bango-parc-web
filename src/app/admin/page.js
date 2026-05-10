"use client";

import { useState } from "react";
import {
  Bell,
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  DollarSign,
  Users,
  Package,
  Image as ImageIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PieChart, Pie, Legend } from "recharts";
import BookingCalendar from "@/components/BookingCalendar";

import { bookedDates } from "@/constants/bookings";

// ─── Data ─────────────────────────────────────────────────────────────────────

const trendData = [
  { month: "Jan", count: 6 },
  { month: "Feb", count: 12 },
  { month: "Mar", count: 6 },
  { month: "Apr", count: 6 },
  { month: "Mei", count: 6 },
  { month: "Jun", count: 6 },
];

const categoryData = [
  { name: "Reguler", value: 60, color: "#6ecac6" },
  { name: "Wedding", value: 40, color: "#0F131F" },
];

const venueData = [
  { name: "Area Depan", count: 3, max: 14 },
  { name: "Area Tengah", count: 9, max: 14 },
  { name: "Area Belakang", count: 2, max: 14 },
];

// const recentReservations = [
//   { code: "B-001", event: "Reguler - 2 Mei", status: "Canceled" },
//   { code: "B-002", event: "Wedding - 21 Mei", status: "Approved" },
// ];

const recentReservations = Object.entries(bookedDates)
  .flatMap(([date, data], index) =>
    data.events.map((event, eventIndex) => ({
      code: `B-${String(index + eventIndex + 1).padStart(3, "0")}`,
      event: `${event.name} - ${date}`,
      status:
        data.status === "wedding" || data.status === "full"
          ? "Approved"
          : "Pending",
    })),
  )
  .slice(0, 5);

// const MONTHS = [
//   "Januari",
//   "Februari",
//   "Maret",
//   "April",
//   "Mei",
//   "Juni",
//   "Juli",
//   "Agustus",
//   "September",
//   "Oktober",
//   "November",
//   "Desember",
// ];

// const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

// Calendar occupancy data for May 2026
// const occupancyData = {
//   "2026-05-02": "full",
//   "2026-05-04": "full",
//   "2026-05-09": "full",
//   "2026-05-13": "full",
//   "2026-05-15": "full",
//   "2026-05-18": "full",
//   "2026-05-21": "full",
//   "2026-05-22": "full",
//   "2026-05-25": "full",
//   "2026-05-03": "partial",
//   "2026-05-12": "partial",
//   "2026-05-17": "partial",
// };

// function toKey(year, month, day) {
//   return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
// }

// function getDaysInMonth(year, month) {
//   return new Date(year, month + 1, 0).getDate();
// }

// function getFirstDayOfMonth(year, month) {
//   // Returns 0=Sun...6=Sat, convert to Mon-first: Mon=0..Sun=6
//   const raw = new Date(year, month, 1).getDay();
//   return (raw + 6) % 7;
// }

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Verifikasi Pembayaran", icon: CreditCard, badge: 3 },
  { label: "Data Reservasi", icon: CalendarDays },
];

const dataItems = [
  { label: "Harga & Area", icon: DollarSign },
  { label: "Add-On", icon: Package },
  { label: "Pengguna", icon: Users },
  { label: "Gallery", icon: ImageIcon },
];

function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#0F131F] flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-crimson-pro text-white text-xl leading-tight">
          Bango Parc
        </p>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Main
          </p>
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors rounded-none mb-0.5 ${
                active
                  ? "bg-[#896d51]/20 text-white border-l-2 border-[#896d51]"
                  : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} strokeWidth={1.5} />
                <span>{label}</span>
              </div>
              {badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Data
          </p>
          {dataItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent mb-0.5"
            >
              <Icon size={15} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ title, value, sub, accent, highlight }) {
  return (
    <div
      className={`flex-1 min-w-0 border p-5 flex flex-col gap-2 ${
        highlight
          ? "bg-[#0F131F] border-red-500 ring-1 ring-red-500"
          : "bg-white border-[#0F131F]/10"
      }`}
    >
      <p className={`text-sm ${highlight ? "text-white/60" : "text-black/50"}`}>
        {title}
      </p>
      <p
        className={`font-crimson-pro leading-none ${
          accent
            ? "text-red-500 text-5xl"
            : highlight
              ? "text-white text-5xl"
              : "text-[#0F131F] text-4xl"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-xs ${highlight ? "text-red-400 font-semibold" : "text-black/40"}`}
      >
        {sub}
      </p>
    </div>
  );
}

// ─── Bar Chart Card ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F131F] border border-white/10 px-3 py-2 text-xs text-white">
        <p className="font-semibold">{label}</p>
        <p className="text-[#896d51]">{payload[0].value} reservasi</p>
      </div>
    );
  }
  return null;
};

function TrendCard() {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-crimson-pro text-xl text-[#0F131F]">
            Tren Reservasi Per Bulan
          </h3>
          <p className="text-xs text-black/40 mt-0.5">
            Reservasi acara yang telah dilaksanakan pada Bango Parc per bulan
            nya
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors">
            <ChevronLeft size={14} />
          </button>
          <div className="flex items-center gap-1 border border-[#0F131F]/20 px-3 py-1.5 text-xs font-semibold">
            2025
            <ChevronDown size={12} />
          </div>
          <button className="h-7 w-7 border border-[#0F131F]/20 flex items-center justify-center hover:bg-[#0F131F]/5 transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={trendData} barSize={32}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#00000066", fontSize: 11 }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#0F131F08" }} />
          <Bar
            dataKey="count"
            radius={0}
            label={{ position: "top", fontSize: 10, fill: "#00000055" }}
          >
            {trendData.map((entry, index) => (
              <Cell key={index} fill="#0F131F" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Right Panel (Pie + Venue Trend) ─────────────────────────────────────────

function CategoryCard() {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-5">
      <div>
        <h3 className="font-crimson-pro text-xl text-[#0F131F]">
          Kategori Event
        </h3>
      </div>

      {/* Pie Chart */}
      <div className="flex items-center justify-center">
        <PieChart width={220} height={160}>
          <Pie
            data={categoryData}
            cx={110}
            cy={75}
            innerRadius={40}
            outerRadius={75}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            paddingAngle={2}
            label={({ name }) => name}
            labelLine={false}
          >
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="flex flex-col gap-2">
        {categoryData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: item.color }}
              />
              <span className="text-black/60">{item.name}</span>
            </div>
            <span className="font-semibold text-[#0F131F]">{item.value}%</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#0F131F]/10" />

      {/* Tren Venue */}
      <div>
        <h3 className="font-crimson-pro text-lg text-[#0F131F] mb-3">
          Tren Venue
        </h3>
        <div className="flex flex-col gap-3">
          {venueData.map((v) => (
            <div key={v.name} className="flex items-center gap-3">
              <span className="text-xs text-black/50 w-24 shrink-0">
                {v.name}
              </span>
              <div className="flex-1 h-2 bg-[#0F131F]/8 rounded-none">
                <div
                  className="h-full bg-[#0F131F] transition-all"
                  style={{ width: `${(v.count / v.max) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[#0F131F] w-5 text-right">
                {v.count}x
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Occupancy Calendar ───────────────────────────────────────────────────────

// function OccupancyCalendar() {
//   const year = 2026;
//   const month = 4; // May (0-indexed)
//   const daysInMonth = getDaysInMonth(year, month);
//   const firstDay = getFirstDayOfMonth(year, month); // Mon-first offset

//   return (
//     <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
//       <h3 className="font-crimson-pro text-xl text-[#0F131F]">
//         Kalender Okupansi — Mei 2026
//       </h3>

//       {/* Day headers (Mon–Sun) */}
//       <div className="grid grid-cols-7 text-center">
//         {DAYS.map((d) => (
//           <div
//             key={d}
//             className="text-[10px] font-semibold uppercase tracking-wide text-black/35 pb-2"
//           >
//             {d}
//           </div>
//         ))}
//       </div>

//       {/* Day cells */}
//       <div className="grid grid-cols-7 gap-1.5">
//         {Array.from({ length: firstDay }).map((_, i) => (
//           <div key={`e-${i}`} />
//         ))}
//         {Array.from({ length: daysInMonth }).map((_, i) => {
//           const day = i + 1;
//           const key = toKey(year, month, day);
//           const status = occupancyData[key];

//           let bg = "bg-[#0F131F] text-white hover:bg-[#0F131F]/80";
//           if (status === "full") bg = "bg-red-500 text-white";
//           if (status === "partial") bg = "bg-blue-500 text-white";

//           return (
//             <div
//               key={day}
//               className={`aspect-square flex items-center justify-center text-sm font-medium cursor-default transition-opacity rounded-none ${bg}`}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>

//       {/* Legend */}
//       <div className="flex flex-wrap items-center gap-4 pt-1">
//         {[
//           { color: "bg-[#0F131F]", label: "Tersedia" },
//           { color: "bg-red-500", label: "Full" },
//           { color: "bg-blue-500", label: "Terisi tapi masih tersedia" },
//         ].map(({ color, label }) => (
//           <div key={label} className="flex items-center gap-1.5">
//             <span className={`w-3 h-3 ${color} rounded-none`} />
//             <span className="text-[11px] text-black/50">{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ─── Recent Reservations ──────────────────────────────────────────────────────

function RecentReservations() {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 flex flex-col gap-4">
      <h3 className="font-crimson-pro text-xl text-[#0F131F]">
        Reservasi Terbaru
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0F131F]/10">
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Kode
              </th>
              <th className="text-left pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Acara
              </th>
              <th className="text-right pb-3 text-xs font-semibold uppercase tracking-wide text-black/40">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentReservations.map((r) => (
              <tr
                key={r.code}
                className="border-b border-[#0F131F]/5 last:border-0"
              >
                <td className="py-3 text-black/60 font-mono text-xs">
                  {r.code}
                </td>
                <td className="py-3 text-[#0F131F]">{r.event}</td>
                <td className="py-3 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold ${
                      r.status === "Canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [filter, setFilter] = useState("Bulanan");

  return (
    <div className="flex min-h-screen bg-[#f3f4f7] font-sans">
      <Sidebar />

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
              <CategoryCard />
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
              <RecentReservations />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
