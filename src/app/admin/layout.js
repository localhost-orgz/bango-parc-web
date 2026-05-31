"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f3f4f7] relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 bg-[#0F131F] text-white px-4 flex items-center justify-between shrink-0 md:hidden sticky top-0 z-40 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors text-white cursor-pointer"
              aria-label="Buka Menu Sidebar"
            >
              <Menu size={22} />
            </button>
            <span className="font-crimson-pro text-lg">Bango Parc</span>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
        </header>

        <div className="flex-1 bg-white p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
