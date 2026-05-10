"use client";

import Link from "next/link"; // Jangan lupa import Link 🔗
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  DollarSign,
  ImageIcon,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  {
    label: "Verifikasi Pembayaran",
    icon: CreditCard,
    path: "/admin/verifikasi",
    badge: 3,
  },
  { label: "Data Reservasi", icon: CalendarDays, path: "/admin/reservasi" },
];

const dataItems = [
  { label: "Harga & Area", icon: DollarSign, path: "/admin/harga" },
  { label: "Add-On", icon: Package, path: "/admin/addon" },
  { label: "Pengguna", icon: Users, path: "/admin/users" },
  { label: "Gallery", icon: ImageIcon, path: "/admin/gallery" },
];

function Sidebar() {
  const pathname = usePathname();

  // Helper buat ngecek aktif 🔎
  const isActive = (path) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-60 min-h-screen bg-[#0F131F] flex flex-col shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-crimson-pro text-white text-xl leading-tight">
          Bango Parc
        </p>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
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
  );
}

export default Sidebar;
