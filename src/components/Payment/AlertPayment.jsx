import { Clock } from "lucide-react";

const AlertPayment = () => {
  return (
    <div className="flex items-start gap-2.5 p-4 border border-amber-200 bg-amber-50">
      <Clock
        size={14}
        color="#d97706"
        strokeWidth={1.5}
        className="shrink-0 mt-0.5"
      />
      <p className="text-xs text-amber-700 leading-relaxed">
        Selesaikan pembayaran dalam <strong>24 jam</strong> untuk menghindari
        pembatalan otomatis.
      </p>
    </div>
  );
};

export default AlertPayment;
