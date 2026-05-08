const PriceBreakdown = ({ orderData }) => {
  return (
    <div className="bg-white border border-[#896d51]/15 p-5 flex flex-col gap-3">
      <h5 className="font-crimson-pro text-lg text-[#2c2218] pb-2 border-b border-[#896d51]/15">
        Ringkasan Pembayaran
      </h5>
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-black/55">
          <span>Subtotal</span>
          <span>Rp{orderData.subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm text-black/55">
          <span>Pajak & Biaya (10%)</span>
          <span>Rp{orderData.tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm text-green-700">
          <span>Diskon</span>
          <span>-Rp{orderData.discount.toLocaleString("id-ID")}</span>
        </div>
        <div className="h-px bg-[#896d51]/15" />
        <div className="flex justify-between">
          <span className="font-semibold text-[#2c2218]">Total</span>
          <span className="font-semibold text-lg text-[#896d51]">
            Rp{orderData.total.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between text-xs bg-[#896d51]/5 border border-[#896d51]/20 px-3 py-2">
          <span className="text-[#896d51] font-medium">DP Minimum (50%)</span>
          <span className="text-[#896d51] font-semibold">
            Rp{orderData.dpAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
