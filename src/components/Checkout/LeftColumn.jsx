import Link from "next/link";
import BookingNotice from "./BookingNotice";
import BookingSummaryCard from "./BookingSummaryCard";
import OrdererForm from "./OrdererForm";
import { ArrowLeft } from "lucide-react";

export default function LeftColumn({ data, addonsList = [], selectedAddonIds = [], onToggleAddon }) {
  return (
    <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
      <BookingSummaryCard data={data} />
      
      {/* Layanan Tambahan (Add-on) */}
      {addonsList.length > 0 && (
        <div className="bg-white border border-[#0F131F]/10 p-5 sm:p-6">
          <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-1">
            Layanan Tambahan (Add-on)
          </h5>
          <p className="text-xs text-black/45 mb-5">
            Pilih layanan tambahan untuk melengkapi kebutuhan acara Anda.
          </p>

          <div className="flex flex-col gap-3.5">
            {addonsList.map((addon) => {
              const isSelected = selectedAddonIds.includes(addon.id);
              return (
                <label
                  key={addon.id}
                  className={`flex items-start gap-4 p-4 border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-[#0F131F] bg-[#0F131F]/5"
                      : "border-[#0F131F]/10 bg-white hover:border-[#0F131F]/30"
                  }`}
                >
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleAddon(addon.id)}
                      className="w-4 h-4 text-[#896d51] border-gray-300 rounded focus:ring-[#896d51] cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-semibold text-sm text-[#0F131F]">
                        {addon.name}
                      </span>
                      <span className="text-sm font-bold text-[#896d51] whitespace-nowrap">
                        + Rp{addon.price?.toLocaleString("id-ID")}
                      </span>
                    </div>
                    {addon.description && (
                      <p className="text-xs text-black/45 mt-1.5 leading-relaxed">
                        {addon.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <OrdererForm />
      <BookingNotice />
      <Link
        href={"/venue/detail"}
        className="flex items-center gap-2 text-sm text-[#0F131F]/60 hover:text-[#0F131F] transition-colors w-fit"
      >
        <ArrowLeft size={15} strokeWidth={1.5} />
        <span>Kembali ke Detail Venue</span>
      </Link>
    </div>
  );
}
