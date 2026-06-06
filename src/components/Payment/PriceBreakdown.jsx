const PriceBreakdown = ({ orderData, paymentType, isDpVerified, isFullyPaid }) => {
  const isFull = paymentType === "full";
  const subtotal = orderData.subtotal || 0;
  const tax = orderData.tax || 0;
  const discount = orderData.discount || 0;
  const total = orderData.total || 0;
  const dpAmount = orderData.dpAmount || 0;

  const amountToPay = isFullyPaid
    ? 0
    : isDpVerified 
      ? (total - dpAmount) 
      : (isFull ? total : dpAmount);

  return (
    <div className="bg-white border border-[#0f131f]/15 p-5 flex flex-col gap-3">
      <h5 className="font-crimson-pro text-lg text-[#2c2218] pb-2 border-b border-[#0f131f]/15">
        Ringkasan Pembayaran
      </h5>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-black/55">
          <span>Subtotal</span>
          <span>Rp{subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm text-black/55">
          <span>Pajak & Biaya (10%)</span>
          <span>Rp{tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm text-green-700">
          <span>Diskon</span>
          <span>-Rp{discount.toLocaleString("id-ID")}</span>
        </div>
        <div className="h-px bg-[#0f131f]/15" />
        <div className="flex justify-between">
          <span className="font-semibold text-[#2c2218]">Total Biaya</span>
          <span className="font-semibold text-[#0f131f]">
            Rp{total.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs bg-[#0f131f]/5 border border-[#0f131f]/20 px-3 py-2.5">
          <span className="text-[#0f131f] font-medium">
            {isFullyPaid
              ? "Status: Lunas"
              : isDpVerified 
                ? "Metode: Pelunasan (Sisa 50%)" 
                : (isFull ? "Metode: Bayar Lunas" : "Metode: DP 50%")}
          </span>
          <span className="text-[#0f131f] font-bold text-sm">
            Rp{amountToPay.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
