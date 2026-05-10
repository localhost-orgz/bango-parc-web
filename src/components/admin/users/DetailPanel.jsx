import { ReceiptText, Users, X } from "lucide-react";
import RoleBadge from "./RoleBadge";
import MiniStat from "./MiniStat";
import OrderStatusBadge from "./OrderStatusBadge";
import TypeBadge from "./TypeBadge";

function DetailPanel({ user, onClose }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-3">
        <div className="w-14 h-14 border-2 border-dashed border-[#0F131F]/15 flex items-center justify-center">
          <Users size={20} strokeWidth={1} color="#0F131F50" />
        </div>
        <p className="text-sm text-black/30 font-crimson-text">
          Pilih pengguna untuk melihat detail
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#0F131F]/10 bg-white sticky top-0 z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 ${user.avatarColor} flex items-center justify-center shrink-0`}
          >
            <span className="text-white font-bold text-sm">{user.avatar}</span>
          </div>
          <div>
            <p className="font-crimson-pro text-xl text-[#0F131F] leading-tight">
              {user.name}
            </p>
            <div className="mt-0.5">
              <RoleBadge role={user.role} />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-black/30 hover:text-black/60 transition-colors mt-0.5"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="px-6 py-5 flex flex-col gap-6">
        {/* Account Info */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Informasi Akun
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: Mail, label: "Email", value: user.email },
              { icon: Phone, label: "WhatsApp", value: user.whatsapp },
              {
                icon: ShieldCheck,
                label: "Role",
                value: user.role === "admin" ? "Administrator" : "User",
              },
              { icon: CalIcon, label: "Bergabung", value: user.joinedAt },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-6 shrink-0 flex justify-center">
                  <Icon
                    size={13}
                    strokeWidth={1.5}
                    className="text-[#896d51]"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-black/35 uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="text-sm text-[#0F131F] truncate">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8" />

        {/* Stats */}
        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-3">
            Statistik
          </p>
          <div className="grid grid-cols-2 gap-2">
            <MiniStat
              icon={Clock}
              label="Planned"
              value={user.stats.planned}
              sub="Akan datang"
              color="text-amber-600"
            />
            <MiniStat
              icon={CheckCircle2}
              label="Selesai"
              value={user.stats.finished}
              sub="Terlaksana"
              color="text-emerald-700"
            />
            <MiniStat
              icon={XCircle}
              label="Dibatalkan"
              value={user.stats.canceled}
              sub="Tidak jadi"
              color="text-red-500"
            />
            <MiniStat
              icon={Wallet}
              label="Total Spent"
              value={`Rp${(user.stats.totalSpent / 1000000).toFixed(1)}jt`}
              sub={`Rp${user.stats.totalSpent.toLocaleString("id-ID")}`}
              color="text-[#896d51]"
            />
          </div>
        </section>

        <div className="h-px bg-[#0F131F]/8" />

        {/* Order History */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/35">
              Riwayat Reservasi
            </p>
            <span className="text-[10px] text-black/35">
              {user.orders.length} order
            </span>
          </div>

          {user.orders.length === 0 ? (
            <div className="border border-dashed border-[#0F131F]/15 py-8 flex flex-col items-center gap-2">
              <ReceiptText
                size={20}
                strokeWidth={1}
                className="text-black/20"
              />
              <p className="text-xs text-black/30">Belum ada reservasi</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#0F131F]/8 bg-[#f9f8f6] p-3 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#0F131F]">
                        {order.id}
                      </p>
                      <p className="text-xs text-black/50 mt-0.5">
                        {order.area}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <TypeBadge type={order.type} />
                      <span className="text-[10px] text-black/35">
                        {order.date}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0F131F]">
                      Rp{order.amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DetailPanel;
