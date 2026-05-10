import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PriceBreakdown({ data }) {
  return (
    <div className="bg-white border-2 border-[#0F131F] p-5 sm:p-6">
      <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-5 pb-3 border-b border-[#0F131F]/10">
        Ringkasan Pembayaran
      </h5>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-sm text-black/55">
          <span>Sewa venue ({data.duration} jam)</span>
          <span>Rp{data.pricePerSession.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="line-through text-black/25">Harga normal</span>
          <span className="line-through text-black/25">
            Rp{data.originalPrice.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-emerald-600">Diskon</span>
          <span className="text-emerald-600">
            -Rp{data.discount.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-sm text-black/55">
          <span>Pajak & Biaya (10%)</span>
          <span>Rp{data.tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="h-px w-full bg-[#0F131F]/12 my-1" />
        <div className="flex justify-between">
          <span className="font-semibold text-[#0F131F]">Total</span>
          <span className="font-semibold text-xl text-[#0F131F]">
            Rp{data.total.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-xs text-black/35 -mt-1">
          <span>DP minimum (50%)</span>
          <span>Rp{(data.total / 2).toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="h-px w-full bg-[#0F131F]/12 my-5" />

      <Link
        href={"/paket/checkout/payment"}
        className="w-full bg-[#0F131F] flex justify-center items-center gap-2 py-3.5 text-sm font-medium text-white hover:bg-[#1e2540] transition-colors"
      >
        Lanjutkan ke Pembayaran
        <ArrowRight size={16} strokeWidth={1.5} />
      </Link>

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
