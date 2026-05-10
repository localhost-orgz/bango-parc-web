"use client";

import { useState, useMemo } from "react";
import {
  CreditCard,
  Image as ImageIcon,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  CalendarDays as CalIcon,
  ArrowRight,
  Download,
  Building2,
} from "lucide-react";
import TypeBadge from "@/components/admin/verification/TypeBadge";
import PayTypeBadge from "@/components/admin/verification/PayTypeBadge";
import StatusBadge from "@/components/admin/verification/StatusBadge";
import DetailPanel from "@/components/admin/verification/DetailPanel";
import SortHeader from "@/components/admin/verification/SortHeader";

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
            <table className="w-full text-sm min-w-160">
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
