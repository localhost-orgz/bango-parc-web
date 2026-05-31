"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Image as ImageIcon,
  Search,
  ChevronDown,
  CalendarDays as CalIcon,
  ArrowRight,
  ShieldCheck,
  User,
  X,
  Loader2,
} from "lucide-react";
import SortHeader from "@/components/admin/users/SortHeader";
import RoleBadge from "@/components/admin/users/RoleBadge";
import DetailPanel from "@/components/admin/users/DetailPanel";
import axiosInstance from "@/lib/axios";

// ─── Mock Data ────────────────────────────────────────────────────────────────

function formatIndonesianDateSimple(dateStr) {
  if (!dateStr) return "-";
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const datePart = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = datePart.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  
  const monthName = months[month];
  return `${day} ${monthName} ${year}`;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [roleOpen, setRoleOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [selectedId, setSelectedId] = useState(null);

  const roleOptions = ["Semua", "user", "admin"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, resvRes] = await Promise.all([
          axiosInstance.get("https://bango-parc-service.vercel.app/api/users"),
          axiosInstance.get("https://bango-parc-service.vercel.app/api/reservation/all")
        ]);
        setUsers(usersRes.data.users || []);
        setReservations(resvRes.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil data user/reservasi:", err);
        setError("Gagal memuat data pengguna dari server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedUsers = useMemo(() => {
    const avatarColors = [
      "bg-[#896d51]",
      "bg-[#0F131F]",
      "bg-teal-700",
      "bg-rose-700",
      "bg-blue-800",
      "bg-violet-700",
      "bg-amber-700",
      "bg-emerald-700",
      "bg-indigo-700"
    ];

    return users.map((u) => {
      // Find reservations for this user
      const userResvs = reservations.filter((r) => r.customerId === u.id);
      
      // Calculate stats
      let planned = 0;
      let finished = 0;
      let canceled = 0;
      let totalSpent = 0;
      
      const orders = userResvs.map((r) => {
        const isCompleted = r.status === "COMPLETED";
        const isCancelled = r.status === "CANCELLED" || r.status === "EXPIRED";
        
        if (isCompleted) {
          finished++;
          totalSpent += Number(r.paidAmount || r.totalPrice) || 0;
        } else if (isCancelled) {
          canceled++;
        } else {
          planned++;
          totalSpent += Number(r.paidAmount) || 0;
        }
        
        let statusText = "Ongoing";
        if (isCompleted) statusText = "Finished";
        else if (isCancelled) statusText = "Canceled";
        
        const areas = r.areaReservations?.map(ar => ar.area?.name).filter(Boolean) || [];
        const areaName = areas.length > 0 ? areas.join(" & ") : "Venue Bango Parc";
        
        return {
          id: r.bookingCode || `BP-${r.id}`,
          area: areaName,
          type: r.reservationType?.name || "Reguler",
          date: formatIndonesianDateSimple(r.startDateTime),
          amount: Number(r.totalPrice) || 0,
          status: statusText,
        };
      });
      
      let joinedAt = "15 Mei 2026";
      if (userResvs.length > 0) {
        const sorted = [...userResvs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        joinedAt = formatIndonesianDateSimple(sorted[0].createdAt);
      }
      
      const nameParts = u.fullName ? u.fullName.split(" ") : ["G"];
      const initials = nameParts.map(p => p[0]).slice(0, 2).join("").toUpperCase();
      
      const colorIndex = u.id % avatarColors.length;
      const avatarColor = avatarColors[colorIndex];
      
      return {
        id: `USR-${String(u.id).padStart(3, "0")}`,
        rawId: u.id,
        name: u.fullName || "User Bango Parc",
        email: u.email || "-",
        whatsapp: u.whatsappNumber || "-",
        role: u.role?.toLowerCase() === "admin" ? "admin" : "user",
        avatar: initials,
        avatarColor,
        joinedAt,
        stats: { planned, finished, canceled, totalSpent },
        orders,
      };
    });
  }, [users, reservations]);

  const usersData = formattedUsers;

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
    <div className="bg-white font-sans -m-4 md:-m-6 min-h-screen p-4 md:p-6 flex flex-col">
      {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-crimson-pro text-3xl text-[#0F131F] font-semibold">
              Pengguna
            </h1>
            <p className="text-black/40 text-sm mt-1">
              Kelola akun pengguna yang terdaftar di sistem Bango Parc.
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#0F131F]/40 bg-[#0F131F]/5 border border-[#0F131F]/10 px-2.5 py-1">
            {usersData.length} total
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">

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
            <table className="w-full text-sm min-w-160">
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
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b border-[#0F131F]/5 last:border-0">
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-black/5 animate-pulse shrink-0" />
                          <div className="flex flex-col gap-1.5">
                            <div className="h-4 w-24 bg-black/5 animate-pulse rounded" />
                            <div className="h-3 w-16 bg-black/5 animate-pulse rounded" />
                          </div>
                        </div>
                      </td>
                      {/* Email */}
                      <td className="px-5 py-4">
                        <div className="h-4 w-36 bg-black/5 animate-pulse rounded" />
                      </td>
                      {/* Role */}
                      <td className="px-5 py-4">
                        <div className="h-4 w-12 bg-black/5 animate-pulse rounded" />
                      </td>
                      {/* Joined Since */}
                      <td className="px-5 py-4">
                        <div className="h-4 w-20 bg-black/5 animate-pulse rounded" />
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <div className="h-6 w-16 bg-black/5 animate-pulse rounded" />
                      </td>
                      {/* Action */}
                      <td className="px-4 py-3">
                        <div className="h-8 w-20 bg-black/5 animate-pulse rounded" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-sm text-black/30"
                    >
                      Tidak ada pengguna yang cocok
                    </td>
                  </tr>
                ) : (
                  filtered.map((u) => {
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
                })
              )}
              </tbody>
            </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => setSelectedId(null)} />
          <div className="relative bg-white border border-[#0F131F]/15 w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <DetailPanel
              user={selectedUser}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
