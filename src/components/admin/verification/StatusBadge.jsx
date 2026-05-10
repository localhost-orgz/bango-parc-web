import { CheckCircle2, Clock, XCircle } from "lucide-react";

function StatusBadge({ status }) {
  const map = {
    Pending: {
      bg: "bg-amber-50 border-amber-200 text-amber-700",
      icon: <Clock size={11} strokeWidth={2} />,
      label: "Pending",
    },
    Approved: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-700",
      icon: <CheckCircle2 size={11} strokeWidth={2} />,
      label: "Approved",
    },
    Rejected: {
      bg: "bg-red-50 border-red-200 text-red-600",
      icon: <XCircle size={11} strokeWidth={2} />,
      label: "Rejected",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 border text-[11px] font-semibold ${cfg.bg}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

export default StatusBadge;
