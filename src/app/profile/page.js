"use client";

import Navbar from "@/components/Landing/Navbar";
import { 
  User, 
  Calendar, 
  Lock, 
  Mail, 
  Phone, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account"); // "account" or "reservations"
  
  // Profile state initialized with mock default user data
  const [profile, setProfile] = useState({
    fullName: "Putra Setyonugroho",
    email: "me.putrasetyo@gmail.com",
    whatsappNumber: "085810894998",
    password: "Putra912",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load from local storage if exists
  useEffect(() => {
    const savedProfile = localStorage.getItem("bango_parc_user_profile");
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate saving delay
    setTimeout(() => {
      localStorage.setItem("bango_parc_user_profile", JSON.stringify(profile));
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("bango_parc_token");
    localStorage.removeItem("bango_parc_user_profile");
    router.push("/login");
  };

  // Premium mock reservations matching Bango Parc packaging style
  const [reservations] = useState([
    {
      id: "BP-2026-0812",
      packageName: "Royal Excellence Wedding Package",
      area: "Area Tengah & Belakang (Semi-indoor & Outdoor)",
      date: "12 Agustus 2026",
      timeSlot: "08.00 - 13.00 WIB (5 jam)",
      price: "Rp 65.000.000",
      status: "Dikonfirmasi",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "BP-2026-0925",
      packageName: "Intimate Deluxe Package",
      area: "Area Depan (Garden Outdoor)",
      date: "25 September 2026",
      timeSlot: "15.00 - 18.00 WIB (3 jam)",
      price: "Rp 28.000.000",
      status: "Menunggu Pembayaran",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "BP-2025-1110",
      packageName: "Corporate Gathering & Seminar",
      area: "Ruang Tengah (Indoor Exclusive)",
      date: "10 November 2025",
      timeSlot: "09.00 - 12.00 WIB (3 jam)",
      price: "Rp 18.000.000",
      status: "Selesai",
      badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
    }
  ]);

  return (
    <main className="w-full min-h-screen bg-[#f3f4f7]">
      {/* Header */}
      <header className="h-48 sm:h-56 w-full relative flex flex-col justify-center items-center pt-20 px-4">
        <div
          style={{ backgroundImage: "url(/about-header.jpg)" }}
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="z-10 flex flex-col items-center gap-2 text-center px-4">
          <span className="text-[#896d51] text-xs font-semibold tracking-[0.3em] uppercase">
            Portal Pelanggan
          </span>
          <h1 className="font-crimson-pro text-white text-3xl sm:text-4xl">
            Profil Saya
          </h1>
        </div>
      </header>

      <Navbar />

      {/* Main Profile Layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR */}
          <div className="col-span-1 lg:col-span-4 bg-white border border-[#0F131F]/10 p-6 flex flex-col gap-6 shadow-sm">
            {/* User Avatar Card */}
            <div className="flex items-center gap-4 pb-6 border-b border-[#0F131F]/10">
              <div className="w-14 h-14 bg-[#0F131F] rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {profile.fullName ? profile.fullName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase() : "U"}
              </div>
              <div className="flex flex-col">
                <span className="font-crimson-pro text-lg font-semibold text-[#0F131F] leading-tight">
                  {profile.fullName || "User Bango Parc"}
                </span>
                <span className="text-xs text-black/45 mt-0.5">
                  {profile.email}
                </span>
              </div>
            </div>

            {/* Sidebar Navigation Tabs */}
            <div className="flex flex-row lg:flex-col gap-2">
              <button
                onClick={() => setActiveTab("account")}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "account"
                    ? "bg-[#0F131F] text-white"
                    : "text-black/60 hover:bg-black/5 hover:text-[#0F131F]"
                }`}
              >
                <User size={16} className={activeTab === "account" ? "text-[#896d51]" : "text-black/40"} />
                Informasi Akun
              </button>
              
              <button
                onClick={() => setActiveTab("reservations")}
                className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === "reservations"
                    ? "bg-[#0F131F] text-white"
                    : "text-black/60 hover:bg-black/5 hover:text-[#0F131F]"
                }`}
              >
                <Calendar size={16} className={activeTab === "reservations" ? "text-[#896d51]" : "text-black/40"} />
                Reservasi Saya
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 lg:mt-4 border-t lg:border-t-0 border-[#0F131F]/10 pt-3 lg:pt-3"
              >
                <LogOut size={16} className="text-red-500" />
                Keluar
              </button>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="col-span-1 lg:col-span-8 bg-white border border-[#0F131F]/10 p-6 sm:p-8 shadow-sm min-h-[400px]">
            
            {/* TAB 1: ACCOUNT INFORMATION */}
            {activeTab === "account" && (
              <div className="flex flex-col">
                <h3 className="font-crimson-pro text-2xl text-[#0F131F] mb-1 font-semibold">
                  Informasi Akun
                </h3>
                <p className="text-xs text-black/45 mb-6">
                  Kelola data pribadi Anda untuk mempermudah koordinasi reservasi acara.
                </p>

                <form onSubmit={handleSave} className="flex flex-col gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5">
                      <User size={12} />
                      Nama Lengkap
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      placeholder="Masukkan nama lengkap"
                      className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5">
                      <Mail size={12} />
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="Masukkan alamat email"
                      className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="whatsappNumber" className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5">
                      <Phone size={12} />
                      Nomor WhatsApp
                    </label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      required
                      value={profile.whatsappNumber}
                      onChange={handleProfileChange}
                      placeholder="Masukkan nomor WhatsApp"
                      className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5">
                      <Lock size={12} />
                      Kata Sandi
                    </label>
                    <div className="relative w-full">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={profile.password}
                        onChange={handleProfileChange}
                        placeholder="Masukkan kata sandi"
                        className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-3 text-[#0F131F]/40 hover:text-[#0F131F] transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full sm:w-auto h-12 px-8 bg-[#0F131F] text-white hover:bg-[#896d51] transition-all duration-300 flex items-center justify-center font-semibold cursor-pointer gap-2.5 text-sm disabled:bg-black/20 disabled:text-black/40 disabled:cursor-not-allowed"
                    >
                      <Save size={16} />
                      {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>

                    {saveSuccess && (
                      <span className="text-xs font-semibold text-[#34A853] flex items-center gap-1.5 transition-all duration-300">
                        <CheckCircle2 size={16} />
                        Perubahan berhasil disimpan!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: RESERVATION */}
            {activeTab === "reservations" && (
              <div className="flex flex-col">
                <h3 className="font-crimson-pro text-2xl text-[#0F131F] mb-1 font-semibold">
                  Reservasi Saya
                </h3>
                <p className="text-xs text-black/45 mb-6">
                  Riwayat dan status pemesanan venue Bango Parc Anda.
                </p>

                {/* Reservation List */}
                <div className="flex flex-col gap-6">
                  {reservations.map((res) => (
                    <div 
                      key={res.id} 
                      className="border border-[#0F131F]/10 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f3f4f7]/30 hover:bg-[#f3f4f7]/75 transition-colors"
                    >
                      <div className="flex flex-col gap-2">
                        {/* ID & Status */}
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono font-bold text-[#0F131F] bg-[#0F131F]/5 px-2 py-0.5 border border-[#0F131F]/10">
                            {res.id}
                          </span>
                          <span className={`text-[10px] font-semibold border px-2 py-0.5 uppercase tracking-wider ${res.badgeColor}`}>
                            {res.status}
                          </span>
                        </div>

                        {/* Package Name */}
                        <span className="font-crimson-pro text-lg font-semibold text-[#0F131F] leading-tight">
                          {res.packageName}
                        </span>

                        {/* Details */}
                        <div className="flex flex-col gap-1 mt-1 text-xs text-black/55">
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-[#896d51]" />
                            <span>{res.date} · {res.timeSlot}</span>
                          </div>
                          <span>Area: {res.area}</span>
                        </div>
                      </div>

                      {/* Right Panel: Price & Action */}
                      <div className="flex md:flex-col items-start md:items-end justify-between md:justify-center gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-[#0F131F]/5">
                        <div className="flex flex-col md:items-end">
                          <span className="text-[10px] uppercase text-black/40 font-semibold tracking-wider">Total Pembayaran</span>
                          <span className="text-lg font-bold text-[#0F131F]">{res.price}</span>
                        </div>
                        
                        <Link 
                          href="/paket" 
                          className="flex items-center gap-1 text-[11px] font-semibold text-[#896d51] hover:text-[#0F131F] transition-colors uppercase tracking-wider mt-1 group"
                        >
                          Detail Acara
                          <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
    </main>
  );
}
