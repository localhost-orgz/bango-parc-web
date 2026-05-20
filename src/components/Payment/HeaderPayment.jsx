import { ChevronRight } from "lucide-react";

const HeaderPayment = () => {
  return (
    <header className="h-56 sm:h-64 w-full relative flex flex-col justify-center items-center pt-20">
      <div
        style={{ backgroundImage: "url(/detail-header.jpg)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="z-10 flex flex-col items-center gap-2 px-4 text-center">
        <div className="flex items-center gap-1 text-white/60 text-xs mb-1 flex-wrap justify-center">
          <span>Beranda</span>
          <ChevronRight size={12} />
          <span>Detail Paket</span>
          <ChevronRight size={12} />
          <span>Checkout</span>
          <ChevronRight size={12} />
          <span className="text-white">Pembayaran</span>
        </div>
        <h1 className="font-crimson-pro text-white text-4xl sm:text-5xl">Pembayaran</h1>
        <p className="text-white/60 text-xs mt-1 max-w-sm leading-relaxed">
          Selesaikan pembayaran dan unggah bukti transfer untuk konfirmasi
          booking Anda.
        </p>
      </div>
    </header>
  );
};

export default HeaderPayment;
