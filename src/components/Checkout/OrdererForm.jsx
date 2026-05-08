import InputField from "./InputField";

export default function OrdererForm() {
  return (
    <div className="bg-white border border-[#0F131F]/10 p-5 sm:p-6">
      <h5 className="font-crimson-pro text-xl text-[#0F131F] mb-1">
        Informasi Pemesan
      </h5>
      <p className="text-xs text-black/35 mb-5">
        Data ini digunakan untuk konfirmasi dan komunikasi booking Anda.
      </p>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Nama Depan"
            placeholder="Nama depan Anda"
            required
          />
          <InputField
            label="Nama Belakang"
            placeholder="Nama belakang Anda"
            required
          />
        </div>
        <InputField
          label="Alamat Email"
          placeholder="email@contoh.com"
          type="email"
          required
          hint="Konfirmasi booking akan dikirim ke email ini"
        />
        <InputField
          label="Nomor Telepon"
          placeholder="+62 812 3456 7890"
          type="tel"
          required
          hint="Gunakan nomor aktif yang bisa dihubungi"
        />
        <InputField
          label="Nama Acara / Keterangan"
          placeholder="Contoh: Ulang tahun, Gathering perusahaan, dll."
        />
      </div>
    </div>
  );
}
