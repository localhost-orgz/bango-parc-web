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
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  CalendarDays as CalIcon,
  ArrowRight,
  Download,
  AlertCircle,
  Building2,
  Banknote,
  ChevronsUpDown,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const payments = [
  {
    id: "B-2026-001",
    orderer: {
      name: "Andi Pratama",
      email: "andi.pratama@email.com",
      phone: "+62 812-3456-7890",
      avatar: "A",
    },
    area: "Semi-Indoor & Outdoor",
    type: "Reguler",
    date: "Sabtu, 24 Mei 2026",
    time: "09:00 – 12:00",
    duration: 3,
    paymentAmount: 1100000,
    paymentType: "DP",
    totalAmount: 2200000,
    status: "Pending",
    submittedAt: "10 Mei 2026, 14:23",
    evidenceUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop",
  },
  {
    id: "B-2026-002",
    orderer: {
      name: "Siti Rahayu",
      email: "siti.rahayu@email.com",
      phone: "+62 857-1234-5678",
      avatar: "S",
    },
    area: "Indoor",
    type: "Wedding",
    date: "Sabtu, 21 Juni 2026",
    time: "07:00 – 22:00",
    duration: 15,
    paymentAmount: 7500000,
    paymentType: "DP",
    totalAmount: 15000000,
    status: "Pending",
    submittedAt: "9 Mei 2026, 10:05",
    evidenceUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop",
  },
  {
    id: "B-2026-003",
    orderer: {
      name: "Budi Santoso",
      email: "budi.s@email.com",
      phone: "+62 821-9876-5432",
      avatar: "B",
    },
    area: "Outdoor",
    type: "Reguler",
    date: "Minggu, 17 Mei 2026",
    time: "13:00 – 16:00",
    duration: 3,
    paymentAmount: 2200000,
    paymentType: "Pelunasan",
    totalAmount: 2200000,
    status: "Approved",
    submittedAt: "7 Mei 2026, 09:30",
    evidenceUrl:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&auto=format&fit=crop",
  },
  {
    id: "B-2026-004",
    orderer: {
      name: "Dewi Lestari",
      email: "dewi.lestari@email.com",
      phone: "+62 813-5678-9012",
      avatar: "D",
    },
    area: "Semi-Indoor & Outdoor",
    type: "Reguler",
    date: "Jumat, 22 Mei 2026",
    time: "10:00 – 13:00",
    duration: 3,
    paymentAmount: 1000000,
    paymentType: "DP",
    totalAmount: 2000000,
    status: "Rejected",
    submittedAt: "6 Mei 2026, 16:45",
    evidenceUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop",
  },
  {
    id: "B-2026-005",
    orderer: {
      name: "Reza Firmansyah",
      email: "reza.f@email.com",
      phone: "+62 878-2345-6789",
      avatar: "R",
    },
    area: "Indoor",
    type: "Wedding",
    date: "Sabtu, 25 Juli 2026",
    time: "07:00 – 22:00",
    duration: 15,
    paymentAmount: 10000000,
    paymentType: "DP",
    totalAmount: 20000000,
    status: "Pending",
    submittedAt: "8 Mei 2026, 11:20",
    evidenceUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop",
  },
  {
    id: "B-2026-006",
    orderer: {
      name: "Mega Putri",
      email: "mega.p@email.com",
      phone: "+62 819-6543-2109",
      avatar: "M",
    },
    area: "Outdoor",
    type: "Reguler",
    date: "Senin, 18 Mei 2026",
    time: "15:00 – 18:00",
    duration: 3,
    paymentAmount: 2000000,
    paymentType: "Pelunasan",
    totalAmount: 2000000,
    status: "Approved",
    submittedAt: "5 Mei 2026, 13:10",
    evidenceUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&auto=format&fit=crop",
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Verifikasi Pembayaran", icon: CreditCard, active: true, badge: 3 },
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
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors mb-0.5 ${
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

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    Pending: {
      bg: "bg-amber-50 border-amber-200 text-amber-700",
      icon: <Clock size={11} strokeWidth={2} />,
      label: "Pending",
    },
    Approved: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      icon: <CheckCircle2 size={11} strokeWidth={2} />,
      label: "Approved",
    },
    Rejected: {
      bg: "bg-red-50 border-red-200 text-red-600",
      icon: <XCircle size={11} strokeWidth={2} />,
      label: "Rejected",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 border text-[11px] font-semibold ${cfg.bg}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ─── Type Badge ───────────────────────────────────────────────────────────────

function TypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 border ${
        type === "Wedding"
          ? "border-[#896d51] text-[#896d51] bg-[#896d51]/5"
          : "border-[#0F131F]/30 text-[#0F131F]/60 bg-[#0F131F]/3"
      }`}
    >
      {type}
    </span>
  );
}

// ─── Payment Type Badge ───────────────────────────────────────────────────────

function PayTypeBadge({ type }) {
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 ${
        type === "DP"
          ? "bg-blue-50 border border-blue-200 text-blue-700"
          : "bg-purple-50 border border-purple-200 text-purple-700"
      }`}
    >
      {type}
    </span>
  );
}

