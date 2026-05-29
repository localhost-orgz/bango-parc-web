"use client";

import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1519225495810-7517c2965a7d?w=1600&auto=format&fit=crop";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://bango-parc-service.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Pendaftaran gagal. Silakan coba kembali.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Koneksi terputus. Harap periksa jaringan Anda.");
    } finally {
      setIsLoading(false);
    }
  };

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
            Dari resepsi pernikahan yang megah hingga seminar bisnis eksklusif,
            temukan harmoni keindahan alam terbuka dan fasilitas modern premium
            di Bango Parc.
          </p>
          <div className="h-px bg-white/20 w-24 my-2" />
          <span className="text-xs text-white/50 tracking-wider uppercase font-semibold">
            Venue &amp; Eatery · Jakarta Selatan
          </span>
        </div>
      </div>

      {/* RIGHT SECTION: Signup Form Container */}
      <div className="w-full md:w-1/2 min-h-screen bg-white flex flex-col justify-center items-center px-6 py-16 md:px-16 lg:px-24 relative">
        {/* Back Link Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-xs text-black/50 hover:text-black transition-colors font-medium group text-[#0F131F]"
        >
          <ArrowLeft
            size={14}
            strokeWidth={2.5}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Kembali ke Beranda
        </Link>

        {/* Content Box */}
        <div className="w-full max-w-md flex flex-col items-start mt-6">
          {/* Logo brand display */}
          <div className="mb-8 font-cinzel-deco text-2xl font-bold tracking-widest text-[#0F131F]">
            BANGO PARC
          </div>

          {/* Greeting text */}
          <h1 className="font-crimson-pro text-4xl text-[#0F131F] font-semibold mb-3">
            Daftar Akun Baru
          </h1>
          <p className="text-sm text-black/50 mb-6 leading-relaxed">
            Daftar untuk mulai merencanakan acara Anda dan memesan venue terbaik
            di Bango Parc.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            {/* Full Name Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="fullName"
                className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5"
              >
                <User size={12} />
                Nama Lengkap
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                disabled={isLoading || success}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1 disabled:opacity-55"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5"
              >
                <Mail size={12} />
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isLoading || success}
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan alamat email"
                className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1 disabled:opacity-55"
              />
            </div>

            {/* WhatsApp Number Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="whatsappNumber"
                className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5"
              >
                <Phone size={12} />
                Nomor WhatsApp
              </label>
              <input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                required
                disabled={isLoading || success}
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Masukkan nomor WhatsApp"
                className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1 disabled:opacity-55"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5 relative">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#0F131F]/60 tracking-wide uppercase flex items-center gap-1.5"
              >
                <Lock size={12} />
                Kata Sandi
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading || success}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi"
                  className="w-full h-11 border-b-2 border-[#0F131F]/20 bg-transparent text-sm text-[#0F131F] placeholder:text-black/25 outline-none focus:border-[#0F131F] transition-colors px-1 pr-10 disabled:opacity-55"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || success}
                  className="absolute right-2 top-3 text-[#0F131F]/40 hover:text-[#0F131F] transition-colors cursor-pointer disabled:opacity-55"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full h-13 mt-4 bg-[#0F131F] text-white hover:bg-[#896d51] transition-all duration-300 flex items-center justify-center font-semibold cursor-pointer gap-3 text-sm disabled:bg-black/20 disabled:text-black/40 disabled:cursor-not-allowed"
            >
              {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 w-full p-4 border border-[#EA4335]/25 bg-[#EA4335]/5 rounded-sm flex items-center gap-3 text-xs text-[#EA4335] transition-all duration-300">
              <div className="w-2 h-2 shrink-0 rounded-full bg-[#EA4335]" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 w-full p-4 border border-[#34A853]/25 bg-[#34A853]/5 rounded-sm flex flex-col gap-2 text-xs text-[#34A853] transition-all duration-300">
              <div className="flex items-center gap-2 font-semibold">
                <div className="w-2 h-2 shrink-0 rounded-full bg-[#34A853]" />
                Registrasi Berhasil!
              </div>
              <p className="text-black/60 leading-relaxed">
                Akun Anda telah berhasil didaftarkan. Halaman akan dialihkan ke formulir masuk (login) dalam beberapa detik...
              </p>
            </div>
          )}

          {/* Already have an account link */}
          <div className="mt-8 text-sm text-black/60 self-center">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="underline font-semibold hover:text-[#896d51] text-[#0F131F] transition-colors"
            >
              Masuk
            </Link>
          </div>

          {/* Help Line */}
          <div className="mt-12 text-xs text-black/40">
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
