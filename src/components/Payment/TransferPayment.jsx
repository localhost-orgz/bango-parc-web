import { AlertCircle } from "lucide-react";

const TransferPayment = ({ selected, orderData, copied, onCopy }) => {
  return (
    <>
      <div className="bg-white border border-[#0f131f]/15 p-6">
        <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
          {`Transfer ke ${selected.label}`}
        </h5>
        <div className="w-full h-px bg-[#0f131f]/20 mb-5" />
        <div className="flex flex-col gap-4">
          {/* Amount */}
          <div className="bg-[#0f131f]/5 border border-[#0f131f]/15 p-4 flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-black/40 uppercase tracking-wide">
                Nominal Transfer (DP)
              </span>
              <span className="text-2xl font-semibold text-[#0f131f]">
                Rp{orderData.dpAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Account Number */}
          <div className="border border-[#0f131f]/15 p-4 flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-black/40 uppercase tracking-wide">
                Nomor Rekening
              </span>
              <span className="text-xl font-semibold tracking-widest text-[#2c2218]">
                {selected.accountNumber}
              </span>
              <span className="text-xs text-black/40">
                {selected.accountName}
              </span>
            </div>
            <button
              onClick={() => onCopy(selected.accountNumber || "")}
              className="text-xs border border-[#0f131f] text-[#0f131f] px-3 py-1.5 hover:bg-[#0f131f] hover:text-white transition-colors shrink-0"
            >
              {copied ? "Tersalin!" : "Salin"}
            </button>
          </div>

          <div className="flex items-start gap-2 text-xs text-black/50 bg-[#0f131f]/5 p-3 border border-[#0f131f]/10">
            <AlertCircle
              size={13}
              color="#0f131f"
              strokeWidth={1.5}
              className="shrink-0 mt-0.5"
            />
            <span>
              Transfer harus dari rekening atas nama Anda sendiri untuk
              memudahkan verifikasi.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPayment;
