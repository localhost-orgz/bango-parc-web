import { AlertCircle } from "lucide-react";

const InfoBukti = () => {
  return (
    <div className="mt-4 p-4 border border-[#896d51]/15 bg-[#896d51]/5 flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <AlertCircle size={14} color="#896d51" strokeWidth={1.5} />
        <span className="text-xs font-semibold text-[#896d51]">
          Informasi Penting:
        </span>
      </div>
      {[
        "Pastikan bukti pembayaran menunjukkan jumlah yang sesuai",
        "Upload screenshot atau foto yang jelas dan tidak blur",
        "Verifikasi akan dilakukan dalam 1–24 jam kerja",
        "Setelah terverifikasi, tiket check-in akan otomatis tersedia di halaman Profil",
        "Jika tiket belum muncul, hubungi kami via WhatsApp di 0821-1555-1822",
        "Mohon simpan bukti pembayaran asli hingga menerima tiket check-in",
      ].map((item) => (
        <div key={item} className="flex items-start gap-2">
          <span className="text-[#896d51] text-xs mt-0.5 shrink-0">·</span>
          <span className="text-xs text-black/55 leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoBukti;
