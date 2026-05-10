"use client";

import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  CreditCard,
  CalendarDays,
  DollarSign,
  Package,
  Users,
  Image as ImageIcon,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  CalendarDays as CalIcon,
  ArrowRight,
  ShieldCheck,
  User,
  TrendingUp,
  Wallet,
  X,
  ReceiptText,
  BadgeCheck,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const usersData = [
  {
    id: "USR-001",
    name: "Andi Pratama",
    email: "andi.pratama@email.com",
    whatsapp: "+62 812-3456-7890",
    role: "user",
    avatar: "A",
    avatarColor: "bg-[#896d51]",
    joinedAt: "12 Januari 2025",
    stats: { planned: 3, finished: 5, canceled: 1, totalSpent: 8500000 },
    orders: [
      {
        id: "B-2025-011",
        area: "Semi-Indoor & Outdoor",
        type: "Reguler",
        date: "15 Mar 2025",
        amount: 2000000,
        status: "Finished",
      },
      {
        id: "B-2025-022",
        area: "Outdoor",
        type: "Reguler",
        date: "20 Apr 2025",
        amount: 2000000,
        status: "Finished",
      },
      {
        id: "B-2025-034",
        area: "Indoor",
        type: "Reguler",
        date: "10 Jun 2025",
        amount: 2200000,
        status: "Finished",
      },
      {
        id: "B-2025-041",
        area: "Semi-Indoor & Outdoor",
        type: "Reguler",
        date: "5 Aug 2025",
        amount: 2300000,
        status: "Finished",
      },
      {
        id: "B-2026-001",
        area: "Semi-Indoor & Outdoor",
        type: "Reguler",
        date: "24 Mei 2026",
        amount: 2200000,
        status: "Finished",
      },
    ],
  },
  {
    id: "USR-002",
    name: "Siti Rahayu",
    email: "siti.rahayu@email.com",
    whatsapp: "+62 857-1234-5678",
    role: "user",
    avatar: "S",
    avatarColor: "bg-[#0F131F]",
    joinedAt: "3 Maret 2025",
    stats: { planned: 1, finished: 1, canceled: 0, totalSpent: 15000000 },
    orders: [
      {
        id: "B-2026-002",
        area: "Indoor",
        type: "Wedding",
        date: "21 Jun 2026",
        amount: 15000000,
        status: "Finished",
      },
    ],
  },
  {
    id: "USR-003",
    name: "Budi Santoso",
    email: "budi.s@email.com",
    whatsapp: "+62 821-9876-5432",
    role: "user",
    avatar: "B",
    avatarColor: "bg-teal-700",
    joinedAt: "20 Februari 2025",
    stats: { planned: 2, finished: 3, canceled: 2, totalSpent: 5500000 },
    orders: [
      {
        id: "B-2025-013",
        area: "Outdoor",
        type: "Reguler",
        date: "8 Feb 2025",
        amount: 2000000,
        status: "Finished",
      },
      {
        id: "B-2025-028",
        area: "Outdoor",
        type: "Reguler",
        date: "14 Apr 2025",
        amount: 1500000,
        status: "Finished",
      },
      {
        id: "B-2026-003",
        area: "Outdoor",
        type: "Reguler",
        date: "17 Mei 2026",
        amount: 2000000,
        status: "Finished",
      },
    ],
  },
  {
    id: "USR-004",
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    whatsapp: "+62 813-5678-9012",
    role: "user",
    avatar: "D",
    avatarColor: "bg-rose-700",
    joinedAt: "7 April 2025",
    stats: { planned: 0, finished: 1, canceled: 1, totalSpent: 2000000 },
    orders: [
      {
        id: "B-2025-045",
        area: "Semi-Indoor & Outdoor",
        type: "Reguler",
        date: "30 Jul 2025",
        amount: 2000000,
        status: "Finished",
      },
    ],
  },
  {
    id: "USR-005",
    name: "Reza Firmansyah",
    email: "reza.f@email.com",
    whatsapp: "+62 878-2345-6789",
    role: "user",
    avatar: "R",
    avatarColor: "bg-blue-800",
    joinedAt: "1 Januari 2026",
    stats: { planned: 1, finished: 0, canceled: 0, totalSpent: 0 },
    orders: [],
  },
  {
    id: "USR-006",
    name: "Mega Putri",
    email: "mega.p@email.com",
    whatsapp: "+62 819-6543-2109",
    role: "user",
    avatar: "M",
    avatarColor: "bg-violet-700",
    joinedAt: "15 Juni 2025",
    stats: { planned: 0, finished: 2, canceled: 0, totalSpent: 4000000 },
    orders: [
      {
        id: "B-2025-051",
        area: "Outdoor",
        type: "Reguler",
        date: "10 Sep 2025",
        amount: 2000000,
        status: "Finished",
      },
      {
        id: "B-2026-006",
        area: "Outdoor",
        type: "Reguler",
        date: "18 Mei 2026",
        amount: 2000000,
        status: "Finished",
      },
    ],
  },
  {
    id: "USR-007",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@bangoparc.com",
    whatsapp: "+62 811-0000-0001",
    role: "admin",
    avatar: "AF",
    avatarColor: "bg-[#896d51]",
    joinedAt: "1 Januari 2024",
    stats: { planned: 0, finished: 0, canceled: 0, totalSpent: 0 },
    orders: [],
  },
  {
    id: "USR-008",
    name: "Nina Kartika",
    email: "nina.kartika@email.com",
    whatsapp: "+62 856-7890-1234",
    role: "user",
    avatar: "N",
    avatarColor: "bg-amber-700",
    joinedAt: "28 Agustus 2025",
    stats: { planned: 2, finished: 1, canceled: 1, totalSpent: 3500000 },
    orders: [
      {
        id: "B-2025-062",
        area: "Indoor",
        type: "Reguler",
        date: "20 Nov 2025",
        amount: 3500000,
        status: "Finished",
      },
    ],
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Verifikasi Pembayaran", icon: CreditCard, badge: 3 },
  { label: "Data Reservasi", icon: CalendarDays },
];
const dataItems = [
  { label: "Harga & Area", icon: DollarSign },
  { label: "Add-On", icon: Package },
  { label: "Pengguna", icon: Users, active: true },
  { label: "Gallery", icon: ImageIcon },
];

function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#0F131F] flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-crimson-pro text-white text-xl leading-tight">
          Bango Parc
        </p>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Main
          </p>
          {navItems.map(({ label, icon: Icon, badge }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors border-l-2 border-transparent mb-0.5"
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
          {dataItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors mb-0.5 ${active ? "bg-[#896d51]/20 text-white border-l-2 border-[#896d51]" : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"}`}
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

// ─── Small helpers ────────────────────────────────────────────────────────────

function RoleBadge({ role }) {
  return role === "admin" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#896d51]/10 border border-[#896d51]/30 text-[#896d51] text-[10px] font-bold uppercase tracking-wide">
      <ShieldCheck size={10} strokeWidth={2} /> Admin
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0F131F]/5 border border-[#0F131F]/15 text-black/50 text-[10px] font-bold uppercase tracking-wide">
      <User size={10} strokeWidth={2} /> User
    </span>
  );
}

function OrderStatusBadge({ status }) {
  const map = {
    Finished: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Canceled: "bg-red-50 border-red-200 text-red-600",
    Ongoing: "bg-amber-50 border-amber-200 text-amber-700",
  };
  return (
    <span
      className={`px-2 py-0.5 border text-[10px] font-semibold ${map[status] || map.Ongoing}`}
    >
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-bold px-1.5 py-0.5 border ${type === "Wedding" ? "border-[#896d51] text-[#896d51] bg-[#896d51]/5" : "border-[#0F131F]/20 text-[#0F131F]/50"}`}
    >
      {type}
    </span>
  );
}

function SortHeader({ label, field, sortField, sortDir, onSort }) {
  const active = sortField === field;
  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-black/40 hover:text-black/70 transition-colors group"
    >
      {label}
      <span
        className={`transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
      >
        {active && sortDir === "asc" ? (
          <ChevronUp size={11} />
        ) : (
          <ChevronDown size={11} />
        )}
      </span>
    </button>
  );
}

// ─── Stat Card (inside detail) ────────────────────────────────────────────────

function MiniStat({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="flex-1 min-w-0 border border-[#0F131F]/10 bg-[#f9f8f6] p-3 flex flex-col gap-1">
      <div className={`flex items-center gap-1.5 ${color}`}>
        <Icon size={12} strokeWidth={2} />
        <span className="text-[10px] font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="font-crimson-pro text-2xl text-[#0F131F] leading-tight">
        {value}
      </p>
      {sub && <p className="text-[10px] text-black/35">{sub}</p>}
    </div>
  );
}

// ─── Detail Drawer / Panel ────────────────────────────────────────────────────

function DetailPanel({ user, onClose }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-3">
        <div className="w-14 h-14 border-2 border-dashed border-[#0F131F]/15 flex items-center justify-center">
          <Users size={20} strokeWidth={1} color="#0F131F50" />
        </div>
        <p className="text-sm text-black/30 font-crimson-text">
          Pilih pengguna untuk melihat detail
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#0F131F]/10 bg-white sticky top-0 z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 ${user.avatarColor} flex items-center justify-center shrink-0`}
          >
            <span className="text-white font-bold text-sm">{user.avatar}</span>
          </div>
          <div>
            <p className="font-crimson-pro text-xl text-[#0F131F] leading-tight">
              {user.name}
            </p>
            <div className="mt-0.5">
              <RoleBadge role={user.role} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-black/30 hover:text-black/60 transition-colors mt-0.5"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="px-6 py-5 flex flex-col gap-6">
        {/* Account Info */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Informasi Akun
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "WhatsApp", value: user.whatsapp },
              {
                icon: ShieldCheck,
                label: "Role",
                value: user.role === "admin" ? "Administrator" : "User",
              },
              { icon: CalIcon, label: "Bergabung", value: user.joinedAt },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-6 shrink-0 flex justify-center">
                  <Icon
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#896d51]"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-black/35 uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="text-sm text-[#0F131F] truncate">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8" />

        {/* Stats */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Statistik
          </p>
          <div className="grid grid-cols-2 gap-2">
            <MiniStat
              icon={Clock}
              label="Planned"
              value={user.stats.planned}
              sub="Akan datang"
              color="text-amber-600"
            />
            <MiniStat
              icon={CheckCircle2}
              label="Selesai"
              value={user.stats.finished}
              sub="Terlaksana"
              color="text-emerald-700"
            />
            <MiniStat
              icon={XCircle}
              label="Dibatalkan"
              value={user.stats.canceled}
              sub="Tidak jadi"
              color="text-red-500"
            />
            <MiniStat
              icon={Wallet}
              label="Total Spent"
              value={`Rp${(user.stats.totalSpent / 1000000).toFixed(1)}jt`}
              sub={`Rp${user.stats.totalSpent.toLocaleString("id-ID")}`}
              color="text-[#896d51]"
            />
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8" />

        {/* Order History */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">
              Riwayat Reservasi
            </p>
            <span className="text-[10px] text-black/35">
              {user.orders.length} order
            </span>
          </div>

          {user.orders.length === 0 ? (
            <div className="border border-dashed border-[#0F131F]/15 py-8 flex flex-col items-center gap-2">
              <ReceiptText
                size={20}
                strokeWidth={1}
                className="text-black/20"
              />
              <p className="text-xs text-black/30">Belum ada reservasi</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#0F131F]/8 bg-[#f9f8f6] p-3 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#0F131F]">
                        {order.id}
                      </p>
                      <p className="text-xs text-black/50 mt-0.5">
                        {order.area}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <TypeBadge type={order.type} />
                      <span className="text-[10px] text-black/35">
                        {order.date}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0F131F]">
                      Rp{order.amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [roleOpen, setRoleOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [selectedId, setSelectedId] = useState(null);

  const roleOptions = ["Semua", "user", "admin"];

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let result = [...usersData];
    if (roleFilter !== "Semua")
      result = result.filter((u) => u.role === roleFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.whatsapp.includes(q),
      );
    }
    result.sort((a, b) => {
      let va, vb;
      if (sortField === "stats.totalSpent") {
        va = a.stats.totalSpent;
        vb = b.stats.totalSpent;
      } else if (sortField === "joinedAt") {
        va = a.joinedAt;
        vb = b.joinedAt;
      } else if (sortField === "role") {
        va = a.role;
        vb = b.role;
      } else {
        va = a.name.toLowerCase();
        vb = b.name.toLowerCase();
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [usersData, search, roleFilter, sortField, sortDir]);

  const selectedUser = usersData.find((u) => u.id === selectedId) || null;

  return (
    <div className="flex min-h-screen bg-[#f3f4f7] font-sans">
      <Sidebar />

      {/* Center — Table */}
      <div
        className={`flex flex-col min-w-0 transition-all duration-300 ${selectedUser ? "flex-1" : "flex-1"} border-r border-[#0F131F]/10`}
      >
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#0F131F]/10 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-crimson-pro text-2xl text-[#0F131F]">
              Pengguna
            </h1>
            <span className="text-[10px] font-bold text-black/30 bg-[#0F131F]/5 border border-[#0F131F]/10 px-2 py-0.5">
              {usersData.length} total
            </span>
          </div>
          <div className="w-9 h-9 bg-[#0F131F] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
        </header>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
          <p className="text-sm text-black/40">
            Kelola akun pengguna yang terdaftar di sistem Bango Parc.
          </p>

          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search
                size={14}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, email, atau nomor WA..."
                className="w-full h-10 pl-9 pr-3 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors placeholder:text-black/25"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50 transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Role Filter */}
            <div className="relative">
              <button
                onClick={() => setRoleOpen((o) => !o)}
                className="flex items-center gap-2 h-10 px-3 border border-[#0F131F]/15 bg-white text-sm text-black/60 hover:border-[#0F131F]/30 transition-colors min-w-32"
              >
                <span className="flex-1 text-left capitalize">
                  {roleFilter === "Semua" ? "Semua Role" : roleFilter}
                </span>
                <ChevronDown
                  size={13}
                  className={`transition-transform ${roleOpen ? "rotate-180" : ""}`}
                />
              </button>
              {roleOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-[#0F131F]/15 min-w-full shadow-sm">
                  {roleOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setRoleFilter(o);
                        setRoleOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-[#f3f4f7] transition-colors capitalize ${roleFilter === o ? "font-semibold text-[#0F131F]" : "text-black/60"}`}
                    >
                      {o === "admin" && (
                        <ShieldCheck
                          size={12}
                          strokeWidth={2}
                          className="text-[#896d51]"
                        />
                      )}
                      {o === "user" && (
                        <User
                          size={12}
                          strokeWidth={2}
                          className="text-black/40"
                        />
                      )}
                      {o === "Semua" ? "Semua Role" : o}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-xs text-black/35 shrink-0">
              {filtered.length} hasil
            </span>
          </div>

          {/* Summary chips */}
          <div className="flex items-center gap-2">
            {[
              {
                label: "Total User",
                value: usersData.filter((u) => u.role === "user").length,
                color: "text-black/60",
              },
              {
                label: "Total Admin",
                value: usersData.filter((u) => u.role === "admin").length,
                color: "text-[#896d51]",
              },
              {
                label: "Total Reservasi Selesai",
                value: usersData.reduce((s, u) => s + u.stats.finished, 0),
                color: "text-emerald-700",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white border border-[#0F131F]/10 px-3 py-1.5"
              >
                <span className={`text-sm font-bold ${color}`}>{value}</span>
                <span className="text-xs text-black/40">{label}</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="flex-1 bg-white border border-[#0F131F]/10 overflow-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0 bg-white z-10 border-b border-[#0F131F]/10">
                <tr>
                  <th className="text-left px-5 py-3">
                    <SortHeader
                      label="Nama"
                      field="name"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Email"
                      field="email"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                      WhatsApp
                    </span>
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Role"
                      field="role"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Total Spent"
                      field="stats.totalSpent"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                      Aksi
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-sm text-black/30"
                    >
                      Tidak ada pengguna yang cocok
                    </td>
                  </tr>
                )}
                {filtered.map((u) => {
                  const isSelected = selectedId === u.id;
                  return (
                    <tr
                      key={u.id}
                      className={`border-b border-[#0F131F]/5 last:border-0 transition-colors ${isSelected ? "bg-[#896d51]/6 border-l-2 border-l-[#896d51]" : "hover:bg-[#f9f8f6] border-l-2 border-l-transparent"}`}
                    >
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 ${u.avatarColor} flex items-center justify-center shrink-0`}
                          >
                            <span className="text-white text-[11px] font-bold">
                              {u.avatar}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-[#0F131F] text-sm">
                              {u.name}
                            </p>
                            <p className="text-[10px] text-black/35">{u.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-4">
                        <p className="text-sm text-black/60">{u.email}</p>
                      </td>

                      {/* WhatsApp */}
                      <td className="px-4 py-4">
                        <p className="text-sm text-black/60">{u.whatsapp}</p>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <RoleBadge role={u.role} />
                      </td>

                      {/* Total Spent */}
                      <td className="px-4 py-4">
                        {u.stats.totalSpent > 0 ? (
                          <p className="text-sm font-bold text-[#0F131F]">
                            Rp{u.stats.totalSpent.toLocaleString("id-ID")}
                          </p>
                        ) : (
                          <p className="text-sm text-black/25">—</p>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4">
                        <button
                          onClick={() =>
                            setSelectedId(isSelected ? null : u.id)
                          }
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border transition-colors ${
                            isSelected
                              ? "bg-[#0F131F] text-white border-[#0F131F]"
                              : "border-[#0F131F]/20 text-[#0F131F]/60 hover:border-[#0F131F] hover:text-[#0F131F] bg-white"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <X size={11} strokeWidth={2.5} /> Tutup
                            </>
                          ) : (
                            <>
                              Detail <ArrowRight size={11} strokeWidth={2.5} />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Panel — Detail */}
      <div
        className={`bg-white border-l border-[#0F131F]/10 transition-all duration-300 shrink-0 ${
          selectedUser ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        {selectedUser && (
          <DetailPanel
            user={selectedUser}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}
