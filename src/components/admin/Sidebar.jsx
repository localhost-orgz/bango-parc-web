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
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Verifikasi Pembayaran", icon: CreditCard, badge: 3 },
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
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <p className="font-crimson-pro text-white text-xl leading-tight">
          Bango Parc
        </p>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-6">
        <div>
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
            Main
          </p>
          {navItems.map(({ label, icon: Icon, active, badge }) => (
            <button
              key={label}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors rounded-none mb-0.5 ${
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
export default Sidebar;
