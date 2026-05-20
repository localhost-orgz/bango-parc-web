import { ChevronRight } from "lucide-react";

export default function PageHeader() {
  return (
    <header className="h-56 sm:h-64 w-full relative flex flex-col justify-center items-center pt-20">
      <div
        style={{ backgroundImage: "url(/detail-header.jpg)" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-[#0F131F]/60" />
      <div className="z-10 flex flex-col items-center gap-2 px-4 text-center">
        <h1 className="font-crimson-pro text-white text-4xl sm:text-5xl">
          Detail Pesanan
        </h1>
        <p className="text-white/50 text-xs mt-1 max-w-sm leading-relaxed">
          Pastikan semua data dan detail reservasi sudah benar sebelum
          melanjutkan pembayaran.
        </p>
      </div>
    </header>
  );
}
