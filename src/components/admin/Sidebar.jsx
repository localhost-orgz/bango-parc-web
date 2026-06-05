"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import {
  Package,
  GalleryHorizontal,
  Tag,
  Home,
  Wrench,
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Book,
  Users,
  X,
} from "lucide-react";

const dataItems = [
  { label: "Reservation Type", icon: Book, path: "/admin/reservation-type" },
  { label: "Area", icon: Home, path: "/admin/area" },
  { label: "Gallery", icon: GalleryHorizontal, path: "/admin/gallery" },
  { label: "Addon", icon: Package, path: "/admin/addon" },
  { label: "Facility", icon: Wrench, path: "/admin/facility" },
  { label: "Pengguna", icon: Users, path: "/admin/users" },
];

function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  // Auto-close sidebar on mobile when navigating pages
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await axiosInstance.get("https://bango-parc-service.vercel.app/api/payment");
        const apiData = res.data?.result || res.data?.data || [];
        const pendingItems = apiData.filter(p => {
          const rawStatus = (p.approvalStatus || p.status || "PENDING").toUpperCase();
          return rawStatus === "PENDING";
        });
        setPendingCount(pendingItems.length);
      } catch (err) {
        console.error("Gagal mengambil count verifikasi pembayaran di sidebar:", err);
      }
    };
    fetchPendingCount();
  }, []);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    {
      label: "Verifikasi Pembayaran",
      icon: CreditCard,
      path: "/admin/verifikasi",
      badge: pendingCount > 0 ? pendingCount : null,
    },
    { label: "Data Reservasi", icon: CalendarDays, path: "/admin/reservasi" },
  ];

  // Helper buat ngecek aktif 🔎
  const isActive = (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/55 z-45 md:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-[#0F131F] flex flex-col shrink-0 z-50 transform md:sticky md:top-0 md:h-screen md:overflow-y-auto md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10 relative">
          <p className="font-crimson-pro text-white text-xl leading-tight">
            Bango Parc
          </p>
          <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
          
          {/* Close button for mobile viewports */}
          <button
            onClick={onClose}
            className="absolute top-6 right-4 text-white/55 hover:text-white md:hidden p-1.5 cursor-pointer"
            aria-label="Tutup Sidebar"
          >
            <X size={18} />
          </button>
        </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">
        {/* Main Section */}
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Main
          </p>
          {navItems.map(({ label, icon: Icon, path, badge }) => (
            <Link
              key={label}
              href={path}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors mb-0.5 ${
                isActive(path)
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
            </Link>
          ))}
        </div>

        {/* Data Section */}
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Data
          </p>
          {dataItems.map(({ label, icon: Icon, path }) => (
            <Link
              key={label}
              href={path}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors mb-0.5 ${
                isActive(path)
                  ? "bg-[#896d51]/20 text-white border-l-2 border-[#896d51]"
                  : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <Icon size={15} strokeWidth={1.5} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
      </aside>
    </>
  );
}

export default Sidebar;
