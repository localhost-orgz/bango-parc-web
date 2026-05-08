import { CheckCircle2 } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    { icon: CheckCircle2, label: "Data Anda aman & terenkripsi" },

    { icon: CheckCircle2, label: "Konfirmasi via Email & WhatsApp" },
    { icon: CheckCircle2, label: "Batalkan gratis min. H-7" },
  ];
  return (
    <div className="bg-white border border-[#0F131F]/10 p-4">
      <div className="flex flex-col gap-2.5">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <Icon
              size={14}
              color="#0F131F"
              strokeWidth={1.5}
              className="shrink-0"
            />
            <span className="text-xs text-black/45">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
