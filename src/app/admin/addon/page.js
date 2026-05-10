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

  const addons = [
    {
      id: 1,
      name: "Kursi Tiffany extra",
      price: "Rp 15.000",
      unit: "per kursi",
    },
    {
      id: 2,
      name: "Sound system upgrade",
      price: "Rp 500.000",
      unit: "per sesi",
    },
    {
      id: 3,
      name: "Corkage fee",
      price: "20% dari tagihan",
      unit: "prosentase",
    },
  ];

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

      <div className="bg-white border border-[#0F131F]/15 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0F131F]/15">
          <h2 className="text-lg font-semibold text-[#0F131F]">
            Daftar Add On
          </h2>

          <button className="h-9 px-4 border border-[#0F131F]/30 text-sm font-medium text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors flex items-center gap-2">
            <span>Tambah</span>
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0F131F]/15">
              <th className="px-5 py-3 text-left font-medium text-black/70">
                Nama Add On
              </th>

              <th className="px-5 py-3 text-left font-medium text-black/70">
                Harga Tambahan
              </th>

              <th className="px-5 py-3 text-left font-medium text-black/70">
                Satuan
              </th>

              <th className="px-5 py-3 text-left font-medium text-black/70">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {addons.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#0F131F]/10 hover:bg-[#faf9f7] transition-colors"
              >
                {/* Nama */}
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#0F131F]">{item.name}</p>
                </td>

                {/* Harga */}
                <td className="px-5 py-4 text-[#0F131F]">{item.price}</td>

                {/* Satuan */}
                <td className="px-5 py-4 text-[#0F131F]">{item.unit}</td>

                {/* Aksi */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {/* Edit */}
                    <button className="h-8 px-4 border border-[#0F131F]/30 text-xs font-semibold text-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-colors">
                      Edit
                    </button>

                    {/* Delete */}
                    <button className="h-8 px-4 border border-red-300 text-xs font-semibold text-red-600 hover:bg-red-500 hover:text-white transition-colors">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
