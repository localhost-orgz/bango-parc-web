import { AlertCircle } from "lucide-react";

export default function BookingNotice() {
  return (
    <div className="flex items-start gap-2.5 p-4 border border-[#0F131F]/15 bg-[#0F131F]/4">
      <AlertCircle
        size={15}
        color="#0F131F"
        strokeWidth={1.5}
        className="shrink-0 mt-0.5"
      />
      <p className="text-xs text-[#0F131F]/65 leading-relaxed">
        Booking belum dikonfirmasi sampai pembayaran diterima. Tim kami akan
        menghubungi Anda dalam 1×24 jam setelah pembayaran.
      </p>
    </div>
  );
}
