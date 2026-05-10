"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
// Import komponen badge yang udah kamu punya
import StatusBadge from "@/components/admin/verification/StatusBadge";

export default function ReservasiPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const reservations = [
    {
      id: "RSV-001",
      user: "Faza Mumtaz",
      paket: "Wedding Package",
      tgl: "12 Mei 2026",
      status: "verified",
      total: "Rp 15.000.000",
    },
    {
      id: "RSV-002",
      user: "Andi Wijaya",
      paket: "Family Gathering",
      tgl: "15 Mei 2026",
      status: "pending",
      total: "Rp 5.500.000",
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Data Reservasi</h1>
          <p className="text-zinc-500 text-sm">
            Kelola semua pesanan dan jadwal venue kamu di sini.
          </p>
        </div>
      </div>

      {/* Filter & Search - Mirip admin verifikasi kamu */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari nama atau ID reservasi..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white border border-[#0F131F]/10 overflow-hidden">
        <table className="w-full text-sm min-w-250">
          <thead className="bg-[#f7f7f5] border-b border-[#0F131F]/10">
            <tr>
              {[
                "Kode",
                "Customer",
                "Jenis",
                "Area",
                "Tanggal",
                "Jam",
                "Pax",
                "Status",
                "Aksi",
              ].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-left text-[11px] font-semibold text-black/50 uppercase tracking-wider whitespace-nowrap"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {reservations.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#0F131F]/5 hover:bg-[#faf8f4] transition-colors last:border-0"
              >
                {/* Kode */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="font-medium text-[#0F131F]">{item.id}</p>
                </td>

                {/* Customer */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <p className="font-medium text-[#0F131F]">{item.user}</p>
                    <p className="text-[11px] text-black/35 mt-0.5">
                      customer@email.com
                    </p>
                  </div>
                </td>

                {/* Jenis */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-black/70">{item.paket}</p>
                </td>

                {/* Area */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-black/70">Area Belakang</p>
                </td>

                {/* Tanggal */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-black/70">{item.tgl}</p>
                </td>

                {/* Jam */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-black/70">10.00 - 15.00</p>
                </td>

                {/* Pax */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-black/70">100</p>
                </td>

                {/* Status */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {/* <StatusBadge status={item.status} /> */}
                  {item.status}
                </td>

                {/* Aksi */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <button className="px-4 h-8 border border-[#0F131F]/20 text-sm text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
