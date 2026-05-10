import { ChevronRight } from "lucide-react";

export default function PageHeader() {
  return (
    <header className="h-48 sm:h-52 w-full relative flex justify-center items-center">
      <div
        style={{ backgroundImage: "url(/detail-header.jpg)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-[#0F131F]/60" />
      <div className="z-10 flex flex-col items-center gap-2 px-4">
        {/* <div className="flex items-center gap-1 text-white/50 text-xs mb-1 flex-wrap justify-center">
          <span>Beranda</span>
          <ChevronRight size={12} />
          <span>Venue</span>
          <ChevronRight size={12} />
          <span>Detail Paket</span>
          <ChevronRight size={12} />
          <span className="text-white">Checkout</span>
        </div> */}
        <h1 className="font-crimson-pro text-white text-4xl sm:text-5xl text-center">
          Detail Pesanan
        </h1>
        <p className="text-white/50 text-xs mt-1 text-center max-w-sm">
          Pastikan semua data dan detail reservasi sudah benar sebelum
          melanjutkan pembayaran.
        </p>
      </div>
    </header>
  );
}
