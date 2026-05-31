import { useEffect, useState } from "react";
import InputField from "./InputField";

export default function OrdererForm() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("bango_parc_user_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile({
          fullName: parsed.fullName || "",
          email: parsed.email || "",
          whatsappNumber: parsed.whatsappNumber || parsed.phone || "",
        });
      } catch (e) {
        console.error("Failed to load user profile in OrdererForm:", e);
      }
    }
  }, []);

  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 sm:p-6">
      <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-1">
        Informasi Pemesan
      </h5>
      <p className="text-xs text-black/35 mb-5">
        Data ini digunakan untuk konfirmasi dan komunikasi booking Anda.
      </p>
      <div className="flex flex-col gap-5">
        <InputField
          label="Nama Lengkap"
          placeholder="Nama lengkap Anda"
          value={profile.fullName}
          readOnly
          required
        />
        <InputField
          label="Alamat Email"
          placeholder="email@contoh.com"
          type="email"
          value={profile.email}
          readOnly
          required
          hint="Konfirmasi booking akan dikirim ke email ini"
        />
        <InputField
          label="Nomor Telepon"
          placeholder="+62 812 3456 7890"
          type="tel"
          value={profile.whatsappNumber}
          readOnly
          required
          hint="Gunakan nomor aktif yang bisa dihubungi"
        />
        {/* 
        <InputField
          label="Nama Acara / Keterangan"
          placeholder="Contoh: Ulang tahun, Gathering perusahaan, dll."
        />
        */}
      </div>
    </div>
  );
}