// ─── Sort Header ──────────────────────────────────────────────────────────────

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

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ item, onApprove, onReject }) {
  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-3">
        <div className="w-14 h-14 border-2 border-dashed border-[#0F131F]/15 flex items-center justify-center">
          <CreditCard size={20} strokeWidth={1} color="#0F131F50" />
        </div>
        <p className="text-sm text-black/30 font-crimson-text">
          Pilih pembayaran untuk melihat detail
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#0F131F]/10 bg-white sticky top-0 z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-crimson-pro text-2xl text-[#0F131F] leading-tight">
              {item.id}
            </p>
            <p className="text-xs text-black/40 mt-0.5">
              Diajukan {item.submittedAt}
            </p>
          </div>
          <StatusBadge status={item.status} />
        </div>
      </div>

      <div className="flex flex-col gap-0 overflow-y-auto px-6 py-5 flex-1">
        {/* Customer Info */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Info Pemesan
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0F131F] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">
                {item.orderer.avatar}
              </span>
            </div>
            <div>
              <p className="font-semibold text-[#0F131F] text-sm">
                {item.orderer.name}
              </p>
              <p className="text-xs text-black/40">Guest</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-black/55">
              <Mail
                size={12}
                strokeWidth={1.5}
                className="shrink-0 text-[#896d51]"
              />
              <span>{item.orderer.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-black/55">
              <Phone
                size={12}
                strokeWidth={1.5}
                className="shrink-0 text-[#896d51]"
              />
              <span>{item.orderer.phone}</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Order Details */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Detail Pesanan
          </p>
          <div className="border border-[#0F131F]/10 bg-[#f9f8f6] p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 size={13} strokeWidth={1.5} color="#896d51" />
                <span className="text-sm font-semibold text-[#0F131F]">
                  {item.area}
                </span>
              </div>
              <TypeBadge type={item.type} />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-[10px] text-black/35 uppercase tracking-wide">
                  Tanggal
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#0F131F]">
                  <CalIcon size={11} strokeWidth={1.5} />
                  <span className="font-medium">{item.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-[#0F131F] font-medium">
                <span>{item.time.split("–")[0].trim()}</span>
              </div>
              <ArrowRight size={10} strokeWidth={2} color="#896d51" />
              <div className="flex items-center gap-1 text-[#0F131F] font-medium">
                <span>{item.time.split("–")[1]?.trim()}</span>
              </div>
              <span className="text-black/30 ml-auto">{item.duration} jam</span>
            </div>
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Payment Info */}
        <section className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Info Pembayaran
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Tipe Pembayaran</span>
              <PayTypeBadge type={item.paymentType} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Jumlah Dibayar</span>
              <span className="text-sm font-bold text-[#0F131F]">
                Rp{item.paymentAmount.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/50">Total Booking</span>
              <span className="text-xs text-black/40">
                Rp{item.totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
            {item.paymentType === "DP" && (
              <div className="flex items-center justify-between border-t border-[#0F131F]/8 pt-2 mt-1">
                <span className="text-xs text-black/50">Sisa Pelunasan</span>
                <span className="text-xs font-semibold text-amber-600">
                  Rp
                  {(item.totalAmount - item.paymentAmount).toLocaleString(
                    "id-ID",
                  )}
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8 mb-5" />

        {/* Evidence */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">
              Bukti Pembayaran
            </p>
            <button className="flex items-center gap-1 text-xs text-[#896d51] hover:text-[#73563e] transition-colors">
              <Download size={11} strokeWidth={2} />
              <span>Download</span>
            </button>
          </div>
          <div className="w-full aspect-video bg-gray-200 overflow-hidden relative border border-[#0F131F]/10">
            <img
              src={item.evidenceUrl}
              alt="Bukti Pembayaran"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 bg-[#f3f4f7] hidden items-center justify-center"
              style={{ display: "none" }}
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon size={24} strokeWidth={1} color="#0F131F40" />
                <span className="text-xs text-black/30">
                  Tidak dapat memuat gambar
                </span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-black/30 mt-2 text-center">
            Klik gambar untuk memperbesar · Format: JPG/PNG/PDF
          </p>
        </section>

        {/* Actions */}
        {item.status === "Pending" && (
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => onReject(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-red-500 text-red-500 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
            >
              <XCircle size={15} strokeWidth={2} />
              Tolak
            </button>
            <button
              onClick={() => onApprove(item.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0F131F] text-white text-sm font-semibold hover:bg-[#896d51] transition-colors"
            >
              <CheckCircle2 size={15} strokeWidth={2} />
              Verifikasi
            </button>
          </div>
        )}
        {item.status !== "Pending" && (
          <div
            className={`flex items-center gap-2 p-3 border text-sm font-semibold ${
              item.status === "Approved"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            {item.status === "Approved" ? (
              <CheckCircle2 size={15} strokeWidth={2} />
            ) : (
              <XCircle size={15} strokeWidth={2} />
            )}
            Pembayaran telah{" "}
            {item.status === "Approved" ? "diverifikasi" : "ditolak"}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PaymentVerificationPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua Tipe");
  const [payTypeFilter, setPayTypeFilter] = useState("Semua Pembayaran");
  const [sortField, setSortField] = useState("submittedAt");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedId, setSelectedId] = useState("B-2026-001");
  const [data, setData] = useState(payments);
  const [typeOpen, setTypeOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const statusFilters = ["Semua", "Pending", "Approved", "Rejected"];
  const typeOptions = ["Semua Tipe", "Reguler", "Wedding"];
  const payOptions = ["Semua Pembayaran", "DP", "Pelunasan"];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = useMemo(() => {
    let result = [...data];
    if (activeFilter !== "Semua")
      result = result.filter((p) => p.status === activeFilter);
    if (typeFilter !== "Semua Tipe")
      result = result.filter((p) => p.type === typeFilter);
    if (payTypeFilter !== "Semua Pembayaran")
      result = result.filter((p) => p.paymentType === payTypeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.orderer.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q),
      );
    }
    result.sort((a, b) => {
      let va, vb;
      if (sortField === "paymentAmount") {
        va = a.paymentAmount;
        vb = b.paymentAmount;
      } else if (sortField === "orderer") {
        va = a.orderer.name;
        vb = b.orderer.name;
      } else if (sortField === "status") {
        va = a.status;
        vb = b.status;
      } else {
        va = a.id;
        vb = b.id;
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [
    data,
    activeFilter,
    typeFilter,
    payTypeFilter,
    search,
    sortField,
    sortDir,
  ]);

  const selectedItem = data.find((p) => p.id === selectedId) || null;

  const handleApprove = (id) => {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)),
    );
  };
  const handleReject = (id) => {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)),
    );
  };

  const pendingCount = data.filter((p) => p.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-[#f3f4f7] font-sans">
      <Sidebar />

      {/* Center — Table */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#0F131F]/10">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#0F131F]/10 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-crimson-pro text-2xl text-[#0F131F]">
              Verifikasi Pembayaran
            </h1>
            {pendingCount > 0 && (
              <span className="bg-amber-100 border border-amber-300 text-amber-700 text-[10px] font-bold px-2 py-0.5">
                {pendingCount} Menunggu
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0F131F] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden">
          {/* Description */}
          <p className="text-sm text-black/40">
            Kelola dan verifikasi pembayaran manual reservasi Bango Parc.
          </p>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-sm font-semibold border transition-colors ${
                  activeFilter === f
                    ? "bg-[#0F131F] text-white border-[#0F131F]"
                    : "bg-white text-black/50 border-[#0F131F]/15 hover:border-[#0F131F]/40 hover:text-[#0F131F]"
                }`}
              >
                {f}
                {f !== "Semua" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({data.filter((p) => p.status === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-3">
            {/* Search */}
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
                placeholder="Cari kode order, nama, area..."
                className="w-full h-10 pl-9 pr-3 border border-[#0F131F]/15 bg-white text-sm outline-none focus:border-[#0F131F]/40 transition-colors placeholder:text-black/25"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setTypeOpen((o) => !o);
                  setPayOpen(false);
                }}
                className="flex items-center gap-2 h-10 px-3 border border-[#0F131F]/15 bg-white text-sm text-black/60 hover:border-[#0F131F]/30 transition-colors"
              >
                <span>{typeFilter}</span>
                <ChevronDown size={13} />
              </button>
              {typeOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-[#0F131F]/15 min-w-full shadow-sm">
                  {typeOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setTypeFilter(o);
                        setTypeOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-[#f3f4f7] transition-colors ${typeFilter === o ? "font-semibold text-[#0F131F]" : "text-black/60"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setPayOpen((o) => !o);
                  setTypeOpen(false);
                }}
                className="flex items-center gap-2 h-10 px-3 border border-[#0F131F]/15 bg-white text-sm text-black/60 hover:border-[#0F131F]/30 transition-colors"
              >
                <span>{payTypeFilter}</span>
                <ChevronDown size={13} />
              </button>
              {payOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-[#0F131F]/15 min-w-full shadow-sm">
                  {payOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setPayTypeFilter(o);
                        setPayOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm hover:bg-[#f3f4f7] transition-colors ${payTypeFilter === o ? "font-semibold text-[#0F131F]" : "text-black/60"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-black/35 ml-auto shrink-0">
              <SlidersHorizontal size={13} strokeWidth={1.5} />
              <span>{filtered.length} hasil</span>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 bg-white border border-[#0F131F]/10 overflow-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0 bg-white z-10 border-b border-[#0F131F]/10">
                <tr>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Kode Order"
                      field="id"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Pemesan"
                      field="orderer"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                      Detail Order
                    </span>
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Pembayaran"
                      field="paymentAmount"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-left px-4 py-3">
                    <SortHeader
                      label="Status"
                      field="status"
                      sortField={sortField}
                      sortDir={sortDir}
                      onSort={handleSort}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16 text-sm text-black/30"
                    >
                      Tidak ada data yang cocok
                    </td>
                  </tr>
                )}
                {filtered.map((p) => {
                  const isSelected = selectedId === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`border-b border-[#0F131F]/5 cursor-pointer transition-colors last:border-0 ${
                        isSelected
                          ? "bg-[#896d51]/6 border-l-2 border-l-[#896d51]"
                          : "hover:bg-[#f9f8f6] border-l-2 border-l-transparent"
                      }`}
                    >
                      {/* Order Code */}
                      <td className="px-4 py-3.5">
                        <p className="font-mono text-xs font-semibold text-[#0F131F]">
                          {p.id}
                        </p>
                        <p className="text-[10px] text-black/35 mt-0.5">
                          {p.submittedAt}
                        </p>
                      </td>

                      {/* Orderer */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-[#0F131F] flex items-center justify-center shrink-0">
                            <span className="text-white text-[10px] font-bold">
                              {p.orderer.avatar}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-[#0F131F]">
                            {p.orderer.name}
                          </p>
                        </div>
                      </td>

                      {/* Detail */}
                      <td className="px-4 py-3.5">
                        <p className="text-sm text-[#0F131F] font-medium">
                          {p.area}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <TypeBadge type={p.type} />
                          <span className="text-[10px] text-black/35">
                            {p.date.split(",")[0]}
                          </span>
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-bold text-[#0F131F]">
                          Rp{p.paymentAmount.toLocaleString("id-ID")}
                        </p>
                        <div className="mt-1">
                          <PayTypeBadge type={p.paymentType} />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={p.status} />
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
      <div className="w-80 bg-white shrink-0 flex flex-col border-l border-[#0F131F]/10 min-h-screen">
        <DetailPanel
          item={selectedItem}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
