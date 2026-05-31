"use client";

import { useState, useMemo, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import TypeBadge from "@/components/admin/verification/TypeBadge";
import PayTypeBadge from "@/components/admin/verification/PayTypeBadge";
import StatusBadge from "@/components/admin/verification/StatusBadge";
import DetailPanel from "@/components/admin/verification/DetailPanel";
import SortHeader from "@/components/admin/verification/SortHeader";
import axiosInstance from "@/lib/axios";

// No mock data fallback required

// ─── Main Page ────────────────────────────────────────────────────────────────

// ─── Format Helpers ──────────────────────────────────────────────────────────

const formatSubmittedAt = (dateStr) => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    const datePart = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const pad = (n) => n.toString().padStart(2, "0");
    const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${datePart}, ${timePart}`;
  } catch {
    return dateStr;
  }
};

const mapApiPaymentToUi = (apiItem) => {
  const sched = apiItem.paymentSchedule || {};
  const resv = sched.reservation || apiItem.reservation || {};
  const cust = resv.customer || apiItem.customer || {};

  const orderer = {
    name: apiItem.senderName || cust.fullName || apiItem.orderer?.name || "Guest",
    email: cust.email || apiItem.orderer?.email || "-",
    phone: cust.whatsappNumber || apiItem.orderer?.phone || "-",
    avatar: (apiItem.senderName || cust.fullName || apiItem.orderer?.name || "G")[0].toUpperCase()
  };

  const areas = resv.areaReservations?.map(ar => ar.area?.name).filter(Boolean) || [];
  const areaName = areas.length > 0 ? areas.join(" & ") : (apiItem.area || "Semi-Indoor & Outdoor");

  const reservationType = resv.reservationType?.name || apiItem.type || "Reguler";

  const startDt = resv.startDateTime || apiItem.startDateTime;
  const endDt = resv.endDateTime || apiItem.endDateTime;
  
  let formattedDate = apiItem.date || "-";
  let formattedTime = apiItem.time || "-";
  let duration = apiItem.duration || 0;

  if (startDt) {
    try {
      const dateObj = new Date(startDt);
      formattedDate = dateObj.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (endDt) {
        const endDateObj = new Date(endDt);
        const pad = (n) => n.toString().padStart(2, "0");
        const sh = pad(dateObj.getUTCHours());
        const sm = pad(dateObj.getUTCMinutes());
        const eh = pad(endDateObj.getUTCHours());
        const em = pad(endDateObj.getUTCMinutes());
        formattedTime = `${sh}:${sm} – ${eh}:${em}`;
        
        duration = Math.round((endDateObj - dateObj) / (1000 * 60 * 60));
      }
    } catch (e) {
      console.error(e);
    }
  }

  let payType = apiItem.paymentType || (sched.installmentNumber === 1 ? "DP" : "Pelunasan") || "DP";
  if (payType === "FULL" || payType === "Lunas" || payType === "full") {
    payType = "Pelunasan";
  } else if (payType === "DP" || payType === "dp" || payType === "PARTIAL") {
    payType = "DP";
  }

  let status = "Pending";
  const rawStatus = (apiItem.approvalStatus || apiItem.status || "PENDING").toUpperCase();
  if (rawStatus === "APPROVED" || rawStatus === "VERIFIED") {
    status = "Approved";
  } else if (rawStatus === "REJECTED" || rawStatus === "DENIED" || rawStatus === "TOLAK") {
    status = "Rejected";
  }

  const subTime = apiItem.uploadedAt || apiItem.createdAt;

  return {
    id: resv.bookingCode || apiItem.bookingCode || `BP-${resv.id || apiItem.id}`,
    apiId: apiItem.id,
    orderer,
    area: areaName,
    type: reservationType,
    date: formattedDate,
    time: formattedTime,
    duration,
    paymentAmount: Number(apiItem.amount || 0),
    paymentType: payType,
    totalAmount: Number(resv.totalPrice || apiItem.totalAmount || 0),
    status,
    submittedAt: subTime ? formatSubmittedAt(subTime) : "-",
    evidenceUrl: apiItem.proofImage || apiItem.evidenceUrl || apiItem.proofImageUrl || apiItem.imageUrl || "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop"
  };
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PaymentVerificationPage() {
  const [activeFilter, setActiveFilter] = useState("Pending");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua Tipe");
  const [payTypeFilter, setPayTypeFilter] = useState("Semua Pembayaran");
  const [sortField, setSortField] = useState("submittedAt");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeOpen, setTypeOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/payment");
        const apiData = res.data?.result || res.data?.data || [];
        const mapped = apiData.map(mapApiPaymentToUi);
        setData(mapped);
        setSelectedId(mapped[0]?.id || "");
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil data pembayaran:", err);
        setError("Gagal mengambil data pembayaran dari server.");
        setData([]);
        setSelectedId("");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

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

  const handleApprove = async (id) => {
    const item = data.find(p => p.id === id);
    const targetId = item?.apiId || id;
    
    // Optimistic/local UI update
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p)),
    );

    try {
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/approve", {
        paymentProofId: Number(targetId)
      });
    } catch (err) {
      console.error("Gagal memperbarui status di server:", err);
      alert("Gagal memverifikasi pembayaran: " + (err.response?.data?.error || err.message));
    }
  };

  const handleReject = async (id) => {
    const item = data.find(p => p.id === id);
    const targetId = item?.apiId || id;
    
    const reason = prompt("Masukkan alasan penolakan pembayaran:");
    if (reason === null) return; // Cancelled
    if (!reason.trim()) {
      alert("Alasan penolakan wajib diisi!");
      return;
    }

    // Optimistic/local UI update
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p)),
    );

    try {
      await axiosInstance.patch("https://bango-parc-service.vercel.app/api/payment/reject", {
        paymentProofId: Number(targetId),
        rejectionReason: reason
      });
    } catch (err) {
      console.error("Gagal memperbarui status di server:", err);
      alert("Gagal menolak pembayaran: " + (err.response?.data?.error || err.message));
    }
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
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16 text-sm text-[#0F131F]/50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#896d51]" />
                        <span>Memuat data verifikasi...</span>
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-16 text-sm text-black/30"
                    >
                      Tidak ada data yang cocok
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
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
                  })
                )}
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
