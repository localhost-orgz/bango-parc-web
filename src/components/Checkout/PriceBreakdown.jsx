import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PriceBreakdown({ data, onPaymentProceed }) {
  const [submitting, setSubmitting] = useState(false);
  const rentPrice = data.pricePerSession || 0;
  const dpMinimum = rentPrice > 2000000 ? 1000000 : rentPrice * 0.5;
  const dpLabel = rentPrice > 2000000 ? "DP minimum" : "DP minimum (50%)";

  const handleProceed = async (e) => {
    e.preventDefault();
    if (onPaymentProceed) {
      setSubmitting(true);
      try {
        await onPaymentProceed();
      } catch (err) {
        console.error("Booking error:", err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white border-2 border-[#0F131F] p-5 sm:p-6">
      <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-5 pb-3 border-b border-[#0F131F]/10">
        Ringkasan Pembayaran
      </h5>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-sm text-black/55">
          <span>Sewa venue ({data.duration} jam)</span>
          <span>Rp{rentPrice.toLocaleString("id-ID")}</span>
        </div>
        <div className="h-px w-full bg-[#0F131F]/12 my-1" />
        <div className="flex justify-between">
          <span className="font-semibold text-[#0F131F]">Total</span>
          <span className="font-semibold text-xl text-[#0F131F]">
            Rp{rentPrice.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-xs text-black/35 -mt-1">
          <span>{dpLabel}</span>
          <span>Rp{dpMinimum.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="h-px w-full bg-[#0F131F]/12 my-5" />

      {onPaymentProceed ? (
        <button
          onClick={handleProceed}
          disabled={submitting}
          className="w-full bg-[#0F131F] flex justify-center items-center gap-2 py-3.5 text-sm font-medium text-white hover:bg-[#1e2540] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses Booking...</span>
            </>
          ) : (
            <>
              Lanjutkan ke Pembayaran
              <ArrowRight size={16} strokeWidth={1.5} />
            </>
          )}
        </button>
      ) : (
        <Link
          href={"/payment"}
          className="w-full bg-[#0F131F] flex justify-center items-center gap-2 py-3.5 text-sm font-medium text-white hover:bg-[#1e2540] transition-colors"
        >
          Lanjutkan ke Pembayaran
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      )}

      <p className="text-[10px] text-center text-black/30 mt-3">
        Dengan melanjutkan, Anda menyetujui{" "}
        <span className="underline cursor-pointer text-[#0F131F]/55">
          syarat & ketentuan
        </span>{" "}
        kami
      </p>
    </div>
  );
}
