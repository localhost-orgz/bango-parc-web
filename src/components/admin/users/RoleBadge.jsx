import { ShieldCheck, User } from "lucide-react";

function RoleBadge({ role }) {
  return role === "admin" ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#896d51]/10 border border-[#896d51]/30 text-[#896d51] text-[10px] font-bold uppercase tracking-wide">
      <ShieldCheck size={10} strokeWidth={2} /> Admin
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0F131F]/5 border border-[#0F131F]/15 text-black/50 text-[10px] font-bold uppercase tracking-wide">
      <User size={10} strokeWidth={2} /> User
    </span>
  );
}

export default RoleBadge;
