"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Landing/Navbar";
import { wedding_packages } from "@/constants/package";
import {
  Armchair,
  ArrowRight,
  ChevronDown,
  House,
  MirrorRound,
  MoveLeft,
  MoveRight,
  MoveUpRight,
  Package2,
  PartyPopper,
  Phone,
  Sparkles,
  Speaker,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const filters = [
  {
    id: "jenis-acara",
    label: "Jenis Acara",
    icon: Sparkles,
    options: ["Semua Acara", "Acara Umum", "Pernikahan"],
  },
  {
    id: "jumlah-tamu",
    label: "Jumlah Tamu",
    icon: Users,
    options: ["Semua Tamu", "1-50", "51-200", "201-300", "300+"],
  },
  {
    id: "tipe-area",
    label: "Tipe Area",
    icon: Sparkles,
    options: ["Semua Area", "Indoor", "Outdoor", "Semi-Indoor"],
  },
];

//  house, zap, packages2, mirrorround speaker

function page() {
  const [selected, setSelected] = useState({
    "jenis-acara": "Semua Acara",
    "jumlah-tamu": "Semua Tamu",
    "tipe-area": "Semua Area",
  });
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen((prev) => (prev === id ? null : id));
  const pick = (id, value) => {
    setSelected((prev) => ({ ...prev, [id]: value }));
    setOpen(null);
  };

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      <header className="h-90 w-full relative flex justify-center items-center">
        <div
          style={{ backgroundImage: "url(/about-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/10" />

        <h1 className="font-crimson-pro text-white text-5xl z-1">
          Paket & Venue
        </h1>
      </header>
      {/* <section className="section-layout grid-12">
        <div className="col-span-4">
          <h3 className="section-headline">
            Temukan paket sesuai kebutuhanmu.
          </h3>
        </div>
        <div className="col-span-8 w-full flex justify-between items-end gap-4">
          <div className="flex flex-1 items-end gap-4">
            {filters.map(({ id, label, icon: Icon, options }) => (
              <div
                key={id}
                className="relative flex flex-col gap-1.5 flex-1 min-w-40"
              >
                <label className="text-sm font-semibold">{label}</label>
                <button
                  onClick={() => toggle(id)}
                  className="flex items-center justify-between gap-2 border border-[#896d51] bg-white px-3 py-2.5 text-sm transition "
                >
                  <span className="flex items-center gap-2">
                    <Icon size={15} className="shrink-0 text-[#896d51]" />
                    <span className="text-[#896d51]">{selected[id]}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 text-[#896d51] ${open === id ? "rotate-180" : ""}`}
                  />
                </button>

                {open === id && (
                  <div className="absolute top-full left-0 z-50 mt-1 w-full border border-[#896d51] bg-white ">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => pick(id, opt)}
                        className={`flex w-full items-center px-3 py-2 text-sm transition text-[#896d51] hover:bg-[#f5ede0] ${selected[id] === opt ? "font-semibold bg-[#f5ede0]/50" : "text-gray-900"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="srhink-0 bg-[#896d51] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#896d51]/50">
            Terapkan Filter
          </button>
        </div>
      </section> */}
      <Navbar />

      <section className="section-layout grid-12">
        <div className="w-full col-span-12 flex justify-center items-center flex-col gap-4">
          <h2 className="text-5xl font-crimson-text tracking-light">
            Pilihan Paket
          </h2>
          <div className="w-50 h-0.5 bg-[#0F131F]"></div>
        </div>
      </section>

      <section className="section-layout grid-12">
        <div className="col-span-10 col-start-2 w-full flex justify-between gap-6">
          <div className="w-full bg-white border border-gray-300 flex flex-col">
            <div className="h-65 bg-black relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/cta.jpg)",
                }}
              />
            </div>
            <div className="flex flex-col items-start p-4">
              <span className="text-3xl font-crimson-text text-[#0F131F] tracking-tight">
                Semi-Indoor & Outdoor
              </span>
              <div className="flex flex-row items-end gap-2 mt-1">
                <span className="text-xl font-medium">Rp1.000.000</span>
                <span className="line-through text-sm mb-0.5 font-medium text-black/50">
                  Rp1.600.000
                </span>
                <span className=" text-sm font-medium mb-0.5 text-[#0F131F]">
                  / 3 jam
                </span>
              </div>
              <p className="text-sm mt-3 text-black/60 w-[70%]">
                Cocok untuk meeting, ulang tahun, gathering, pengajian, dan
                acara lainnya.
              </p>
              <div className="w-full mt-6 flex flex-row justify-between gap-2">
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Users className="text-[#0F131F]" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Kapasitas</span>
                      <span className="text-sm font-medium">
                        Hingga 250 pax
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Zap className="text-[#0F131F]" strokeWidth={1.7} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Listrik</span>
                      <span className="text-sm font-medium">300 Watt</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 flex flex-row justify-between gap-2">
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <PartyPopper className="text-[#0F131F]" strokeWidth={1.8} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Area</span>
                      <span className="text-sm font-medium">Bisa Didekor</span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Armchair className="text-[#0F131F]" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">
                        Kursi Variasi
                      </span>
                      <span className="text-sm font-medium">± 35 Variasi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* line */}
              <div className="w-full h-px bg-[#0F131F]/30 my-5"></div>

              {/* btn */}
              <Link
                href={"/paket/detail"}
                className="w-full items-center gap-2 flex justify-center py-3 bg-[#0F131F] text-white"
              >
                <span className="text-sm font-medium">Lihat Detail & Book</span>
                <ArrowRight size={17} strokeWidth={3} />
              </Link>
            </div>
          </div>
          <div className="w-full bg-white border border-gray-300 flex flex-col">
            <div className="h-65 bg-black relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(/cta.jpg)",
                }}
              />
            </div>
            <div className="flex flex-col items-start p-4">
              <span className="text-3xl font-crimson-text text-[#0F131F] tracking-tight">
                Semi-Indoor & Outdoor
              </span>
              <div className="flex flex-row items-end gap-2 mt-1">
                <span className="text-xl font-medium">Rp1.000.000</span>
                <span className="line-through text-sm mb-0.5 font-medium text-black/50">
                  Rp1.600.000
                </span>
                <span className=" text-sm font-medium mb-0.5 text-[#0F131F]">
                  / 3 jam
                </span>
              </div>
              <p className="text-sm mt-3 text-black/60 w-[70%]">
                Cocok untuk meeting, ulang tahun, gathering, pengajian, dan
                acara lainnya.
              </p>
              <div className="w-full mt-6 flex flex-row justify-between gap-2">
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Users className="text-[#0F131F]" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Kapasitas</span>
                      <span className="text-sm font-medium">
                        Hingga 250 pax
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Zap className="text-[#0F131F]" strokeWidth={1.7} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Listrik</span>
                      <span className="text-sm font-medium">300 Watt</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 flex flex-row justify-between gap-2">
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <PartyPopper className="text-[#0F131F]" strokeWidth={1.8} />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">Area</span>
                      <span className="text-sm font-medium">Bisa Didekor</span>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex flex-row gap-3 items-center">
                    <Armchair className="text-[#0F131F]" />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-semibold">
                        Kursi Variasi
                      </span>
                      <span className="text-sm font-medium">± 35 Variasi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* line */}
              <div className="w-full h-px bg-[#0F131F]/30 my-5"></div>

              {/* btn */}
              <Link
                href={"/paket/detail"}
                className="w-full items-center gap-2 flex justify-center py-3 bg-[#0F131F] text-white"
              >
                <span className="text-sm font-medium">Lihat Detail & Book</span>
                <ArrowRight size={17} strokeWidth={3} />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-10 col-start-2 w-full flex justify-between gap-6">
          {wedding_packages.map((wed) => (
            <div
              key={wed.id}
              className="w-full bg-white border border-gray-300 flex flex-col"
            >
              <div className="w-full h-auto aspect-video bg-black relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${wed.thumbnail})`,
                  }}
                />
              </div>
              <div className="flex flex-1 px-3 py-4 flex-col">
                <span className="text-2xl font-crimson-text text-[#0F131F] tracking-tight">
                  {wed.name}
                </span>
                <div className="flex flex-row items-end mt-2 gap-1">
                  <span className="font-medium">{wed.three_hours_disc}</span>
                  <span className="font-medium text-xs line-through text-black/50">
                    {wed.current_three_hours}
                  </span>
                  <span className="font-medium text-xs text-[#0F131F]">
                    / 3 jam
                  </span>
                </div>
                <div className="flex flex-row items-end mt-1 gap-1">
                  <span className="font-medium">{wed.five_hours_disc}</span>
                  <span className="font-medium text-xs line-through text-black/50">
                    {wed.current_five_hours}
                  </span>
                  <span className="font-medium text-xs text-[#0F131F]">
                    / 5 jam
                  </span>
                </div>

                {/* features */}
                <div className="flex flex-col items-start mt-5 gap-1">
                  {wed.features.map(({ id, icon: Icon, label }) => (
                    <div
                      key={id}
                      className="flex flex-row items-center justify-start gap-1"
                    >
                      <Icon size={15} className="text-[#0F131F]" />
                      <span className="text-xs font-medium text-[#0F131F]">
                        {label}
                      </span>
                    </div>
                  ))}

                  <div className="h-0.5 w-full bg-[#0F131F]/30 mb-3 mt-5"></div>
                  <Link
                    href={"/paket/detail"}
                    className="w-full py-3 bg-[#0F131F] flex justify-center items-center gap-1"
                  >
                    <span className="text-xs font-semibold text-white">
                      Lihat Detail & Booking
                    </span>
                    <ArrowRight
                      className="text-white w-4 h-4"
                      strokeWidth={2.5}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-8">
        <div className="w-[90%] h-100 flex bg-white border border-gray-300">
          <div className="flex flex-1 p-10 flex-col items-start justify-between">
            <div className="flex flex-col items-start">
              <h3 className="text-4xl font-crimson-pro">Ketentuan Singkat</h3>
              <ul className="list-disc pl-4 text-[#666666] mt-5 leading-7">
                <li>DP minimal 50% untuk booking area.</li>
                <li>Pelunasan paling lambat H-7 sebelum acara.</li>
                <li>
                  Katering dari venue. Jika membawa dari luar dikenakan corkage
                  fee.
                </li>
                <li>Kelebihan waktu dikenakan biaya Rp1.000.000 /jam</li>
                <li>
                  Harga belum termasuk biaya keamanan parkir di luar venue.
                </li>
              </ul>
            </div>
            <Link
              className="flex items-center gap-1 text-[#0F131F]"
              href={"/paket"}
            >
              <span className="underline underline-offset-2">
                Lihat Semua Ketentuan
              </span>
              <MoveRight size={17} />
            </Link>
          </div>
          <div className="h-full w-[50%] relative p-10">
            <div
              style={{
                backgroundImage: "url(/cta-paket.jpg)",
              }}
              className="absolute inset-0 bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="flex flex-col items-start gap-2">
              <h3 className="text-4xl w-[60%] relative font-crimson-pro text-white z-10">
                Punya pertanyaan atau ingin booking?
              </h3>
              <span className="text-white relative font-light w-[60%]">
                Tim kami siap membantu anda merencanakan acara terbaik
              </span>
              <Link
                href={"/paket"}
                className="flex items-center text-sm gap-2 bg-[#0F131F] relative text-white py-3 px-6 mt-5"
              >
                <Phone size={17} /> Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;

//
