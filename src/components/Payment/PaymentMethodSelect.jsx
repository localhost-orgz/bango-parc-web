import PaymentMethodButton from "./PaymentMethodButton";

const PaymentMethodSelect = ({
  selectedMethod,
  onSelectedMethod,
  paymentMethods,
}) => {
  return (
    <div className="bg-white border border-[#0f131f]/15 p-6">
      <h5 className="font-crimson-pro text-xl text-[#0f131f] mb-1">
        Metode Pembayaran
      </h5>
      <p className="text-xs text-black/40 mb-5">
        Pilih metode yang paling mudah untuk Anda.
      </p>

      <div className="grid grid-cols-4 gap-3">
        {paymentMethods.map((method) => (
          <PaymentMethodButton
            key={method.id}
            {...method} // 🔥 Mecah {id, icon, label, info} jadi props individual
            selectedMethod={selectedMethod}
            onSelectedMethod={onSelectedMethod} // Pastikan namanya sinkron ya!
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelect;
