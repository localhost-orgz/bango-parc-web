"use client";

import Navbar from "@/components/Landing/Navbar";
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  Save, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  LogOut,
  Ticket
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account"); // "account" or "reservations"
  const [activeTicket, setActiveTicket] = useState(null);
  
  // Profile state initialized with mock default user data
  const [profile, setProfile] = useState({
    fullName: "Putra Setyonugroho",
    email: "me.putrasetyo@gmail.com",
    whatsappNumber: "085810894998",
  });
  
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
                        
                        {res.status === "Dikonfirmasi" || res.status === "Selesai" ? (
                          <button
                            onClick={() => setActiveTicket(res)}
                            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider mt-2 group cursor-pointer rounded"
                          >
                            Lihat Tiket
                            <Ticket size={12} className="group-hover:scale-110 transition-transform" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => router.push("/paket")}
                            className="flex items-center gap-1.5 px-4 py-2.5 border border-[#896d51] text-[#896d51] hover:bg-[#896d51] hover:text-white transition-all duration-300 font-semibold text-[11px] uppercase tracking-wider mt-2 group cursor-pointer rounded"
                          >
                            Detail Acara
                            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>
      {/* Ticket Modal Overlay */}
      {activeTicket && (
        <TicketModal 
          reservation={activeTicket}
          userName={profile.fullName}
          onClose={() => setActiveTicket(null)}
        />
      )}
    </main>
  );
}

// ─── High-Fidelity Ticket Modal Component ─────────────────────────────────────
function TicketModal({ reservation, userName, onClose }) {
  if (!reservation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl overflow-hidden rounded-xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white z-20 transition-colors cursor-pointer text-lg font-bold"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-[#0F131F] text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Subtle gold accent circle */}
          <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-[#896d51]/10 pointer-events-none" />
          
          <span className="text-[#896d51] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">
            Bango Parc Venue & Eatery
          </span>
          <h3 className="font-cinzel-deco text-xl font-bold tracking-widest">
            E-TICKET RESERVASI
          </h3>
          <span className="text-[10px] font-mono text-white/50 mt-1 uppercase tracking-wider">
            ID: {reservation.id}
          </span>
        </div>

        {/* Ticket Body */}
        <div className="p-6 flex flex-col bg-white">
          {/* Ticket Shape Wrapper */}
          <div className="border border-[#0F131F]/15 rounded-xl overflow-hidden relative bg-[#f3f4f7]/20 flex flex-col">
            
            {/* Left/Right semi-circle notch cutouts for classic ticket look */}
            <div className="absolute top-[62%] -left-3 w-6 h-6 rounded-full bg-white border-r border-[#0F131F]/15 z-10" />
            <div className="absolute top-[62%] -right-3 w-6 h-6 rounded-full bg-white border-l border-[#0F131F]/15 z-10" />

            {/* Top Ticket Details */}
            <div className="p-5 flex flex-col gap-4">
              {/* Event Name */}
              <div className="flex flex-col">
                <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Nama Paket / Acara</span>
                <span className="font-crimson-pro text-xl font-bold text-[#0F131F] leading-tight mt-0.5">
                  {reservation.packageName}
                </span>
              </div>

              {/* Grid detail */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Pemesan</span>
                  <span className="text-xs font-semibold text-black/75 mt-0.5">{userName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Status Tiket</span>
                  <span className="text-[10px] font-bold text-[#15803D] uppercase tracking-wider mt-0.5">
                    {reservation.status === "Selesai" ? "Lunas (Selesai)" : "Terkonfirmasi"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Tanggal Acara</span>
                  <span className="text-xs font-semibold text-black/75 mt-0.5">{reservation.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Jam Sewa (Check-in/out)</span>
                  <span className="text-xs font-semibold text-black/75 mt-0.5">{reservation.timeSlot.split(" (")[0]}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-black/40 uppercase tracking-wider font-semibold">Area Lokasi</span>
                <span className="text-xs font-semibold text-black/75 mt-0.5">{reservation.area}</span>
              </div>
            </div>

            {/* Dotted Tear-off Divider Line */}
            <div className="relative flex items-center justify-center my-1 px-4">
              <div className="w-full border-t border-dashed border-[#0F131F]/20" />
            </div>

            {/* Bottom Tear-off Ticket section (Barcode + QR Code lookalike) */}
            <div className="p-5 pt-3 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-black/35 uppercase tracking-wider font-semibold">Scan QR Kode untuk Verifikasi Masuk</span>
                <span className="text-[10px] font-mono text-[#0F131F]/60 mt-1">BANGOPARC-SEC-{reservation.id}</span>
                <div className="flex gap-1.5 mt-2.5">
                  <span className="text-[10px] font-bold bg-[#15803D]/10 text-[#15803D] px-2 py-0.5 border border-[#15803D]/25 uppercase tracking-wider">
                    VALID
                  </span>
                  <span className="text-[10px] font-bold bg-[#0F131F]/5 text-[#0F131F]/65 px-2 py-0.5 border border-[#0F131F]/15 uppercase tracking-wider">
                    LUNAS
                  </span>
                </div>
              </div>
              
              {/* Custom Simulated QR Code using HTML/CSS */}
              <div className="w-20 h-20 bg-white border border-[#0F131F]/10 p-1.5 flex items-center justify-center shrink-0">
                {/* Visual representation of a QR Code grid */}
                <div className="grid grid-cols-5 gap-0.5 w-full h-full opacity-85">
                  {[...Array(25)].map((_, i) => {
                    // Generate a pseudo-random checkerboard pattern
                    const isDark = (i * 7 + 13) % 3 === 0 || i === 0 || i === 4 || i === 20 || i === 24 || (i > 5 && i < 9) || (i > 15 && i < 19);
                    return (
                      <div 
                        key={i} 
                        className={`w-full h-full ${isDark ? 'bg-[#0F131F]' : 'bg-white'}`} 
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f3f4f7] border-t border-[#0F131F]/10 flex items-center justify-between text-xs text-black/55 px-6">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[#896d51]" />
            <span>Pintu masuk dibuka 30 menit sebelum check-in</span>
          </div>
          <button 
            onClick={() => window.print()}
            className="text-[#896d51] hover:text-[#0F131F] font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            Cetak Tiket
          </button>
        </div>

      </div>
    </div>
  );
}
