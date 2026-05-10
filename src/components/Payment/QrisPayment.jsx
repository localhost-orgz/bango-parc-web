import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const QrisPayment = ({ orderData }) => {
  return (
    <>
      <div className="bg-white border border-[#0f131f]/15 p-6">
        <h5 className="font-crimson-pro text-xl text-[#2c2218] mb-1">
          Scan QR Code QRIS
        </h5>
        <div className="w-full h-px bg-[#0f131f]/20 mb-5" />
        <div className="flex gap-8 items-start">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 border-2 border-[#0f131f]/20">
              <Image src={"/qris.png"} height={200} width={200} alt="QRIS" />
            </div>
            <p className="text-xs text-black/40 text-center max-w-40 leading-relaxed">
              Arahkan kamera smartphone ke QR Code di atas. Scan dengan aplikasi
              mobile banking atau e-wallet.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="bg-[#0f131f]/5 border border-[#0f131f]/15 p-4 flex flex-col gap-1.5">
              <span className="text-xs text-black/40 uppercase tracking-wide">
                Nominal Transfer
              </span>
              <span className="text-2xl font-semibold text-[#0f131f]">
                Rp{orderData.dpAmount.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-black/30">
                DP 50% dari total Rp
                {orderData.total.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                "GoPay",
                "OVO",
                "Dana",
                "ShopeePay",
                "LinkAja",
                "Semua m-banking",
              ].map((app) => (
                <div
                  key={app}
                  className="flex items-center gap-2 text-xs text-black/55"
                >
                  <CheckCircle2 size={12} color="#0f131f" strokeWidth={1.5} />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default QrisPayment;
