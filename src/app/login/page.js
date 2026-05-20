"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BG_IMAGE = "https://images.unsplash.com/photo-1519225495810-7517c2965a7d?w=1600&auto=format&fit=crop";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#f3f4f7]">
      {/* LEFT SECTION: Brand Background Image & Copywriting */}
      <div 
        className="hidden md:flex md:w-1/2 min-h-screen bg-cover bg-center relative p-16 flex-col justify-between text-white"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F131F]/90 via-[#0F131F]/40 to-[#0F131F]/60 z-0" />

        {/* Top Logo branding */}
        <div className="z-10 font-cinzel-deco text-xl font-bold tracking-widest">
          BANGO PARC
        </div>

        {/* Bottom Copywriting content */}
        <div className="z-10 max-w-lg mt-auto flex flex-col gap-4">
          <h2 className="font-crimson-pro text-4xl lg:text-5xl leading-tight font-semibold">
            Wujudkan Momen Spesial Anda Bersama Kami
          </h2>
          <p className="text-white/80 text-sm leading-relaxed font-sans">
            Dari resepsi pernikahan yang megah hingga seminar bisnis eksklusif, temukan harmoni keindahan alam terbuka dan fasilitas modern premium di Bango Parc.
          </p>
          <div className="h-px bg-white/20 w-24 my-2" />
          <span className="text-xs text-white/50 tracking-wider uppercase font-semibold">
            Venue &amp; Eatery · Jakarta Selatan
          </span>
        </div>
      </div>

      {/* RIGHT SECTION: Login Form Container */}
      <div className="w-full md:w-1/2 min-h-screen bg-white flex flex-col justify-center items-center px-6 py-16 md:px-16 lg:px-24 relative">
        {/* Back Link Button */}
        <Link 
          href="/" 
          className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-xs text-black/50 hover:text-black transition-colors font-medium group"
        >
          <ArrowLeft size={14} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
          Kembali ke Beranda
        </Link>

        {/* Content Box */}
        <div className="w-full max-w-md flex flex-col items-start mt-6">
          {/* Logo brand display */}
          <div className="mb-10 font-cinzel-deco text-2xl font-bold tracking-widest text-[#0F131F]">
            BANGO PARC
          </div>

          {/* Greeting text */}
          <h1 className="font-crimson-pro text-4xl text-[#0F131F] font-semibold mb-3">
            Selamat Datang Kembali
          </h1>
          <p className="text-sm text-black/50 mb-8 leading-relaxed">
            Masuk untuk mengelola reservasi venue Anda, mengecek riwayat pemesanan, dan mengakses penawaran eksklusif.
          </p>

          {/* Google SSO Login Button */}
          <button
            onClick={() => alert("Fitur Login Google akan segera tersedia!")}
            className="w-full h-13 border-2 border-[#0F131F] hover:bg-[#0F131F] hover:text-white transition-all duration-300 flex items-center justify-center font-semibold cursor-pointer text-[#0F131F] gap-3 text-sm"
          >
            {/* Google Vector Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path 
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                fill="#4285F4"
              />
              <path 
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                fill="#34A853"
              />
              <path 
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" 
                fill="#FBBC05"
              />
              <path 
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                fill="#EA4335"
              />
            </svg>
            Masuk dengan Google
          </button>
          
          <div className="w-full flex items-center gap-4 my-7">
            <div className="h-px bg-black/10 flex-1" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-black/35">Atau</span>
            <div className="h-px bg-black/10 flex-1" />
          </div>

          {/* Secure notification */}
          <div className="p-4 border border-[#0F131F]/15 bg-[#f3f4f7] w-full text-xs text-black/50 leading-relaxed">
            Sistem kami menggunakan Google Single Sign-On (SSO) untuk keamanan data tingkat tinggi dan kemudahan pendaftaran tanpa kata sandi tambahan.
          </div>

          {/* Help Line */}
          <div className="mt-16 text-xs text-black/40">
            Butuh bantuan terkait akun? Hubungi WhatsApp kami di{" "}
            <Link 
              href="https://wa.me/6282108962233" 
              target="_blank" 
              className="underline font-semibold hover:text-[#896d51] transition-colors text-black/60"
            >
              +62 821 0896 2233
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
