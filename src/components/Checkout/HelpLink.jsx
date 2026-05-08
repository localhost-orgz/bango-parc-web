import { Users } from "lucide-react";

export default function HelpLink() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-black/35">
      <Users size={13} strokeWidth={1.5} />
      <span>
        Butuh bantuan?{" "}
        <span className="text-[#0F131F] underline cursor-pointer font-medium">
          Hubungi kami
        </span>
      </span>
    </div>
  );
}
