import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const QrisPayment = ({ orderData, paymentType, isDpVerified, amountToPay: propAmountToPay }) => {
  const isFull = paymentType === "full";
  const amountToPay = propAmountToPay !== undefined
    ? propAmountToPay
    : (isDpVerified
        ? (orderData.total - orderData.dpAmount)
        : (isFull ? orderData.total : orderData.dpAmount));

  const paymentDesc = isDpVerified
    ? "Pembayaran pelunasan sisa 50%"
    : isFull 
      ? "Pembayaran lunas penuh (100%)" 
      : `DP 50% dari total Rp${orderData.total.toLocaleString("id-ID")}`;

  return (
    <div className="bg-white border border-[#0f131f]/15 p-4 sm:p-6">
      <h5 className="font-crimson-pro text-lg sm:text-xl text-[#2c2218] mb-1">
        Scan QR Code QRIS
      </h5>

      <div className="w-full h-px bg-[#0f131f]/20 mb-5" />

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start w-full">
        {/* QR Section */}
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <div className="p-3 border-2 border-[#0f131f]/20">
            <Image
              src={"/qris.png"}
              height={200}
              width={200}
              alt="QRIS"
              className="w-44 h-44 sm:w-50 sm:h-50 object-contain"
            />
          </div>

          <p className="text-xs text-black/40 text-center max-w-xs sm:max-w-40 leading-relaxed">
            Arahkan kamera smartphone ke QR Code di atas. Scan dengan aplikasi
            mobile banking atau e-wallet.
          </p>
        </div>

        {/* Payment Info */}
        <div className="flex flex-col gap-4 flex-1 w-full">
          <div className="bg-[#0f131f]/5 border border-[#0f131f]/15 p-4 flex flex-col gap-1.5">
            <span className="text-xs text-black/40 uppercase tracking-wide">
              Nominal Transfer
            </span>

            <span className="text-xl sm:text-2xl font-semibold text-[#0f131f] wrap-break-word">
              Rp{amountToPay.toLocaleString("id-ID")}
            </span>

            <span className="text-[10px] sm:text-xs text-black/30 leading-relaxed">
              {paymentDesc}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                className="flex items-center gap-2 text-xs sm:text-sm text-black/55"
              >
                <CheckCircle2 size={12} color="#0f131f" strokeWidth={1.5} />

                <span>{app}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrisPayment;
